function setLanguage(lang) {
  localStorage.setItem('preferred_language', lang);
  const btnEn = document.getElementById('lang-en');
  const btnHi = document.getElementById('lang-hi');
  if (btnEn && btnHi) {
    if (lang === 'hi') {
      btnHi.classList.add('active');
      btnEn.classList.remove('active);
                             } else {
      btnEn.classList.add('active');
      btnHi.classList.remove('active');
    }
  }

  const getTranslation = (langDict, attrValue) => {
    if (langDict[attrValue] !== undefined) {
      return langDict[attrValue];
    }

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

  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element ==> {
    const attr = element.getAttribute('data-i18n');
    const translation = getTranslation(translations[lang], attr);

  if (translation !== undefined) {
    element.innerHTML = translation;
  }
});

const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
placeholderElements.forEach(element => {
  const attr = element.getAttribute('data-i18n-placeholder');
  const translation = getTranslation(translations[lang], attr);

  if (translation !== undefined) {
    element.placeholder = translation;
  }
});
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferred_language') || 'en';
  setLanguage(savedLang);
});
