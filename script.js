/* ══════════════════════════════════════════════════
   Venkateshwara Vidyalaya – script.js
   WhatsApp + Google Sheets Form Integration
   ══════════════════════════════════════════════════ */

/* ────────────────────────────────────────────────
   ⚙️ CONFIGURATION
   ──────────────────────────────────────────────── */
const WHATSAPP_NUMBER  = "916380284958";
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbzlszPSrN6DJh6OeRHUK_bUXNpiXkogsQs5c2tjdlxPA1vJKB9KUvYlX1od9l-kcXFnwQ/exec";

/* ════════════════════════════════════════════════
   MOBILE MENU (Hamburger)
   ════════════════════════════════════════════════ */
const mobileHamburger    = document.getElementById('mobileHamburger');
const mobileMenuOverlay  = document.getElementById('mobileMenuOverlay');
const mobileMenuClose    = document.getElementById('mobileMenuClose');

mobileHamburger?.addEventListener('click', () => {
  mobileMenuOverlay.classList.add('open');
  mobileHamburger.classList.add('active');
  document.body.style.overflow = 'hidden';
});

mobileMenuClose?.addEventListener('click', closeMobileMenu);

function closeMobileMenu() {
  mobileMenuOverlay?.classList.remove('open');
  mobileHamburger?.classList.remove('active');
  document.body.style.overflow = '';
}

function mobileNavigateTo(sectionId) {
  closeMobileMenu();
  document.getElementById('site-view').style.display    = '';
  document.getElementById('gallery-page').style.display = 'none';
  document.getElementById('staff-page').style.display   = 'none';

  setTimeout(() => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }, 80);
}

function mobileOpenGallery() {
  closeMobileMenu();
  setTimeout(() => openGalleryPage(), 80);
}

function mobileOpenStaff() {
  closeMobileMenu();
  setTimeout(() => openStaffPage(), 80);
}

/* ════════════════════════════════════════════════
   DESKTOP NAVIGATION
   ════════════════════════════════════════════════ */
function navigateTo(sectionId) {
  document.getElementById('site-view').style.display    = '';
  document.getElementById('gallery-page').style.display = 'none';
  document.getElementById('staff-page').style.display   = 'none';

  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active-link'));

  document.querySelectorAll('.nav-link').forEach(l => {
    if (l.getAttribute('onclick')?.includes(sectionId)) {
      l.classList.add('active-link');
    }
  });

  setTimeout(() => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }, 50);
}

function closePage(id) {
  document.getElementById(id).style.display = 'none';
  document.getElementById('site-view').style.display = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ════════════════════════════════════════════════
   AUTO IMAGE SLIDER
   ════════════════════════════════════════════════ */
const slides       = document.querySelectorAll('.slider-image');
const dots         = document.querySelectorAll('.dot');

let currentSlide = 0;
let sliderTimer  = null;

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide]?.classList.remove('active');

  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide].classList.add('active');
  dots[currentSlide]?.classList.add('active');
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function startSlider() {
  sliderTimer = setInterval(nextSlide, 4500);
}

const sliderContainer = document.querySelector('.slider-container');

sliderContainer?.addEventListener('mouseenter', () => clearInterval(sliderTimer));
sliderContainer?.addEventListener('mouseleave', startSlider);

if (slides.length > 0) {
  startSlider();
}

/* ════════════════════════════════════════════════
   FORM HELPERS
   ════════════════════════════════════════════════ */
function showToast(msg, type = 'success') {
  document.querySelector('.vv-toast')?.remove();

  const toast = document.createElement('div');

  toast.className = `vv-toast ${type}`;
  toast.textContent = msg;

  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 4500);
}

