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