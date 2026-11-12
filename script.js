function setLanguage(lang) {
  localStorage.setItem('preferred_language', lang);

  const btnEn = document.getElementById('lang-en');
  const btnHi = document.getElementById('lang-hi');
  if (btnEn && btnHi) {
    btnEn.classList.toggle('active', lang === 'en');
    btnHi.classList.toggle('active', lang === 'hi');
  }

  const dict = translations[lang];
  if (!dict) return;

  const getTranslation = (langDict, attrValue) => {
    // 1. Try direct flat key lookup (e.g., "marriage.heroTitle")
    if (langDict[attrValue] !== undefined) {
      return langDict[attrValue];
    }
    
    // 2. Try nested path lookup (e.g., "hero.subtitle")
    const keyPath = attrValue.split('.');
    let current = langDict;
    for (const key of keyPath) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return undefined;
      }
    }
    return typeof current === 'string' ? current : undefined;
  };

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const attr = el.getAttribute('data-i18n');
    const val = getTranslation(dict, attr);
    if (val !== undefined) {
      el.innerHTML = val;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const attr = el.getAttribute('data-i18n-placeholder');
    const val = getTranslation(dict, attr);
    if (val !== undefined) {
      el.placeholder = val;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferred_language') || 'en';
  setLanguage(savedLang);
});