function clearFields(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

/* Send data to Google Sheets */
async function sendToGoogleSheet(data) {
  try {
    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return true;

  } catch (err) {
    console.warn('Google Sheet error:', err);
    return false;
  }
}

/* ════════════════════════════════════════════════
   ADMISSION ENQUIRY FORM SUBMIT
   ════════════════════════════════════════════════ */
async function submitEnquiry() {

  const parentName  = document.getElementById('eq-parent')?.value.trim()  || '';
  const studentName = document.getElementById('eq-student')?.value.trim() || '';
  const phone       = document.getElementById('eq-phone')?.value.trim()   || '';
  const email       = document.getElementById('eq-email')?.value.trim()   || '';
  const applyClass  = document.getElementById('eq-class')?.value          || '';
  const medium      = document.getElementById('eq-medium')?.value         || '';
  const message     = document.getElementById('eq-message')?.value.trim() || '';

  /* Validation */
  if (!parentName) {
    showToast('⚠️ Parent / Guardian Name is required!', 'error');
    document.getElementById('eq-parent')?.focus();
    return;
  }

  if (!studentName) {
    showToast('⚠️ Student Name is required!', 'error');
    document.getElementById('eq-student')?.focus();
    return;
  }

  if (!phone || phone.length < 10) {
    showToast('⚠️ Please enter a valid 10-digit phone number!', 'error');
    document.getElementById('eq-phone')?.focus();
    return;
  }

  if (!applyClass) {
    showToast('⚠️ Please select the class!', 'error');
    document.getElementById('eq-class')?.focus();
    return;
  }

  const btn = document.getElementById('eq-btn');

  btn.disabled = true;
  btn.textContent = '⏳ Sending...';

  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata'
  });

  const sheetData = {
    formType:    'Quick Enquiry',
    name:        parentName,
    studentName: studentName,
    phone:       phone,
    email:       email,
    className:   applyClass,
    medium:      medium,
    subject:     '',
    message:     message,
    timestamp:   timestamp
  };

  /* Save to Google Sheets */
  await sendToGoogleSheet(sheetData);

  /* Send to WhatsApp */
  const waText = encodeURIComponent(
`🏫 *Venkateshwara Vidyalaya – Admission Enquiry*
━━━━━━━━━━━━━━━━━━━━━━
👨‍👩‍👦 *Parent Name:* ${parentName}
👦 *Student Name:* ${studentName}
📞 *Phone:* ${phone}
📧 *Email:* ${email || 'Not provided'}
📚 *Applying for:* ${applyClass}
🗣️ *Medium:* ${medium || 'Not specified'}
💬 *Message:* ${message || 'No message'}
━━━━━━━━━━━━━━━━━━━━━━
📅 *Submitted:* ${timestamp}`
  );

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`,
    '_blank'
  );

  btn.disabled = false;
  btn.textContent = '📲 Submit & Send on WhatsApp';

  showToast(
    '✅ WhatsApp opened successfully! Data saved to Google Sheets.',
    'success'
  );

  const successEl = document.getElementById('formSuccess');

  if (successEl) {
    successEl.style.display = 'block';

    setTimeout(() => {
      successEl.style.display = 'none';
    }, 7000);
  }

  clearFields([
    'eq-parent',
    'eq-student',
    'eq-phone',
    'eq-email',
    'eq-class',
    'eq-medium',
    'eq-message'
  ]);

  const charEl = document.getElementById('eq-char');

  if (charEl) {
    charEl.textContent = '0/300';
  }
}

/* ════════════════════════════════════════════════
   CONTACT FORM SUBMIT
   ════════════════════════════════════════════════ */
async function submitContact() {

  const name    = document.getElementById('ct-name')?.value.trim()    || '';
  const email   = document.getElementById('ct-email')?.value.trim()   || '';
  const phone   = document.getElementById('ct-phone')?.value.trim()   || '';
  const subject = document.getElementById('ct-subject')?.value        || '';
  const message = document.getElementById('ct-message')?.value.trim() || '';

  /* Validation */
  if (!name) {
    showToast('⚠️ Name is required!', 'error');
    document.getElementById('ct-name')?.focus();
    return;
  }

  if (!phone || phone.length < 10) {
    showToast('⚠️ Please enter a valid 10-digit phone number!', 'error');
    document.getElementById('ct-phone')?.focus();
    return;
  }

  if (!message) {
    showToast('⚠️ Please enter your message!', 'error');
    document.getElementById('ct-message')?.focus();
    return;
  }

  const btn = document.getElementById('ct-btn');

  btn.disabled = true;
  btn.textContent = '⏳ Sending...';

  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata'
  });

  const sheetData = {
    formType:    'Contact Message',
    name:        name,
    studentName: '',
    phone:       phone,
    email:       email,
    className:   '',
    medium:      '',
    subject:     subject,
    message:     message,
    timestamp:   timestamp
  };

  /* Save to Google Sheets */
  await sendToGoogleSheet(sheetData);

  /* Send to WhatsApp */
  const waText = encodeURIComponent(
`🏫 *Venkateshwara Vidyalaya – Contact Message*
━━━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${name}
📞 *Phone:* ${phone}
📧 *Email:* ${email || 'Not provided'}
📋 *Subject:* ${subject || 'General'}
💬 *Message:* ${message}
━━━━━━━━━━━━━━━━━━━━━━
📅 *Submitted:* ${timestamp}`
  );

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`,
    '_blank'
  );

  btn.disabled = false;
  btn.textContent = '📲 Send via WhatsApp';

  showToast(
    '✅ WhatsApp opened successfully! Data saved to Google Sheets.',
    'success'
  );

  const successEl = document.getElementById('contactSuccess');

  if (successEl) {
    successEl.style.display = 'block';

    setTimeout(() => {
      successEl.style.display = 'none';
    }, 7000);
  }

  clearFields([
    'ct-name',
    'ct-email',
    'ct-phone',
    'ct-subject',
    'ct-message'
  ]);

  const charEl = document.getElementById('ct-char');

  if (charEl) {
    charEl.textContent = '0/500';
  }
}
/* ════════════════════════════════════════════════
   GALLERY PAGE
   ════════════════════════════════════════════════ */

