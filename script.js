function setLanguage(lang) {
  // 1. Save language choice so the site remembers it
  localStorage.setItem('preferred_language', lang);

  // 2. Find every element on the page with a data-i18n tag and swap the text
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
}

// Automatically load the saved language when the page opens
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferred_language') || 'en';
  setLanguage(savedLang);
});
