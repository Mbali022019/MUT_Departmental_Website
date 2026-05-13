/* ═══════════════════════════════════════════════
   MUT ICT DEPARTMENT — MAIN JAVASCRIPT
   ═══════════════════════════════════════════════ */

// ── Init Lucide Icons ──
lucide.createIcons();

// ═══════════════════════════════════════════════
// MOBILE NAV
// ═══════════════════════════════════════════════
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(l =>
  l.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ═══════════════════════════════════════════════
// NAV SEARCH
// ═══════════════════════════════════════════════
const navSearchInput   = document.getElementById('nav-search-input');
const navSearchResults = document.getElementById('nav-search-results');
let navSearchIndex     = [];

function activateTabForElement(el) {
  const pane = el.closest('.tab-pane');
  if (!pane || pane.classList.contains('active')) return;
  const block = pane.closest('.tab-block');
  if (!block) return;
  block.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  block.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  pane.classList.add('active');
  const targetBtn = block.querySelector(`[data-pane="${pane.id}"]`);
  if (targetBtn) targetBtn.classList.add('active');
  lucide.createIcons();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightMatches(text, query) {
  if (!query || !text) return text;
  const words = Array.from(new Set(query.toLowerCase().match(/\b[a-z0-9]+\b/g) || []));
  if (!words.length) return text;
  const regex = new RegExp(`(${words.map(escapeRegExp).join('|')})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}

function debounce(fn, delay = 200) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}

function buildSearchIndex() {
  const items      = [];
  const seenTitles = new Set();

  const addItem = (type, title, section, target) => {
    if (title && !seenTitles.has(title)) {
      seenTitles.add(title);
      items.push({ type, title, section, text: title, target });
    }
  };

  document.querySelectorAll('.prog-card').forEach(card => {
    addItem('Programme', card.querySelector('.prog-title')?.textContent.trim(), 'Programmes Offered', card);
  });
  document.querySelectorAll('.skill-card').forEach(card => {
    addItem('WIL / Skill', card.querySelector('.skill-title')?.textContent.trim(), 'Work Integrated Learning', card);
  });
  document.querySelectorAll('.project-card').forEach(card => {
    addItem('Project', card.querySelector('.project-title')?.textContent.trim(), 'Student Projects', card);
  });
  document.querySelectorAll('.lecturer-card').forEach(card => {
    addItem('Lecturer', card.querySelector('.lecturer-name')?.textContent.trim(), 'Meet Our Lecturers', card);
  });
  document.querySelectorAll('.section-title').forEach(heading => {
    const target = heading.closest('.tab-pane') || heading.closest('section') || heading;
    addItem('Section', heading.textContent.trim(), 'Main Sections', target);
  });

  return items;
}

function renderSearchResults(query) {
  const lower = query.toLowerCase();
  if (!lower) {
    navSearchResults.classList.add('hidden');
    navSearchResults.innerHTML = '';
    return;
  }

  const filtered = navSearchIndex
    .map((item, index) => ({ ...item, index }))
    .filter(item => item.title.toLowerCase().includes(lower))
    .slice(0, 8);

  if (!filtered.length) {
    navSearchResults.innerHTML = `<div class="nav-search-result" style="pointer-events:none;"><span class="result-title">No results found</span><span class="result-meta">Try programmes, projects, or lecturers.</span></div>`;
    navSearchResults.classList.remove('hidden');
    return;
  }

  navSearchResults.innerHTML = filtered.map(item => `
    <div class="nav-search-result" data-index="${item.index}">
      <span class="result-label">${item.type}</span>
      <span class="result-title">${highlightMatches(item.title, query)}</span>
      <span class="result-meta">${item.section}</span>
    </div>
  `).join('');
  navSearchResults.classList.remove('hidden');
}

const debouncedSearch = debounce(query => renderSearchResults(query), 300);

navSearchInput?.addEventListener('input', e => debouncedSearch(e.target.value.trim()));

navSearchResults?.addEventListener('click', e => {
  const card = e.target.closest('.nav-search-result');
  if (!card) return;
  const item = navSearchIndex[Number(card.dataset.index)];
  if (!item) return;
  activateTabForElement(item.target);
  item.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  navSearchResults.classList.add('hidden');
});

window.addEventListener('click', e => {
  if (!e.target.closest('.nav-search-wrapper')) {
    navSearchResults?.classList.add('hidden');
  }
});

navSearchIndex = buildSearchIndex();

// ═══════════════════════════════════════════════
// TAB SYSTEM
// ═══════════════════════════════════════════════
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const blockId = btn.getAttribute('data-tab');
    const paneId  = btn.getAttribute('data-pane');
    if (!blockId || !paneId) return;

    const block = document.getElementById(blockId);
    if (!block) return;

    block.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    block.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    const pane = document.getElementById(paneId);
    if (pane) pane.classList.add('active');

    lucide.createIcons();
  });
});

// ── Nav anchor → tab auto-switch ──
const tabMap = {
  '#programmes-tab': { block: 'tab-about',  pane: 'about-programmes' },
  '#people-tab':     { block: 'tab-people', pane: 'people-lecturers' },
  '#campus-tab':     { block: 'tab-campus', pane: 'campus-news' },
};

document.querySelectorAll('a[href]').forEach(a => {
  a.addEventListener('click', function () {
    const href = this.getAttribute('href');
    if (!tabMap[href]) return;
    const { block, pane } = tabMap[href];
    const blockEl = document.getElementById(block);
    if (!blockEl) return;
    blockEl.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    blockEl.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    const targetBtn  = blockEl.querySelector(`[data-pane="${pane}"]`);
    const targetPane = document.getElementById(pane);
    if (targetBtn)  targetBtn.classList.add('active');
    if (targetPane) targetPane.classList.add('active');
    lucide.createIcons();
  });
});

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const t = document.querySelector(href);
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ═══════════════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════════════
function handleSubmit(e) {
  e.preventDefault();
  const name    = document.getElementById('cf-name').value.trim();
  const email   = document.getElementById('cf-email').value.trim();
  const subject = document.getElementById('cf-subject').value.trim();
  const message = document.getElementById('cf-message').value.trim();
  window.location.href = `mailto:ict@mut.ac.za`
    + `?subject=${encodeURIComponent(subject + ' — from ' + name)}`
    + `&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
  document.getElementById('contactForm').reset();
}

// ═══════════════════════════════════════════════
// PROGRAMME CARDS — REQUIREMENTS & BROCHURE
// ═══════════════════════════════════════════════
const brochures = {
  standard: `Diploma in Information Technology\nNQF Level: 6\nHEQSF Qualification Type: 63\nSAQA Credits: 360\nSAQA Qualification ID: 96862\nCESM Code: 06\n\nAdmission Requirements\nNational Senior Certificate (Diploma or higher) with:\n• English First Additional Language (3) OR English Home Language (3)\n• Mathematics (3) OR Mathematical Literacy (5)\n• Minimum 24 points in the best six subjects excluding Life Orientation.\n\nDuration of Study\n3-years full-time`,

  extended: `Diploma in Information Technology: Extended Curriculum Programme\nNQF Level: 6\nSAQA Qualification ID: 96862\nSAQA Credits: Minimum 480\n\nAdmission Requirements\nNational Senior Certificate (Diploma or higher) with:\n• English First Additional Language (3) OR English Home Language (3)\n• Mathematics (2) OR Mathematical Literacy (3)\n• Minimum 23 points in the best six subjects excluding Life Orientation.\n\nDuration of Study\n4-years full-time`,

  advanced: `Advanced Diploma in ICT in Applications Development\nNQF Level: 7\nSAQA ID: 117974\nSAQA Credits: 120\n\nMinimum Admission Requirements\n• A 360-credit Diploma or National Diploma in ICT (Level 6)\n• A Bachelor's Degree in a related IT field\n• Or via the institution's RPL process.\n\nDuration of Study\nFull-time: 1 year | Part-time: 2 years`,
};

function initProgrammeCards() {
  document.querySelectorAll('.prog-requirements-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const target  = button.dataset.target;
      const details = document.getElementById(`requirements-${target}`);
      if (!details) return;
      const open = details.classList.toggle('open');
      button.textContent = open ? 'Hide Requirements' : 'Entry Requirements';
    });
  });

  document.querySelectorAll('.download-brochure').forEach(button => {
    button.addEventListener('click', () => {
      const program = button.dataset.program;
      const content = brochures[program] || 'Brochure content not available.';
      const blob    = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url     = URL.createObjectURL(blob);
      const anchor  = document.createElement('a');
      anchor.href     = url;
      anchor.download = `${program}-brochure.txt`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
    });
  });
}