const GALLERY_DATA = {
  2025: {
    January:  [{ title: 'Pongal Celebration',    date: '14 Jan 2025', icon: '🎉', photos: 12 },
               { title: 'Republic Day Parade',   date: '26 Jan 2025', icon: '🇮🇳', photos: 8  }],
    February: [{ title: 'Annual Sports Day',     date: '08 Feb 2025', icon: '⚽', photos: 20 },
               { title: 'Science Exhibition',    date: '22 Feb 2025', icon: '🔬', photos: 15 }],
    March:    [{ title: 'Annual Day Celebration',date: '15 Mar 2025', icon: '🎭', photos: 30 }],
    April:    [{ title: 'Tamil New Year',        date: '14 Apr 2025', icon: '🌺', photos: 10 }],
    June:     [{ title: 'School Reopening',      date: '02 Jun 2025', icon: '🏫', photos: 6  }],
    August:   [{ title: 'Independence Day',      date: '15 Aug 2025', icon: '🇮🇳', photos: 9  },
               { title: 'Drawing Competition',   date: '22 Aug 2025', icon: '🎨', photos: 14 }],
    September:[{ title: 'Vinayagar Chaturthi',   date: '29 Sep 2025', icon: '🐘', photos: 11 }],
    October:  [{ title: 'Ayudha Pooja',          date: '01 Oct 2025', icon: '✨', photos: 7  },
               { title: 'Diwali Celebration',    date: '20 Oct 2025', icon: '🪔', photos: 13 }],
    November: [{ title: 'Children\'s Day',       date: '14 Nov 2025', icon: '👧', photos: 18 }],
    December: [{ title: 'Christmas Celebration', date: '24 Dec 2025', icon: '🎄', photos: 10 }]
  },
  2024: {
    January:  [{ title: 'Pongal Celebration',    date: '15 Jan 2024', icon: '🎉', photos: 10 }],
    March:    [{ title: 'Annual Day 2024',        date: '10 Mar 2024', icon: '🎭', photos: 25 }],
    August:   [{ title: 'Independence Day 2024', date: '15 Aug 2024', icon: '🇮🇳', photos: 8  }],
    November: [{ title: 'Children\'s Day 2024',  date: '14 Nov 2024', icon: '👧', photos: 15 }]
  },
  2023: {
    March:    [{ title: 'Annual Day 2023',        date: '12 Mar 2023', icon: '🎭', photos: 22 }],
    August:   [{ title: 'Independence Day 2023', date: '15 Aug 2023', icon: '🇮🇳', photos: 7  }]
  }
};

let selectedYear  = null;
let selectedMonth = null;
let selectedEvent = null;
let lbPhotos      = [];
let lbIndex       = 0;

