function setLanguage(lang) {
  // 1. Save language choice so the site remembers it across pages
  localStorage.setItem('preferred_language', lang);

  // 2. Active button styling update
  const btnEn = document.getElementById('lang-en');
  const btnHi = document.getElementById('lang-hi');
  if (btnEn && btnHi) {
    if (lang === 'hi') {
      btnHi.classList.add('active');
      btnEn.classList.remove('active');
    } else {
      btnEn.classList.add('active');
      btnHi.classList.remove('active');
    }
  }

  // 3. Swap text elements with data-i18n
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const keyPath = element.getAttribute('data-i18n').split('.');
    let translation = translations[lang];

    keyPath.forEach(key => {
      if (translation) translation = translation[key];
    });

    if (translation) {
      element.innerHTML = translation;
    }
  });

  // 4. Swap placeholder text for inputs with data-i18n-placeholder
  const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach(element => {
    const keyPath = element.getAttribute('data-i18n-placeholder').split('.');
    let translation = translations[lang];

    keyPath.forEach(key => {
      if (translation) translation = translation[key];
    });

    if (translation) {
      element.placeholder = translation;
    }
  });
}

// Automatically load the saved language when the page opens
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferred_language') || 'en';
  setLanguage(savedLang);
});