initProgrammeCards();

// ═══════════════════════════════════════════════
// NEWS MODAL
// ═══════════════════════════════════════════════
const newsModal    = document.getElementById('news-modal');
const modalTitle   = document.getElementById('modal-title');
const modalMeta    = document.getElementById('modal-meta');
const modalContent = document.getElementById('modal-content');
const modalClose   = document.getElementById('modal-close');

const newsData = {
  'lab-upgrade': {
    title: 'ICT Lab Upgrade',
    type: 'News',
    date: 'April 15, 2026',
    content: `
      <p>We're excited to announce the completion of a major upgrade to our ICT computer laboratories.</p>
      <p><strong>What was upgraded:</strong></p>
      <ul>
        <li>Complete replacement of all desktop computers with latest-generation processors</li>
        <li>Installation of high-speed fiber optic internet connections (1Gbps)</li>
        <li>New server infrastructure for cloud computing and virtualization labs</li>
        <li>Upgraded networking equipment including managed switches and wireless access points</li>
        <li>Specialized software for cybersecurity, data science, and AI development</li>
      </ul>
      <p>The upgraded facilities are now fully operational and available for student use.</p>
    `
  },
  'project-expo': {
    title: 'Final Year Project Expo',
    type: 'Event',
    date: 'May 15, 2026',
    time: '10:00 AM – 4:00 PM',
    venue: 'ICT Building Auditorium',
    content: `
      <p>Join us for our annual showcase of innovation!</p>
      <p><strong>Event Highlights:</strong></p>
      <ul>
        <li>Over 50 innovative projects on display</li>
        <li>Live demonstrations of working applications and systems</li>
        <li>Networking opportunities with industry professionals</li>
        <li>Industry judging panel with prizes for outstanding projects</li>
      </ul>
      <p><strong>Schedule:</strong></p>
      <ul>
        <li>10:00 AM: Opening ceremony</li>
        <li>10:30 AM – 2:00 PM: Project exhibitions</li>
        <li>2:00 PM – 3:00 PM: Networking session</li>
        <li>3:00 PM – 4:00 PM: Awards ceremony</li>
      </ul>
    `
  },
  'partnership-day': {
    title: 'Industry Partnership Day',
    type: 'Event',
    date: 'May 22, 2026',
    time: '9:00 AM – 1:00 PM',
    venue: 'MUT Conference Centre',
    content: `
      <p>Industry Partnership Day connects our ICT students with leading technology companies.</p>
      <p><strong>Participating Companies:</strong> Microsoft, Cisco, Oracle, SAP, Huawei, AWS</p>
      <p><strong>Activities Include:</strong></p>
      <ul>
        <li>Company presentations and technology demonstrations</li>
        <li>CV clinics and interview preparation workshops</li>
        <li>Internship and graduate program information sessions</li>
        <li>Live coding challenges and technical assessments</li>
      </ul>
    `
  },
  'cyber-workshop': {
    title: 'Cybersecurity Awareness Workshop',
    type: 'Event',
    date: 'June 3, 2026',
    time: '2:00 PM – 5:00 PM',
    venue: 'Lab B, ICT Block',
    content: `
      <p>A comprehensive workshop to equip you with essential cybersecurity knowledge.</p>
      <p><strong>Workshop Topics:</strong></p>
      <ul>
        <li>Understanding common cyber threats (phishing, malware, ransomware)</li>
        <li>Password security and multi-factor authentication</li>
        <li>Safe browsing habits and online privacy</li>
        <li>Social engineering awareness and prevention</li>
        <li>Legal aspects of cybersecurity in South Africa</li>
      </ul>
      <p>Free and open to all MUT community members. Space is limited!</p>
    `
  }
};