function openGalleryPage() {
  document.getElementById('site-view').style.display    = 'none';
  document.getElementById('gallery-page').style.display = '';
  document.getElementById('staff-page').style.display   = 'none';
  showYearView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showYearView() {
  document.getElementById('gallery-year-view').style.display  = '';
  document.getElementById('gallery-month-view').style.display = 'none';
  document.getElementById('gallery-event-view').style.display = 'none';
  document.getElementById('gallery-photo-view').style.display = 'none';

  const grid = document.getElementById('yearGrid');
  grid.innerHTML = '';

  Object.keys(GALLERY_DATA).sort((a,b) => b - a).forEach(year => {
    const totalPhotos = Object.values(GALLERY_DATA[year])
      .flat().reduce((s, e) => s + e.photos, 0);
    const totalEvents = Object.values(GALLERY_DATA[year]).flat().length;
    const btn = document.createElement('button');
    btn.className = 'year-btn';
    btn.innerHTML = `<span>${year}</span><small>${totalEvents} Events · ${totalPhotos} Photos</small>`;
    btn.onclick = () => showMonthView(year);
    grid.appendChild(btn);
  });
}

function showMonthView(year) {
  if (year) selectedYear = year;
  document.getElementById('gallery-year-view').style.display  = 'none';
  document.getElementById('gallery-month-view').style.display = '';
  document.getElementById('gallery-event-view').style.display = 'none';
  document.getElementById('gallery-photo-view').style.display = 'none';
  document.getElementById('selected-year-title').textContent  = selectedYear;

  const MONTH_ICONS = {
    January:'❄️', February:'🌸', March:'🌼', April:'🌺',
    May:'☀️', June:'🌧️', July:'🌈', August:'🇮🇳',
    September:'🍂', October:'🪔', November:'🍁', December:'🎄'
  };

  const grid = document.getElementById('monthGrid');
  grid.innerHTML = '';

  const months = GALLERY_DATA[selectedYear] || {};
  Object.keys(months).forEach(month => {
    const count = months[month].length;
    const photos = months[month].reduce((s,e) => s + e.photos, 0);
    const btn = document.createElement('div');
    btn.className = 'month-btn';
    btn.innerHTML = `
      <div class="m-icon">${MONTH_ICONS[month] || '📅'}</div>
      <div class="m-name">${month}</div>
      <div class="m-count">${count} event${count>1?'s':''} · ${photos} photos</div>`;
    btn.onclick = () => showEventView(month);
    grid.appendChild(btn);
  });
}

function showEventView(month) {
  if (month) selectedMonth = month;
  document.getElementById('gallery-year-view').style.display  = 'none';
  document.getElementById('gallery-month-view').style.display = 'none';
  document.getElementById('gallery-event-view').style.display = '';
  document.getElementById('gallery-photo-view').style.display = 'none';
  document.getElementById('selected-month-title').textContent = `${selectedMonth} ${selectedYear}`;

  const grid = document.getElementById('eventLinksGrid');
  grid.innerHTML = '';

  const events = (GALLERY_DATA[selectedYear] || {})[selectedMonth] || [];
  events.forEach(ev => {
    const card = document.createElement('div');
    card.className = 'event-link-card';
    card.innerHTML = `
      <div class="elc-icon">${ev.icon}</div>
      <div class="elc-title">${ev.title}</div>
      <div class="elc-date">📅 ${ev.date}</div>
      <div class="elc-photos">📷 ${ev.photos} Photos</div>`;
    card.onclick = () => showPhotoView(ev);
    grid.appendChild(card);
  });
}

function showPhotoView(ev) {
  selectedEvent = ev;
  document.getElementById('gallery-year-view').style.display  = 'none';
  document.getElementById('gallery-month-view').style.display = 'none';
  document.getElementById('gallery-event-view').style.display = 'none';
  document.getElementById('gallery-photo-view').style.display = '';
  document.getElementById('selected-event-title').textContent = ev.title;
  document.getElementById('selected-event-date').textContent  = ev.date;

  const mosaic = document.getElementById('photoMosaic');
  mosaic.innerHTML = '';

  lbPhotos = [];
  for (let i = 1; i <= ev.photos; i++) {
    lbPhotos.push({ icon: ev.icon, label: `${ev.title} – Photo ${i}` });
    const thumb = document.createElement('div');
    thumb.className = 'photo-thumb';
    thumb.style.fontSize = '48px';
    thumb.innerHTML = `${ev.icon}<div class="pt-label">Photo ${i}</div>`;
    thumb.onclick = () => openLightbox(i - 1);
    mosaic.appendChild(thumb);
  }
}

function openLightbox(index) {
  lbIndex = index;
  document.getElementById('lightbox').classList.add('open');
  document.getElementById('lb-photo').innerHTML   = `<span style="font-size:80px">${lbPhotos[lbIndex].icon}</span>`;
  document.getElementById('lb-caption').textContent = lbPhotos[lbIndex].label;
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

function lbNav(dir) {
  lbIndex = (lbIndex + dir + lbPhotos.length) % lbPhotos.length;
  document.getElementById('lb-photo').innerHTML    = `<span style="font-size:80px">${lbPhotos[lbIndex].icon}</span>`;
  document.getElementById('lb-caption').textContent = lbPhotos[lbIndex].label;
}

/* ════════════════════════════════════════════════
   STAFF PAGE
   ════════════════════════════════════════════════ */

function openStaffPage() {
  document.getElementById('site-view').style.display    = 'none';
  document.getElementById('gallery-page').style.display = 'none';
  document.getElementById('staff-page').style.display   = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}