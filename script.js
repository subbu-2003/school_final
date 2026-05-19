/* ============================================================
   VENKATESHWARA VIDYALAYA – script.js
   ============================================================ */

/* ══════════════════════════════════════════
   1. NAVBAR
   ══════════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  hamburger.classList.toggle('active');
});

function closeNav() { navLinks?.classList.remove('open'); }

window.addEventListener('scroll', () => {
  const nb = document.getElementById('navbar');
  if (nb) nb.style.boxShadow = window.scrollY > 10
    ? '0 4px 24px rgba(0,0,0,0.35)' : '0 2px 20px rgba(0,0,0,0.25)';
});

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/* ══════════════════════════════════════════
   2. HERO STATS COUNTER
   ══════════════════════════════════════════ */
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = +el.dataset.target;
    let cur = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      cur = Math.min(cur + step, target);
      el.textContent = cur + (el.dataset.suffix || '');
      if (cur >= target) clearInterval(timer);
    }, 25);
  });
}
window.addEventListener('load', () => setTimeout(animateCounters, 400));

/* ══════════════════════════════════════════
   3. PAGE SWITCHER  (site / gallery / staff / erp)
   ══════════════════════════════════════════ */
function showSite() {
  document.getElementById('site-view').style.display   = '';
  document.getElementById('gallery-page').style.display = 'none';
  document.getElementById('staff-page').style.display   = 'none';
  document.getElementById('erp-view').style.display     = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function closePage(id) {
  document.getElementById(id).style.display = 'none';
  document.getElementById('site-view').style.display = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ══════════════════════════════════════════
   4. GALLERY DATA
   ══════════════════════════════════════════ */
const MONTHS = [
  { name: 'January',   icon: '❄️'  },
  { name: 'February',  icon: '💛'  },
  { name: 'March',     icon: '🌸'  },
  { name: 'April',     icon: '☀️'  },
  { name: 'May',       icon: '🌿'  },
  { name: 'June',      icon: '🎭'  },
  { name: 'July',      icon: '🌧️'  },
  { name: 'August',    icon: '🇮🇳'  },
  { name: 'September', icon: '📚'  },
  { name: 'October',   icon: '🪔'  },
  { name: 'November',  icon: '🎨'  },
  { name: 'December',  icon: '🎄'  },
];

/* Events per month – emoji acts as a placeholder photo */
const EVENTS_DATA = {
  January:  [
    { title: 'Pongal Celebration',       icon: '🪔', date: 'Jan 14', photos: ['🎊','🪔','🌾','🎉','🙏','🌺'] },
    { title: 'Republic Day Rehearsal',   icon: '🇮🇳', date: 'Jan 22', photos: ['🇮🇳','🥁','👧','👦','🎺','🎶'] },
  ],
  February: [
    { title: 'Tamil Essay Competition',  icon: '📝', date: 'Feb 12', photos: ['✏️','📄','🏆','👩‍🏫','📚','🎓'] },
    { title: 'Valentine Reading Week',   icon: '📖', date: 'Feb 14', photos: ['📖','❤️','📚','🌹','✨','👶'] },
  ],
  March: [
    { title: 'Science Exhibition',       icon: '🔬', date: 'Mar 8',  photos: ['🔭','⚗️','💡','🔬','🧲','🌍'] },
    { title: 'Inter-School Cricket',     icon: '🏏', date: 'Mar 20', photos: ['🏏','🏟️','🧢','👏','🏆','🎯'] },
  ],
  April: [
    { title: 'Tamil New Year – Puthandu',icon: '🌺', date: 'Apr 14', photos: ['🌺','🎊','🥭','🙏','👘','🎉'] },
    { title: 'Drawing Competition',      icon: '🎨', date: 'Apr 24', photos: ['🎨','🖌️','🖼️','✏️','🎭','🌈'] },
  ],
  May: [
    { title: 'Sports Day',              icon: '🏃', date: 'May 10', photos: ['🏃','🏅','🥇','⚽','🏏','🤼'] },
    { title: 'Half-Yearly Exam',        icon: '📝', date: 'May 22', photos: ['📝','📚','✏️','🎒','📐','📏'] },
  ],
  June: [
    { title: 'Annual Day Celebration',  icon: '🎭', date: 'Jun 5',  photos: ['🎭','🎶','💃','🥁','🌟','🏆'] },
    { title: 'Tree Plantation Drive',   icon: '🌱', date: 'Jun 20', photos: ['🌱','🌳','🌿','💚','🪴','🌍'] },
  ],
  July: [
    { title: 'Kargil Vijay Diwas',      icon: '🎖️', date: 'Jul 26', photos: ['🎖️','🇮🇳','🕊️','🌹','📜','🌟'] },
    { title: 'Monsoon Clean Camp',      icon: '🌧️', date: 'Jul 15', photos: ['🌧️','🧹','♻️','💧','🌿','👧'] },
  ],
  August: [
    { title: 'Independence Day',        icon: '🇮🇳', date: 'Aug 15', photos: ['🇮🇳','🥁','🎺','👮','🎉','✨'] },
    { title: 'Onam Celebration',        icon: '🌸', date: 'Aug 28', photos: ['🌸','🎊','🌺','🍛','💃','🎶'] },
  ],
  September:[
    { title: 'Teacher\'s Day',          icon: '👩‍🏫', date: 'Sep 5', photos: ['👩‍🏫','🌹','📚','🎁','❤️','🙏'] },
    { title: 'Hindi Diwas',             icon: '📜', date: 'Sep 14', photos: ['📜','✍️','📖','🎙️','🗣️','📝'] },
  ],
  October: [
    { title: 'Gandhi Jayanthi',         icon: '🕊️', date: 'Oct 2',  photos: ['🕊️','🌹','🇮🇳','📜','🙏','✨'] },
    { title: 'Diwali Celebration',      icon: '🪔', date: 'Oct 24', photos: ['🪔','🎆','🎇','✨','🎉','🌟'] },
    { title: 'Children\'s Day Prep',    icon: '👧', date: 'Oct 30', photos: ['👧','👦','🎈','🎊','🎁','🌟'] },
  ],
  November:[
    { title: 'Children\'s Day',         icon: '🎈', date: 'Nov 14', photos: ['🎈','🎉','🎊','🎁','🎠','🌈'] },
    { title: 'School Science Expo',     icon: '🔭', date: 'Nov 22', photos: ['🔭','⚗️','💡','🚀','🔬','🌍'] },
  ],
  December:[
    { title: 'Christmas Celebration',   icon: '🎄', date: 'Dec 24', photos: ['🎄','🎅','🎁','⛄','❄️','🌟'] },
    { title: 'Annual Prize Distribution',icon:'🏆', date: 'Dec 28', photos: ['🏆','🥇','📜','🎓','👏','🌟'] },
  ],
};

let selectedYear = '', selectedMonth = '';
let currentPhotos = [], lightboxIndex = 0;

/* ── Open Gallery Page ── */
function openGalleryPage() {
  document.getElementById('site-view').style.display   = 'none';
  document.getElementById('staff-page').style.display   = 'none';
  document.getElementById('erp-view').style.display     = 'none';
  document.getElementById('gallery-page').style.display = '';
  showYearView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Year View ── */
function showYearView() {
  document.getElementById('gallery-year-view').style.display  = '';
  document.getElementById('gallery-month-view').style.display = 'none';
  document.getElementById('gallery-event-view').style.display = 'none';
  document.getElementById('gallery-photo-view').style.display = 'none';
  buildYearGrid();
}

function buildYearGrid() {
  const grid = document.getElementById('yearGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const years = [2020,2021,2022,2023,2024,2025,2026];
  years.forEach(y => {
    const btn = document.createElement('button');
    btn.className = 'year-btn';
    btn.innerHTML = `<span>${y}</span><small>View Gallery</small>`;
    btn.onclick = () => selectYear(y);
    grid.appendChild(btn);
  });
}

function selectYear(year) {
  selectedYear = year;
  document.getElementById('selected-year-title').textContent = year;
  document.getElementById('gallery-year-view').style.display  = 'none';
  document.getElementById('gallery-month-view').style.display = '';
  buildMonthGrid();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Month View ── */
function showMonthView() {
  document.getElementById('gallery-month-view').style.display = '';
  document.getElementById('gallery-event-view').style.display = 'none';
  document.getElementById('gallery-photo-view').style.display = 'none';
}

function buildMonthGrid() {
  const grid = document.getElementById('monthGrid');
  if (!grid) return;
  grid.innerHTML = '';
  MONTHS.forEach(m => {
    const events = EVENTS_DATA[m.name] || [];
    const div = document.createElement('div');
    div.className = 'month-btn';
    div.innerHTML = `
      <div class="m-icon">${m.icon}</div>
      <div class="m-name">${m.name} ${selectedYear}</div>
      <div class="m-count">${events.length} Event${events.length !== 1 ? 's' : ''}</div>`;
    div.onclick = () => selectMonth(m.name);
    grid.appendChild(div);
  });
}

function selectMonth(month) {
  selectedMonth = month;
  document.getElementById('selected-month-title').textContent = `${month} ${selectedYear}`;
  document.getElementById('gallery-month-view').style.display = 'none';
  document.getElementById('gallery-event-view').style.display = '';
  buildEventLinks();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Event View ── */
function showEventView() {
  document.getElementById('gallery-event-view').style.display = '';
  document.getElementById('gallery-photo-view').style.display = 'none';
}

function buildEventLinks() {
  const grid = document.getElementById('eventLinksGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const events = EVENTS_DATA[selectedMonth] || [];
  if (!events.length) {
    grid.innerHTML = '<p style="text-align:center;color:#6b7a99;padding:40px 0">No events recorded for this month.</p>';
    return;
  }
  events.forEach((ev, i) => {
    const card = document.createElement('div');
    card.className = 'event-link-card';
    card.innerHTML = `
      <div class="elc-icon">${ev.icon}</div>
      <div class="elc-title">${ev.title}</div>
      <div class="elc-date">📅 ${ev.date}, ${selectedYear}</div>
      <div class="elc-photos">📸 ${ev.photos.length} Photos →</div>`;
    card.onclick = () => openPhotos(ev);
    grid.appendChild(card);
  });
}

/* ── Photo View ── */
function openPhotos(ev) {
  currentPhotos = ev.photos;
  lightboxIndex = 0;
  document.getElementById('gallery-event-view').style.display = 'none';
  document.getElementById('gallery-photo-view').style.display = '';
  document.getElementById('selected-event-title').textContent = ev.title;
  document.getElementById('selected-event-date').textContent  = `${ev.date}, ${selectedYear}`;
  buildMosaic(ev);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function buildMosaic(ev) {
  const mosaic = document.getElementById('photoMosaic');
  if (!mosaic) return;
  mosaic.innerHTML = '';
  ev.photos.forEach((emoji, i) => {
    const div = document.createElement('div');
    div.className = 'photo-thumb';
    div.innerHTML = `${emoji}<div class="pt-label">${ev.title} – Photo ${i+1}</div>`;
    div.onclick = () => openLightbox(i, ev);
    mosaic.appendChild(div);
  });
}

/* ── Lightbox ── */
function openLightbox(idx, ev) {
  lightboxIndex = idx;
  const lb = document.getElementById('lightbox');
  lb.classList.add('open');
  updateLightbox(ev);
}

function updateLightbox(ev) {
  const photo   = currentPhotos[lightboxIndex];
  const lbPhoto = document.getElementById('lb-photo');
  const lbCap   = document.getElementById('lb-caption');
  if (lbPhoto) lbPhoto.innerHTML = `<span style="font-size:100px">${photo}</span>`;
  if (lbCap)   lbCap.textContent = `${selectedMonth} ${selectedYear} · ${ev?.title || ''} · ${lightboxIndex+1}/${currentPhotos.length}`;
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

function lbNav(dir) {
  lightboxIndex = (lightboxIndex + dir + currentPhotos.length) % currentPhotos.length;
  const ev = (EVENTS_DATA[selectedMonth] || []).find(e => e.photos === currentPhotos);
  updateLightbox(ev);
}

/* ══════════════════════════════════════════
   5. STAFF PAGE
   ══════════════════════════════════════════ */
function openStaffPage() {
  document.getElementById('site-view').style.display   = 'none';
  document.getElementById('gallery-page').style.display = 'none';
  document.getElementById('erp-view').style.display     = 'none';
  document.getElementById('staff-page').style.display   = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ══════════════════════════════════════════
   6. FORMS
   ══════════════════════════════════════════ */
function submitEnquiry() {
  const msg = document.getElementById('formSuccess');
  if (msg) { msg.style.display = 'block'; setTimeout(() => msg.style.display = 'none', 5000); }
}
function submitContact() {
  const msg = document.getElementById('contactSuccess');
  if (msg) { msg.style.display = 'block'; setTimeout(() => msg.style.display = 'none', 5000); }
}

/* ══════════════════════════════════════════
   7. ERP SYSTEM
   ══════════════════════════════════════════ */
let erpRole = 'admin';
const CREDENTIALS = {
  admin:   { user: 'admin',   pass: 'admin123'  },
  teacher: { user: 'teacher', pass: 'teach123'  },
  student: { user: 'student', pass: 'stu123'    },
  parent:  { user: 'parent',  pass: 'par123'    },
};

const NAV_ITEMS = {
  admin: [
    { id: 'dashboard',     icon: '🏠', label: 'Dashboard',      section: '' },
    { section: 'ACADEMICS' },
    { id: 'students',      icon: '👨‍🎓', label: 'Students'                    },
    { id: 'teachers',      icon: '👩‍🏫', label: 'Teachers'                    },
    { id: 'attendance',    icon: '✅', label: 'Attendance'                   },
    { id: 'absenthistory', icon: '📋', label: 'Absent History'               },
    { id: 'exams',         icon: '📝', label: 'Exams & Marks'                },
    { id: 'timetable',     icon: '📅', label: 'Timetable'                    },
    { section: 'ADMIN' },
    { id: 'fees',          icon: '💰', label: 'Fees'                         },
    { id: 'transport',     icon: '🚌', label: 'Transport'                    },
    { id: 'events',        icon: '🎭', label: 'Events'                       },
    { id: 'communication', icon: '📢', label: 'Communication'                },
    { id: 'accounts',      icon: '📊', label: 'Accounts'                     },
  ],
  teacher: [
    { id: 'dashboard',     icon: '🏠', label: 'Dashboard'  },
    { id: 'attendance',    icon: '✅', label: 'Attendance' },
    { id: 'absenthistory', icon: '📋', label: 'Absent History' },
    { id: 'exams',         icon: '📝', label: 'Marks Entry' },
    { id: 'timetable',     icon: '📅', label: 'Timetable'  },
    { id: 'communication', icon: '📢', label: 'Notices'    },
  ],
  student: [
    { id: 'studentportal', icon: '🎓', label: 'My Profile'   },
  ],
  parent: [
    { id: 'parentportal',  icon: '👨‍👩‍👦', label: 'Parent Portal' },
    { id: 'communication', icon: '📢', label: 'Notices'        },
  ],
};

function openERP() {
  document.getElementById('site-view').style.display   = 'none';
  document.getElementById('gallery-page').style.display = 'none';
  document.getElementById('staff-page').style.display   = 'none';
  document.getElementById('erp-view').style.display     = 'flex';
  document.getElementById('erp-view').style.flexDirection = 'column';
  document.getElementById('erp-login').classList.remove('hidden');
  document.getElementById('erp-login').style.display = 'flex';
  document.getElementById('erp-sidebar').style.display = 'none';
  document.getElementById('erp-main').style.display    = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setErpRole(el, role) {
  document.querySelectorAll('.role-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  erpRole = role;
}

function doErpLogin() {
  const u = document.getElementById('l-user')?.value.trim();
  const p = document.getElementById('l-pass')?.value.trim();
  const cred = CREDENTIALS[erpRole];
  if (u === cred.user && p === cred.pass) {
    document.getElementById('erp-login').style.display = 'none';
    document.getElementById('erp-sidebar').style.display = '';
    document.getElementById('erp-main').style.display    = '';
    const badge = document.getElementById('role-badge-display');
    if (badge) badge.textContent = { admin:'🛡️ Admin', teacher:'📚 Teacher', student:'🎓 Student', parent:'👪 Parent' }[erpRole];
    buildSidebar();
    buildBottomNav();
    buildDashboard();
    buildAttendanceTable();
    buildAbsentHistory();
    initAttendanceDate();
    initStarDisplays();
    showErpPage('dashboard');
    if (erpRole === 'student') showErpPage('studentportal');
    if (erpRole === 'parent')  showErpPage('parentportal');
  } else {
    alert('❌ Incorrect credentials. Check demo hints below.');
  }
}

function logoutERP() {
  document.getElementById('erp-login').style.display = 'flex';
  document.getElementById('erp-sidebar').style.display = 'none';
  document.getElementById('erp-main').style.display    = 'none';
  document.getElementById('site-view').style.display   = '';
  document.getElementById('erp-view').style.display     = 'none';
}

function buildSidebar() {
  const nav = document.getElementById('sidebar-nav-items');
  if (!nav) return;
  nav.innerHTML = '';
  (NAV_ITEMS[erpRole] || []).forEach(item => {
    if (item.section !== undefined) {
      if (item.section) {
        const lbl = document.createElement('div');
        lbl.className = 'sidebar-section-label';
        lbl.textContent = item.section;
        nav.appendChild(lbl);
      }
      return;
    }
    const div = document.createElement('div');
    div.className = 'sidebar-item';
    div.id = `si-${item.id}`;
    div.innerHTML = `<span class="si-icon">${item.icon}</span>${item.label}`;
    div.onclick = () => { showErpPage(item.id); closeErpSidebar(); };
    nav.appendChild(div);
  });
}

function buildBottomNav() {
  const bn = document.getElementById('erp-bottom-nav');
  if (!bn) return;
  bn.innerHTML = '';
  const items = (NAV_ITEMS[erpRole] || []).filter(i => i.id).slice(0, 5);
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'bnav-item';
    div.id = `bn-${item.id}`;
    div.innerHTML = `<div class="bnav-icon">${item.icon}</div>${item.label}`;
    div.onclick = () => showErpPage(item.id);
    bn.appendChild(div);
  });
}

function showErpPage(id) {
  document.querySelectorAll('.erp-page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(`erp-page-${id}`);
  if (page) page.classList.add('active');

  document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
  const si = document.getElementById(`si-${id}`);
  if (si) si.classList.add('active');

  document.querySelectorAll('.bnav-item').forEach(b => b.classList.remove('active'));
  const bn = document.getElementById(`bn-${id}`);
  if (bn) bn.classList.add('active');

  const titles = {
    dashboard:'Dashboard', students:'Students', teachers:'Teachers',
    attendance:'Attendance', absenthistory:'Absent History', fees:'Fees',
    exams:'Exams & Marks', timetable:'Timetable', events:'Events',
    transport:'Transport', communication:'Communication', accounts:'Accounts',
    studentportal:'Student Portal', parentportal:'Parent Portal',
  };
  const titleEl = document.getElementById('erp-topbar-title');
  if (titleEl) titleEl.textContent = titles[id] || id;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleErpSidebar() {
  document.getElementById('erp-sidebar').classList.toggle('open');
  document.getElementById('erp-sidebar-overlay').classList.toggle('open');
}
function closeErpSidebar() {
  document.getElementById('erp-sidebar').classList.remove('open');
  document.getElementById('erp-sidebar-overlay').classList.remove('open');
}

/* ── Dashboard Stats ── */
function buildDashboard() {
  const stats = [
    { icon:'👨‍🎓', label:'Total Students', value:'850', change:'+12 this term', color:'var(--royal)' },
    { icon:'👩‍🏫', label:'Teaching Staff',  value:'38',  change:'All Active',   color:'var(--green-light)' },
    { icon:'✅',   label:'Present Today',   value:'812', change:'95.5%',        color:'var(--saffron)' },
    { icon:'💰',   label:'Fees Collected',  value:'₹1.8L', change:'This Month', color:'var(--gold)' },
  ];
  const grid = document.getElementById('dashboard-stats');
  if (!grid) return;
  grid.innerHTML = '';
  stats.forEach(s => {
    const d = document.createElement('div');
    d.className = 'stat-card-erp';
    d.style.borderTop = `4px solid ${s.color}`;
    d.innerHTML = `<div class="sc-icon">${s.icon}</div><div class="sc-label">${s.label}</div>
      <div class="sc-value" style="color:${s.color}">${s.value}</div><div class="sc-change">${s.change}</div>`;
    grid.appendChild(d);
  });
}

/* ── Attendance ── */
const STUDENTS = {
  std5a: [
    { roll:1, name:'Arjun R.',     parent:'Ravi Kumar',     mobile:'6380623206' },
    { roll:2, name:'Priya S.',     parent:'Suresh S.',      mobile:'9876543210' },
    { roll:3, name:'Vikram M.',    parent:'Mohan M.',       mobile:'8765432109' },
    { roll:4, name:'Kavya T.',     parent:'Thiru T.',       mobile:'7654321098' },
    { roll:5, name:'Deepan K.',    parent:'Kumar K.',       mobile:'6543210987' },
  ],
  std4a: [
    { roll:1, name:'Ananya P.',    parent:'Prem P.',        mobile:'9988776655' },
    { roll:2, name:'Muthu S.',     parent:'Selvam S.',      mobile:'8877665544' },
    { roll:3, name:'Roshini R.',   parent:'Raja R.',        mobile:'7766554433' },
  ],
  std3a: [
    { roll:1, name:'Bala G.',      parent:'Ganesh G.',      mobile:'9090909090' },
    { roll:2, name:'Divya L.',     parent:'Lakshmi L.',     mobile:'8080808080' },
    { roll:3, name:'Karthick V.',  parent:'Vijay V.',       mobile:'7070707070' },
  ],
};
let attendanceData = {};

function initAttendanceDate() {
  const d = document.getElementById('att-date');
  if (d) d.value = new Date().toISOString().split('T')[0];
}

function buildAttendanceTable() {
  const cls     = document.getElementById('att-class-select')?.value || 'std5a';
  const students = STUDENTS[cls] || [];
  const tbody    = document.getElementById('att-student-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  students.forEach(s => {
    if (!attendanceData[s.roll]) attendanceData[s.roll] = 'P';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${s.roll}</td>
      <td style="font-weight:700">${s.name}</td>
      <td>
        <select class="att-status-select" onchange="updateAttStat(${s.roll}, this.value)">
          <option value="P" ${attendanceData[s.roll]==='P'?'selected':''}>✅ Present</option>
          <option value="A" ${attendanceData[s.roll]==='A'?'selected':''}>❌ Absent</option>
          <option value="OD" ${attendanceData[s.roll]==='OD'?'selected':''}>🏫 On Duty</option>
        </select>
      </td>`;
    tbody.appendChild(tr);
  });
  updateAttStats();
}

function updateAttStat(roll, val) {
  attendanceData[roll] = val;
  updateAttStats();
}

function updateAttStats() {
  const cls      = document.getElementById('att-class-select')?.value || 'std5a';
  const students = STUDENTS[cls] || [];
  const total    = students.length;
  const present  = students.filter(s => attendanceData[s.roll] === 'P').length;
  const absent   = students.filter(s => attendanceData[s.roll] === 'A').length;
  const od       = students.filter(s => attendanceData[s.roll] === 'OD').length;
  const pct      = total ? Math.round(present/total*100) : 0;
  const setEl = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  setEl('att-stat-present', present);
  setEl('att-stat-absent',  absent);
  setEl('att-stat-od',      od);
  setEl('att-stat-total',   total);
  setEl('att-stat-pct',     pct + '%');

  const panel = document.getElementById('att-absent-panel');
  if (panel) {
    const absentStudents = students.filter(s => attendanceData[s.roll] === 'A');
    panel.innerHTML = absentStudents.length
      ? absentStudents.map(s => `<li>❌ <strong>${s.name}</strong> – Roll ${s.roll}</li>`).join('')
      : '<li style="color:var(--green-light);font-weight:700">✅ No absences today!</li>';
  }
}

const absentHistory = [
  { date:'2025-05-15', cls:'Std V-A',  roll:3, name:'Vikram M.',  parent:'Mohan M.',   mobile:'8765432109', status:'Absent', notified:'Yes' },
  { date:'2025-05-15', cls:'Std IV-A', roll:2, name:'Muthu S.',   parent:'Selvam S.',  mobile:'8877665544', status:'Absent', notified:'Yes' },
  { date:'2025-05-14', cls:'Std V-A',  roll:4, name:'Kavya T.',   parent:'Thiru T.',   mobile:'7654321098', status:'Absent', notified:'No'  },
  { date:'2025-05-13', cls:'Std III-A',roll:1, name:'Bala G.',    parent:'Ganesh G.',  mobile:'9090909090', status:'Absent', notified:'Yes' },
];

function buildAbsentHistory(filtered) {
  const data  = filtered || absentHistory;
  const tbody = document.getElementById('absent-history-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  data.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.date}</td><td>${r.cls}</td><td>${r.roll}</td>
      <td style="font-weight:700">${r.name}</td><td>${r.parent}</td>
      <td>${r.mobile}</td>
      <td><span class="badge-pill pill-red">${r.status}</span></td>
      <td><span class="badge-pill ${r.notified==='Yes'?'pill-green':'pill-orange'}">${r.notified}</span></td>`;
    tbody.appendChild(tr);
  });
}

function filterAbsentHistory() {
  const date  = document.getElementById('filter-date')?.value;
  const cls   = document.getElementById('filter-class')?.value;
  let data = absentHistory;
  if (date) data = data.filter(r => r.date === date);
  if (cls && cls !== 'all') data = data.filter(r => r.cls === cls);
  buildAbsentHistory(data);
}

function saveAttendance() {
  showToast('✅ Attendance saved successfully!');
}

function sendAllAbsentWhatsApp() {
  const cls      = document.getElementById('att-class-select')?.value || 'std5a';
  const students = STUDENTS[cls] || [];
  const absent   = students.filter(s => attendanceData[s.roll] === 'A');
  if (!absent.length) { showToast('No absent students to notify!'); return; }
  const msg = encodeURIComponent(
    `🏫 Venkateshwara Vidyalaya\nDear Parent,\nYour child is ABSENT today.\nPlease contact the school if needed.\n📞 +91 6380284958`
  );
  window.open(`https://wa.me/?text=${msg}`, '_blank');
}

function downloadAbsentPDF() {
  if (typeof jspdf !== 'undefined' || window.jspdf) {
    showToast('📄 PDF generation ready. Add jsPDF library.');
  } else {
    showToast('📄 PDF download triggered!');
  }
}

/* ── Fee Receipt ── */
function showErpReceipt() {
  const area = document.getElementById('erp-receipt-area');
  if (area) { area.style.display = ''; showToast('✅ Fee collected & receipt generated!'); }
}

/* ── Stars ── */
const STAR_DATA = {
  academic:   5,
  sports:     4,
  arts:       3,
  discipline: 5,
  cultural:   4,
};
function getOverallStars() {
  const vals = Object.values(STAR_DATA);
  return Math.round(vals.reduce((a,b)=>a+b,0) / vals.length);
}
function starsHTML(n, max=5) {
  return '★'.repeat(n) + '☆'.repeat(max-n);
}
function initStarDisplays() {
  const overall = getOverallStars();
  const badge   = document.getElementById('student-star-badge');
  if (badge) badge.textContent = overall >= 4 ? '🌟' : overall >= 3 ? '⭐' : '✨';
  const profileStars = document.getElementById('profile-stars-display');
  if (profileStars) { profileStars.textContent = starsHTML(overall); profileStars.style.color = '#f9ca24'; }
  const profileLabel = document.getElementById('profile-star-label');
  if (profileLabel) profileLabel.textContent = ['','Needs Effort','Average','Good','Very Good','Excellent!'][overall];
  const childStars = document.getElementById('child-stars-parent');
  if (childStars) { childStars.textContent = starsHTML(overall); childStars.style.color = '#f9ca24'; }
}

/* ── Student Tabs ── */
function showStudentTab(id, btn) {
  document.querySelectorAll('#erp-page-studentportal .stab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('#erp-page-studentportal .stab').forEach(b => b.classList.remove('active'));
  const el = document.getElementById(`stab-${id}`);
  if (el) el.classList.add('active');
  if (btn) btn.classList.add('active');
}

function showParentTab(id, btn) {
  document.querySelectorAll('#erp-page-parentportal .stab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('#erp-page-parentportal .stab').forEach(b => b.classList.remove('active'));
  const el = document.getElementById(`stab-${id}`);
  if (el) el.classList.add('active');
  if (btn) btn.classList.add('active');
}

/* ── ERP Form Toggle ── */
function erpToggleForm(id) {
  const f = document.getElementById(id);
  if (f) f.style.display = f.style.display === 'none' ? '' : 'none';
}

/* ── Toast ── */
function showToast(msg) {
  let toast = document.getElementById('erp-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'erp-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ══════════════════════════════════════════
   8. INTERSECTION OBSERVER – Fade-in sections
   ══════════════════════════════════════════ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.hcard,.facility-card,.step,.value-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

/* ══════════════════════════════════════════
   9. KEYBOARD SHORTCUTS (Lightbox)
   ══════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb?.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft')  lbNav(-1);
  if (e.key === 'ArrowRight') lbNav(1);
});