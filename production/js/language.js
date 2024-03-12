// 2021-05-05 12:50
const countryFallbackLanguage = {
  be: {
    lang: 'nl'
  },
  ch: {
    lang: 'de'
  },
  ua: {
    lang: 'ua'
  }
};

function getFallBackLangFromCountry(country) {
  try {
    const countryLowerCase = country.toLowerCase();
    return countryFallbackLanguage[countryLowerCase].lang;
  } catch (err) {
    throw new Error(`Fallback language for country ${country} not found!`);
  }
}

const supportedLanguages = ['nl', 'fr', 'de', 'it', 'ua', 'ru'];

function isLanguageSupported(language) {
  const lang = language.toLowerCase();
  return supportedLanguages.includes(lang);
}

const supportedFallbackCountries = ['be', 'ch', 'ua'];

function isFallbackCountrySupported(country) {
  const fallbackCountry = country.toLowerCase();
  return supportedFallbackCountries.includes(fallbackCountry);
}