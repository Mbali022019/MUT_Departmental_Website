# MUT ICT Department Portal - Implementation Guide

## Overview
This is a complete authentication and dashboard system for the MUT ICT Department website with role-based access control for students and staff.

## What's Been Implemented

### ✅ Main Features

#### 1. **Authentication System**
- Login modal on the homepage (replaced "Explore Programmes" button with "Login")
- Secure session management using localStorage
- Role-based access control (Students vs Staff)
- Mock user database with predefined credentials for testing

#### 2. **Student Dashboard** (`student-dashboard.html`)
- **Welcome Message**: Personalized greeting with student name
- **Appointment Booking System**:
  - Book appointments with lecturers (Dr. Mutanga, Mrs. Naidoo, Dr. Jugoo)
  - Select date, time, and meeting topic
  - Email confirmation notifications (simulated)
  - View booked appointments with details
  
- **Library Hours**:
  - Regular library operating hours (Mon-Fri, Sat, Sun)
  - Extended hours notice during test week
  - Visual display of current schedule

- **Announcements**:
  - Department-wide announcements visible to students
  - Important updates about events and deadlines
  - Can only see public announcements (not internal staff info)

- **Quick Stats**:
  - Class schedule information
  - Upcoming appointments counter

#### 3. **Staff Dashboard** (`staff-dashboard.html`)
- **Internal Authentication**: Only accessible to users with role='staff'

- **Key Features** (Staff-Only):
  - **Internal Announcements**: Staff-specific announcements including:
    - Department meetings
    - Memorial notices (e.g., funeral announcements for colleagues)
    - Staff development opportunities
  
  - **Department Updates**: Key announcements from management
  
  - **Upcoming Meetings**: Internal meetings calendar including:
    - Department heads meetings
    - Curriculum review sessions
    - Staff development workshops
  
  - **Workshop Dates**: Training opportunities for staff
  
  - **Statistics & Analytics**:
    - Staff allocation (12 total staff, 8 lecturers, etc.)
    - Module distribution across lecturers
    - Student enrollment by programme
    - Enrollment percentages (visual progress bars)
  
  - **Downloadable Files**:
    - University Policies & Guidelines
    - Staff Handbook
    - Code of Conduct
    - Department Strategic Plan
    - Academic Calendar
    - Curriculum Documents

## Testing the System

### Demo Credentials

**Students:**
- Email: `student@mut.ac.za`
- Password: `student123`

**Lecturers:**
- Email: `lecturer@mut.ac.za`
- Password: `lecturer123`

**Head of Department (HOD):**
- Email: `hod@mut.ac.za`
- Password: `hod123`

**Dean of Faculty:**
- Email: `dean@mut.ac.za`
- Password: `dean123`

### How to Test

1. **Home Page Login**:
   - Click "Login" button in navbar or hero section
   - Enter credentials from above
   - System will redirect to appropriate dashboard

2. **Student Dashboard Testing**:
   - Log in with student credentials
   - Try booking an appointment with a lecturer
   - Check library hours notice
   - View announcements

3. **Staff Dashboard Testing**:
   - Log in with staff credentials (any of the staff accounts)
   - View internal announcements
   - Check upcoming meetings
   - Review workshop schedule
   - View statistics (staff allocation, module distribution, student enrollment)
   - Download available resources

## Technical Implementation

### File Structure
```
index.html                   - Home page (modified with Login button + modal)
student-dashboard.html       - Student portal with appointments & library hours
staff-dashboard.html         - Staff-only internal portal
```

### Authentication Flow
1. User clicks "Login" button
2. Login modal appears with email/password fields
3. System checks credentials against mock database
4. If valid:
   - User data saved to localStorage
   - Redirect to appropriate dashboard based on role
5. If invalid:
   - Error message displayed

### Data Storage
- **Session Data**: Stored in browser's localStorage
- **Appointments**: Stored per student (key: `appointments_{email}`)
- **User Info**: Current user data in `currentUser` key

## Key Features Implementation Details

### Appointment Booking
- Students can book with selected lecturers
- Appointments stored in browser storage
- Mock email confirmations shown
- All appointments include date, time, and topic

### Role-Based Access
- Student: Limited to student features
- Staff: Access to internal information and reports
- No Admin role (as requested)

### Library Notices
- Regular hours displayed
- Dynamic notices for special weeks (e.g., test week extended hours)
- Can be easily updated

### Staff Statistics
- Staff allocation visualization
- Module distribution per lecturer
- Student enrollment tracking by programme
- Enrollment percentages shown with progress bars

### Downloadable Files (Staff-Only)
- Mock file downloads for policies, handbooks, etc.
- Can be connected to actual file server
- Different file types (PDF, ZIP, etc.)

## Future Enhancements

To make this production-ready, consider:

1. **Backend Integration**:
   - Replace mock authentication with real user database
   - Connect to university email system for real confirmations
   - Implement actual file storage

2. **Email Notifications**:
   - Send real emailconfirmations when appointments are booked
   - Send reminders for upcoming meetings

3. **Database Integration**:
   - Store appointments in persistent database
   - Track attendance and feedback

4. **Advanced Features**:
   - Appointment cancellation/rescheduling
   - Lecturer availability calendar
   - Automated email reminders
   - PDF generation for certificates/documents

5. **Security**:
   - Implement proper password hashing
   - Add HTTPS requirement
   - Session timeouts
   - Password reset functionality

## Notes

- This is a frontend demonstration system
- All data is stored locally in the browser
- Demo credentials are visible in the login modal for easy testing
- Mock appointments and announcements included for demonstration
- Can be easily connected to a backend API for production use

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires JavaScript enabled and localStorage support.