function openNewsModal(newsId) {
  const data = newsData[newsId];
  if (!data) return;
  modalTitle.textContent = data.title;
  let metaHTML = `<span><i data-lucide="tag" style="width:14px;height:14px;"></i> ${data.type}</span>`;
  if (data.date)  metaHTML += `<span><i data-lucide="calendar" style="width:14px;height:14px;"></i> ${data.date}</span>`;
  if (data.time)  metaHTML += `<span><i data-lucide="clock" style="width:14px;height:14px;"></i> ${data.time}</span>`;
  if (data.venue) metaHTML += `<span><i data-lucide="map-pin" style="width:14px;height:14px;"></i> ${data.venue}</span>`;
  modalMeta.innerHTML    = metaHTML;
  modalContent.innerHTML = data.content;
  newsModal.classList.add('show');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

function closeNewsModal() {
  newsModal.classList.remove('show');
  document.body.style.overflow = '';
}

document.querySelectorAll('.news-card-read-more').forEach(link => {
  link.addEventListener('click', e => {
    e.stopPropagation();
    const newsId = link.closest('.news-card')?.getAttribute('data-news-id');
    if (newsId) openNewsModal(newsId);
  });
});

modalClose.addEventListener('click', closeNewsModal);
newsModal.addEventListener('click', e => { if (e.target === newsModal) closeNewsModal(); });

// ═══════════════════════════════════════════════
// CAO MODAL
// ═══════════════════════════════════════════════
const caoOpen  = document.getElementById('cao-open');
const caoModal = document.getElementById('cao-modal');
const caoClose = document.getElementById('cao-close');

caoOpen?.addEventListener('click', () => {
  if (caoModal) caoModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
});
caoClose?.addEventListener('click', () => {
  if (caoModal) caoModal.style.display = 'none';
  document.body.style.overflow = '';
});
caoModal?.addEventListener('click', e => {
  if (e.target === caoModal) {
    caoModal.style.display = 'none';
    document.body.style.overflow = '';
  }
});

// ═══════════════════════════════════════════════
// PROJECT DEMO LINKS
// ═══════════════════════════════════════════════
document.querySelectorAll('.project-demo-link').forEach(link => {
  link.addEventListener('click', e => {
    e.stopPropagation();
    const demoUrl = link.closest('.project-card')?.getAttribute('data-project-demo');
    if (demoUrl) window.open(demoUrl, '_blank');
  });
});

// ═══════════════════════════════════════════════
// NEWS CARD ANIMATION
// ═══════════════════════════════════════════════
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate'); }),
  { threshold: 0.1 }
);
document.querySelectorAll('.news-card').forEach(el => observer.observe(el));

