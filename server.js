const express = require('express');
const mysql   = require('mysql2');
const cors    = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ── Serve static files from src/ folder ──
app.use(express.static('src'));

// ── MySQL connection ──
const db = mysql.createConnection({
  host:     process.env.DB_HOST || 'localhost',
  user:     process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'MUTipWebsite5',
  database: process.env.DB_NAME || 'school_db'
});

db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err);
    return;
  }
  console.log('Connected to MySQL');

  // Ensure appointments table exists
  const createAppointmentsTable = `
    CREATE TABLE IF NOT EXISTS appointments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      student_name VARCHAR(120) NOT NULL,
      student_email VARCHAR(150) NOT NULL,
      lecturer_name VARCHAR(150) NOT NULL,
      appointment_date DATE NOT NULL,
      appointment_time TIME NOT NULL,
      reason TEXT,
      status VARCHAR(30) NOT NULL DEFAULT 'scheduled',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  db.query(createAppointmentsTable, (tableErr) => {
    if (tableErr) {
      console.error('Failed to create appointments table:', tableErr);
    } else {
      console.log('Appointments table is ready');
    }
  });
});

const lecturerEmail = process.env.LECTURER_EMAIL || 'xolisa.piyose@mut.ac.za';
let mailTransporter = null;

if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  mailTransporter.verify((mailErr) => {
    if (mailErr) {
      console.warn('Email transporter verification failed:', mailErr);
      mailTransporter = null;
    } else {
      console.log('Email transporter is configured');
    }
  });
} else {
  console.warn('Email configuration missing: set EMAIL_USER and EMAIL_PASS in environment to enable appointment email notifications.');
}

// ══════════════════════════════════════════
// API: LOGIN
// ══════════════════════════════════════════
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  db.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) {
        console.error('Login query error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
      if (results.length === 0) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const user = results[0];
      res.json({
        success: true,
        user: {
          email: user.email,
          name:  user.name,
          role:  user.role,
        }
      });
    }
  );
});

// ══════════════════════════════════════════
// API: APPOINTMENTS CRUD
// ══════════════════════════════════════════

app.post('/api/appointments', (req, res) => {
  const { studentName, studentEmail, lecturerName, appointmentDate, appointmentTime, reason } = req.body;

  if (!studentName || !studentEmail || !lecturerName || !appointmentDate || !appointmentTime) {
    return res.status(400).json({ success: false, message: 'All required appointment fields must be provided.' });
  }

  const insertQuery = `
    INSERT INTO appointments (student_name, student_email, lecturer_name, appointment_date, appointment_time, reason)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(insertQuery, [studentName, studentEmail, lecturerName, appointmentDate, appointmentTime, reason || ''], (err, result) => {
    if (err) {
      console.error('Error creating appointment:', err);
      return res.status(500).json({ success: false, message: 'Unable to create appointment.' });
    }

    const appointmentId = result.insertId;
    const mailPayload = {
      from: process.env.EMAIL_USER || 'no-reply@mut.ac.za',
      to: lecturerEmail,
      subject: `New appointment booked by ${studentName}`,
      text: `A new appointment has been booked with ${lecturerName}.

Student: ${studentName}
Email: ${studentEmail}
Date: ${appointmentDate}
Time: ${appointmentTime}
Lecturer: ${lecturerName}
Reason: ${reason || 'Not provided'}

Please check your email platform for full details and confirm availability.`,
    };

    if (!mailTransporter) {
      console.warn('Email not sent because transporter is not configured.');
      return res.json({ success: true, message: 'Appointment booked successfully, but email notifications are not configured.', appointmentId });
    }

    mailTransporter.sendMail(mailPayload, (mailErr, info) => {
      if (mailErr) {
        console.error('Error sending appointment email:', mailErr);
        return res.status(500).json({ success: false, message: 'Appointment booked but failed to send email notification.' });
      }

      res.json({ success: true, message: 'Appointment booked successfully.', appointmentId, mailInfo: info });
    });
  });
});

app.get('/api/appointments', (req, res) => {
  const { studentEmail, lecturerName } = req.query;

  if (!studentEmail && !lecturerName) {
    return res.status(400).json({ success: false, message: 'studentEmail or lecturerName query parameter is required.' });
  }

  let query = 'SELECT id, student_name, student_email, lecturer_name, appointment_date AS date, appointment_time AS time, reason, status FROM appointments WHERE ';
  const params = [];

  if (studentEmail) {
    query += 'student_email = ?';
    params.push(studentEmail);
  }

  if (lecturerName) {
    if (studentEmail) query += ' AND ';
    query += 'lecturer_name = ?';
    params.push(lecturerName);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error retrieving appointments:', err);
      return res.status(500).json({ success: false, message: 'Unable to retrieve appointments.' });
    }
    res.json({ success: true, appointments: results });
  });
});

app.patch('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const { appointmentDate, appointmentTime } = req.body;

  if (!appointmentDate || !appointmentTime) {
    return res.status(400).json({ success: false, message: 'Date and time are required to update the appointment.' });
  }

  db.query(
    'UPDATE appointments SET appointment_date = ?, appointment_time = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [appointmentDate, appointmentTime, id],
    (err, result) => {
      if (err) {
        console.error('Error updating appointment:', err);
        return res.status(500).json({ success: false, message: 'Unable to update the appointment.' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Appointment not found.' });
      }
      res.json({ success: true, message: 'Appointment updated successfully.' });
    }
  );
});

app.delete('/api/appointments/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM appointments WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting appointment:', err);
      return res.status(500).json({ success: false, message: 'Unable to cancel the appointment.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Appointment not found.' });
    }
    res.json({ success: true, message: 'Appointment canceled successfully.' });
  });
});

// ══════════════════════════════════════════
// API: GET ALL PROGRAMMES
// ══════════════════════════════════════════
app.get('/api/programmes', (req, res) => {
  db.query('SELECT * FROM programmes', (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result);
    }
  });
});

// ══════════════════════════════════════════
// API: GET ALL USERS
// ══════════════════════════════════════════
app.get('/api/users', (req, res) => {
  db.query('SELECT id, email, name, role FROM users', (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result);
    }
  });
});

// ══════════════════════════════════════════
// START SERVER
// ══════════════════════════════════════════
app.listen(3000, () => {
  console.log('Server running → http://localhost:3000');
});