// ═══════════════════════════════════════════════
// LOGIN & AUTHENTICATION — REAL DATABASE
// ═══════════════════════════════════════════════
const authSystem = {
  isLoggedIn() {
    return !!localStorage.getItem('currentUser');
  },

  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },

  async login(email, password) {
    try {
      const res  = await fetch('http://localhost:3000/api/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message || 'Invalid email or password' };
      }

      localStorage.setItem('currentUser', JSON.stringify(data.user));
      return { success: true, user: data.user };

    } catch (err) {
      console.error('Login error:', err);
      return { success: false, message: 'Could not connect to server. Make sure node server.js is running.' };
    }
  },

  logout() {
    localStorage.removeItem('currentUser');
  },
};

function openLoginModal() {
  if (authSystem.isLoggedIn()) { showDashboard(); return; }
  const modal = document.getElementById('login-modal');
  if (modal) modal.style.display = 'flex';
}

function closeLoginModal() {
  const modal = document.getElementById('login-modal');
  if (modal) modal.style.display = 'none';
}

async function handleLoginSubmit(event) {
  event.preventDefault();
  const email    = document.getElementById('login-email')?.value.trim();
  const password = document.getElementById('login-password')?.value;
  const errorMsg = document.getElementById('login-error');
  const signInBtn = event.target.querySelector('button[type="submit"]');

  if (!email || !password) {
    if (errorMsg) errorMsg.textContent = 'Please fill in both fields';
    return;
  }

  // Show loading state
  if (signInBtn) { signInBtn.textContent = 'Signing in...'; signInBtn.disabled = true; }
  if (errorMsg)  errorMsg.textContent = '';

  const result = await authSystem.login(email, password);

  // Reset button
  if (signInBtn) { signInBtn.textContent = 'Sign In'; signInBtn.disabled = false; }

  if (!result.success) {
    if (errorMsg) errorMsg.textContent = result.message;
    return;
  }

  closeLoginModal();
  showDashboard();
}

function showDashboard() {
  const user = authSystem.getCurrentUser();
  if (!user) return;
  window.location.href = user.role === 'student' ? 'student-dashboard.html' : 'staff-dashboard.html';
}

function handleLogout() {
  authSystem.logout();
  window.location.href = 'index.html';
}

// ═══════════════════════════════════════════════
// CHATBOT
// ═══════════════════════════════════════════════
const chatbot = {
  isOpen: false,
  messages: [],
  voiceEnabled: true,
  isListening: false,
  recognition: null,
  selectedVoice: null,

  init() {
    document.getElementById('chatbot-btn').addEventListener('click',        () => this.toggle());
    document.getElementById('chatbot-close').addEventListener('click',      () => this.toggle());
    document.getElementById('chatbot-send').addEventListener('click',       () => this.sendMessage());
    document.getElementById('chatbot-mic-toggle').addEventListener('click', () => this.toggleMicInput());
    document.getElementById('chatbot-input').addEventListener('keypress',   e => {
      if (e.key === 'Enter') this.sendMessage();
    });
    this.faqKnowledge = this.buildFaqKnowledge();
    this.initSpeech();
    this.addMessage('bot', 'Hi there! 🎓 I\'m MUT Bot! Ask me anything about our ICT programs. ✨');
  },

  toggle() {
    this.isOpen = !this.isOpen;
    document.getElementById('chatbot-widget').style.display = this.isOpen ? 'flex' : 'none';
    if (this.isOpen) document.getElementById('chatbot-input').focus();
  },

  sendMessage(mode = 'text', providedText = null) {
    const input = document.getElementById('chatbot-input');
    const msg   = (providedText || (input ? input.value : '')).trim();
    if (!msg) return;
    if (input) input.value = '';
    this.addMessage('user', msg);
    setTimeout(() => {
      const response = this.getResponse(msg.toLowerCase());
      const speak    = mode === 'voice' && this.voiceEnabled;
      this.addMessage('bot', response, speak);
    }, 600);
  },

  addMessage(sender, text, speak = false) {
    this.messages.push({ sender, text });
    const container = document.getElementById('chatbot-messages');
    const msgEl     = document.createElement('div');
    msgEl.className = `chatbot-msg chatbot-msg-${sender}`;
    const textSpan  = document.createElement('span');
    textSpan.textContent = text;
    msgEl.appendChild(textSpan);
    container.appendChild(msgEl);
    container.scrollTop = container.scrollHeight;
    if (sender === 'bot' && speak) this.speak(text);
  },

  speak(text) {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang  = 'en-ZA';
    utterance.rate  = 1;
    utterance.pitch = 1;
    if (this.selectedVoice) utterance.voice = this.selectedVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  },

  initSpeech() {
    if (!window.speechSynthesis) return;
    const choose = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;
      this.selectedVoice = voices.find(v => /south africa|en-za/i.test(v.lang))
        || voices.find(v => /english/i.test(v.lang) && /female|google|zira|samantha/i.test(v.name))
        || voices.find(v => /english/i.test(v.lang));
    };
    choose();
    window.speechSynthesis.onvoiceschanged = choose;
  },

  toggleMicInput() {
    const micBtn      = document.getElementById('chatbot-mic-toggle');
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      this.addMessage('bot', 'Sorry, microphone input is not supported in this browser.');
      return;
    }
    if (this.isListening) { this.recognition?.stop(); return; }

    this.recognition                 = new Recognition();
    this.recognition.lang            = 'en-ZA';
    this.recognition.interimResults  = false;
    this.recognition.maxAlternatives = 1;
    this.isListening                 = true;
    if (micBtn) micBtn.style.background = 'rgba(245,200,66,0.22)';

    this.recognition.onresult = e => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
      const input      = document.getElementById('chatbot-input');
      if (input) input.value = transcript;
      this.sendMessage('voice', transcript);
    };
    this.recognition.onend = this.recognition.onerror = () => {
      this.isListening = false;
      if (micBtn) micBtn.style.background = 'rgba(255,255,255,0.12)';
    };
    this.recognition.start();
  },

  tokenize(text) {
    const stop = new Set(['what','is','the','and','are','of','in','to','for','a','an','how',
      'do','you','our','we','on','with','at','by','your','from','that','this','will','may',
      'can','it','they','after','see','which','does']);
    return (text.toLowerCase().match(/\b[a-z0-9]+\b/g) || []).filter(t => !stop.has(t));
  },

  buildFaqKnowledge() {
    const faqs = [
      { question: 'What are the entry requirements for the Diploma in ICT?',
        answer: 'A National Senior Certificate (NSC) with Mathematics and English at a minimum of level 3. Extended programme applicants may have slightly different criteria.' },
      { question: 'What is the difference between Extended and Standard programmes?',
        answer: 'The Extended programme spans 4 years with additional academic support. The Standard programme is 3 years. Both lead to the same Diploma qualification.' },
      { question: 'Which programming languages are taught?',
        answer: 'We cover Java, Python, C#, JavaScript, PHP, and SQL. Specific languages depend on the year of study and module.' },
      { question: 'Is Work Integrated Learning WIL included?',
        answer: 'Yes. In the final year, students complete a six-month in-service placement. It is assessed as a compulsory, credit-bearing part of the qualification.' },
      { question: 'What career paths are available after graduation?',
        answer: 'Graduates pursue roles as software developers, network administrators, cybersecurity specialists, database administrators, web developers, and IT project managers.' },
      { question: 'How do I apply?',
        answer: 'Applications are submitted through the CAO at cao.ac.za. Applications typically open in April each year.' },
    ];
    return faqs.map(f => ({ ...f, tokens: this.tokenize(f.question) }));
  },

  getResponse(msg) {
    const queryTokens = msg.match(/\b[a-z0-9]+\b/g) || [];
    let bestMatch = null, bestScore = 0;
    for (const faq of this.faqKnowledge) {
      const score = faq.tokens.reduce((s, t) => s + (queryTokens.includes(t) ? 1 : 0), 0);
      if (score > bestScore) { bestScore = score; bestMatch = faq; }
    }
    if (bestMatch && bestScore > 0) return `Here's what I found:\n${bestMatch.answer}`;

    const keywords = {
      program:    ['program','diploma','course','study','offer','degree'],
      admission:  ['admission','apply','entry','requirement','qualify','enroll','register'],
      contact:    ['contact','phone','email','address','reach','location','where'],
      skills:     ['skill','learn','teach','subject','module','training'],
      lecturer:   ['lecturer','professor','instructor','teacher','staff','faculty'],
      employment: ['employment','job','career','graduate','work','recruit'],
      fee:        ['fee','cost','price','tuition','afford','payment'],
      duration:   ['duration','long','years','time'],
      facilities: ['facility','lab','equipment','resource','computer'],
      wil:        ['wil','integrated','internship','practical','industry'],
    };

    const responses = {
      program:    ['📚 We offer three programmes:\n• Diploma in ICT (Extended) – 4 years\n• Diploma in ICT (Standard) – 3 years\n• Advanced Diploma – 1 year\n\nAll SAQA accredited! 🎯'],
      admission:  ['🎓 You\'ll need:\n• National Senior Certificate\n• Mathematics & English (minimum level 3)\n\nApply via the CAO website! 🚀'],
      contact:    ['📞 Reach out anytime!\n📧 ict@mut.ac.za\n☎️ +27 31 907 7111\n📍 511 Mangosuthu Highway, Umlazi, Durban 4031'],
      skills:     ['💻 You\'ll master:\n✨ Programming (Java, Python, C#)\n✨ Web Development\n✨ Networking & Security\n✨ Database Management\n✨ Cloud Computing'],
      lecturer:   ['👨‍🏫 Our lecturers have PhDs, Masters, and tons of industry experience. Check the People section! 🌟'],
      employment: ['🎉 We have an 85% employment rate!\nGrads work at FNB, MTN, Telkom, AWS, Microsoft & more! 💼'],
      fee:        ['💰 Fees are competitive & affordable. Financial aid & bursaries are available! 📊'],
      duration:   ['⏱️ Durations:\n• Extended: 4 years\n• Standard: 3 years\n• Advanced: 1 year'],
      facilities: ['🖥️ Our facilities:\n✓ 8+ Modern Computer Labs\n✓ High-speed internet\n✓ Linux & Windows servers\n✓ Networking equipment'],
      wil:        ['🤝 WIL is a six-month in-service training in the final semester, credit-bearing and compulsory. 💼'],
    };

    for (const [category, words] of Object.entries(keywords)) {
      if (words.some(w => msg.includes(w))) {
        const opts = responses[category];
        if (opts) return opts[Math.floor(Math.random() * opts.length)];
      }
    }

    const defaults = [
      "Great question! 🤔 Try asking about programs, admissions, skills, or contact info!",
      "I'm best at answering questions about our ICT programmes. Ask away! 🧠",
      "Ask me about degree programs, fees, or opportunities here at MUT! 🌟",
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
  },
};

// ── Initialise chatbot after DOM is ready ──
document.addEventListener('DOMContentLoaded', () => chatbot.init());
