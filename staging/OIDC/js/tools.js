// 2021-04-19 08:30
const CDC_PATH = 'https://cdc.myaccount.electroluxgroup.eu/js/gigya.js';
//const CDC_PATH = 'https://cdns.eu1.gigya.com/js/gigya.js';
const DEFAULT_BRAND = 'ELX';
const DEFAULT_LANGUAGE = 'en';
const DEFAULT_RENDERED_SCREEN = 'login';
const DEFAULT_COUNTRY = 'UK';
const DEFAULT_SOURCE_CODE = '150';
const DEFAULT_OPTANONCONSENT = 'False';
const DEFAULT_UAID = 'UA-52521113-3';
const DEFAULT_gl = '';
const LANG_SHORT_IN_URL_LOWER_CASE = 'langshort';
const LANG_SHORT_IN_URL_UPPER_CASE = 'LANGSHORT'
const LANG_LONG_IN_URL_LOWER_CASE = 'langlong';
const LANG_LONG_IN_URL_UPPER_CASE = 'LANGLONG';
const LETTERS_ONLY_REGEX = /^[a-zA-Z]*$/;
const DEFAULT_PASS_RETURN_URL = "https://t1-electrolux-qa-b.eluxmkt.com/en-gb/";

/**
 * Get the API key, as mandatory, from the URL.
 *
 * Gets the mandatory parameter API key from URL. If not present, an
 * exception is thrown.
 *
 * @param {object} urlSearchParamsObj - The URL search parameter object.
 * @throws {error} - If the mandatory parameter API key is not found.
 * @returns {string} - The API key
 */
 function getApiKeyAsMandatory(urlSearchParamsObj) {
  try {
   const apiKeyFromUrl = getApiKeyFromUrl(urlSearchParamsObj);
   if (apiKeyFromUrl) {
     return apiKeyFromUrl;
   } else {
     throw new Error('Mandatory API key parameter, is missing in URL!')
   }
  } catch (err) {
   throw new Error(err.message);
  }
}

/**
 * Gets the language with fallback for countries where fallback language is supported.
 * 
 * Returns the language, if the language is supported. If language is missing or not
 * supported, a fallback language is returned. The fallback language will be based
 * on the country for countires where fallback language is supported.
 * 
 * For countriesm, where fallback lanugages is not supported, it returns the
 * language (if present).
 *
 * @param {string} country - The country in the request URL
 * @param {string} language - The language in the request URL
 * * @throws {error} - If an error occurs when fetching the language.
 * @returns - The language 
 */
 function getLanguageWithFallback(country, language) {
  try {
    var lang = language;
    if (isFallbackCountrySupported(country)) {
      if (lang) {
        lang = isLanguageSupported(lang) ? lang : getFallBackLangFromCountry(country);
      } else {
        lang = getFallBackLangFromCountry(country);
      }
    }

    return lang
  } catch (err) {
    throw new Error(err.message);
  }
}

/**
 * Gets the query parameters from URL
 * 
 * Gets the queryParameters from the URL and creates a URL search parameter
 * object, which is an helper to handle query parameters.
 * To get the query parameters, the URL must contain a question mark.
 * 
 * @throws {error} - If fetching and creation of the URL search parameter object fails.
 * @returns {object} - The URL search parameter object.
 */
 function getUrlParametersObj() {
  try {
    const queryString = window.location.search;
    const urlSearchParamsObj = new URLSearchParams(queryString);

    return urlSearchParamsObj;
  } catch (err) {
    throw new Error(`Can not create URL parameters object: ${err.message}`);
  }
}

/**
 * Get API key from URL query parameters object.
 * 
 * Gets the API key from the query parameters object, which
 * contains the query parameters from URL. If the API key is
 * not present in the URL, an empty string is returned.
 * 
 * @param {object} urlSearchParamsObj - The URL search parameters object.
 * @throws {error} - If an error occures when fetching the API key.
 * @returns - The API key from the URL, otherwise an empty string
 */
function getApiKeyFromUrl(urlSearchParamsObj) {
  try {
    var apiKey = '';

    if (urlSearchParamsObj && urlSearchParamsObj.has('apiKey')) {
      apiKey = urlSearchParamsObj.get('apiKey');
    }

    return apiKey;
  } catch (err) {
    throw new Error(`Can not get API key: ${err.message}`);
  }
}

/**
 * Get child API key from URL query parameters object.
 * 
 * Gets the child API key from the query parameters object, which
 * contains the query parameters from URL. If the child API key is
 * not present in the URL, an empty string is returned.
 * 
 * @param {object} urlSearchParamsObj - The URL search parameters object.
 * @throws {error} - If an error occures when fetching the child API key.
 * @returns - The child API key from the URL, otherwise an empty string
 */
 function getChildApiKeyFromUrl(urlSearchParamsObj) {
  try {
    var childApiKey = '';

    if (urlSearchParamsObj && urlSearchParamsObj.has('childApiKey')) {
      childApiKey = urlSearchParamsObj.get('childApiKey');
    }

    return childApiKey;
  } catch (err) {
    throw new Error(`Can not get child API key: ${err.message}`);
  }
}

/**
 * Get SP name from URL query parameters object;
 *
 * Gets the SP name from the URL, using the URL search parameters
 * object. If the SP name contains a period, for example aeg.dev, the
 * .dev is filtred out. The SP name is then converted to upper case.
 * If the SP name parameter can not be found, a default SP name is returned.
 *
 * The SP name is used at login. Contains a brand name.
 *
 * @param {object} urlSearchParamsObj - The URL search parameter object.
 * @throws {error} - If an error occures when fetching the SP name.
 * @returns {string} - The SP name in upper case or a default SP name, if no SP name found.
 */
 function getSpNameFromUrl(urlSearchParamsObj) {
  try {
    var spName = DEFAULT_BRAND;

    if (urlSearchParamsObj && urlSearchParamsObj.has('spName')) {
      spName = urlSearchParamsObj.get('spName');
      if (spName.search(/\./)) {
        spName = spName.split(".")[0]; //aeg.dev -> aeg
      }
      spName = spName.toUpperCase();
    }

    return spName;
  } catch (err) {
    throw new Error(`Can not get SP name: ${err.message}`);
  }
}

/**
 * Get brand from URL query parameters object;
 * 
 * Gets the brand from the URL, using the URL search parameters 
 * object. If the brand contains a period, for example aeg.dev, the
 * .dev is filtred out. The brand is then converted to upper case.
 * If the brand parameter can not be found, a default brand is returned.
 * 
 * @param {object} urlSearchParamsObj - The URL search parameter object.
 * @throws {error} - If an error occures when fetching the brand.
 * @returns {string} - The brand in upper case or a default brand, if no brand found.
 */
function getBrandFromUrl(urlSearchParamsObj) {
  try {
    var brand = DEFAULT_BRAND;

    if (urlSearchParamsObj && urlSearchParamsObj.has('brand')) {
      brand = urlSearchParamsObj.get('brand');
      if (brand.search(/\./)) {
        brand = brand.split(".")[0]; //aeg.dev -> aeg
      }
      brand = brand.toUpperCase();
    }

    return brand;
  } catch (err) {
    throw new Error(`Can not get brand: ${err.message}`);
  }
}

/**
 * Get country from URL query parameters object;
 * 
 * Gets the country from the URL, using the URL search parameters 
 * object.
 * If the country parameter can not be found, an empty string is returned.
 * 
 * @param {object} urlSearchParamsObj - The URL search parameter object.
 * @throws {error} - If an error occures when fetching the country.
 * @returns {string} - The country or an empty string if no brand found.
 */
 function getCountryFromUrl(urlSearchParamsObj) {
  try {
    var country = DEFAULT_COUNTRY;

    if (urlSearchParamsObj && urlSearchParamsObj.has('country')) {
      country = urlSearchParamsObj.get('country');
      country = country.replace(/ /g, "");   
      country = country.toUpperCase();      
      country = country.replace(/[^a-zA-Z ]/g, "") ;
    }

    return country;
  } catch (err) {
    throw new Error(`Can not get country: ${err.message}`);
  }
}

/**
 * Gets language from URL search object.
 *
 * Gets the language from the URL search object if the word lang
 * or LANGS is present in the query of the URL. If not, an empty 
 * string is returned.
 * 
 * It only fetch the two first characters, because the language parameter
 * can be longer, for example en-BG.
 *
 * An example of language is fr (speaks French).
 *
 * @param {object} urlSearchParamsObj - The URL search parameter object.
 * @throws {error} - If an error occures when fetching the language.
 * @returns {string} - The language if present, otherwise an empty string.
 */
 function getLanguageFromUrl(urlSearchParamsObj) {
  try {
    var language = '';

    if (urlSearchParamsObj && urlSearchParamsObj.has('lang')) {
      const fetchedLanguage = urlSearchParamsObj.get('lang');
      language = fetchedLanguage.substring(0,2).toLowerCase();
    }

    if (urlSearchParamsObj && urlSearchParamsObj.has('LANG')) {
      const fetchedLanguage = urlSearchParamsObj.get('LANG');
      language = fetchedLanguage.substring(0,2).toLowerCase();
    }

    return language;
  } catch (err) {
    throw new Error(`Can not get language: ${err.message}`);
  }
}

/**
 * Gets language from URL search object for the Brand Site Change Password.
 *
 * Gets the language from the URL search object if the word language
 * or LANGUAGE is present in the query of the URL. If not, an empty 
 * string is returned.
 * 
 * It only fetch the two first characters, because the language parameter
 * can be longer, for example en-BG.
 *
 * An example of language is fr (speaks French).
 *
 * @param {object} urlSearchParamsObj - The URL search parameter object.
 * @throws {error} - If an error occures when fetching the language.
 * @returns {string} - The language if present, otherwise an empty string.
 */
function getLanguageFromChangePswUrl(urlSearchParamsObj) {
  try {
    var language = '';

    if (urlSearchParamsObj && urlSearchParamsObj.has('language')) {
      const fetchedLanguage = urlSearchParamsObj.get('language');
      language = fetchedLanguage.substring(0,2).toLowerCase();
    }

    if (urlSearchParamsObj && urlSearchParamsObj.has('LANGUAGE')) {
      const fetchedLanguage = urlSearchParamsObj.get('LANGUAGE');
      language = fetchedLanguage.substring(0,2).toLowerCase();
    }

    return language;
  } catch (err) {
    throw new Error(`Can not get language: ${err.message}`);
  }
}

/**
 * Gets language for login from URL search object.
 *
 * Gets the language from the URL search object if the word language
 * or LANGUAGE is present in the query of the URL. If not, an empty 
 * string is returned.
 * 
 * It only fetch the two first characters, because the language parameter
 * can be longer, for example en-BG.
 *
 * An example of language is fr (speaks French).
 *
 * @param {object} urlSearchParamsObj - The URL search parameter object.
 * @throws {error} - If an error occures when fetching the language.
 * @returns {string} - The language if present, otherwise an empty string.
 */
 function getLanguageForLoginFromUrl(urlSearchParamsObj) {
  try {
    var language = '';

    if (urlSearchParamsObj && urlSearchParamsObj.has('language')) {
      const fetchedLanguage = urlSearchParamsObj.get('language');
      language = fetchedLanguage.substring(0,2).toLowerCase();
    }

    if (urlSearchParamsObj && urlSearchParamsObj.has('LANGUAGE')) {
      const fetchedLanguage = urlSearchParamsObj.get('LANGUAGE');
      language = fetchedLanguage.substring(0,2).toLowerCase();
    }

    return language;
  } catch (err) {
    throw new Error(`Can not get language for login: ${err.message}`);
  }
}

/**
 * Gets return URL from URL search object.
 * 
 * Gets the return URL from the URL search object if the word returnURL
 * is present in the query of the URL. If not, an empty string is returned.
 * 
 * @param {object} urlSearchParamsObj - The URL search parameter object.
 * @throws {error} - If an error occures when fetching the return URL.
 * @returns {string} - The return URL if present, otherwise an empty string.
 */
 function getReturnUrlFromUrl(urlSearchParamsObj) {
  try {
    var returnUrl = '';

    if (urlSearchParamsObj && urlSearchParamsObj.has('returnURL')) {
      returnUrl = urlSearchParamsObj.get('returnURL');
    }

    return returnUrl;
  } catch (err) {
    throw new Error(`Can not get return URL: ${err.message}`);
  }
}

/**
 * Get render_screen from URL query parameters object;
 * 
 * Gets the render_screen from the URL, using the URL search parameters 
 * object. If the render_screen contains a capital letter or a special character, for example 
 * Register/Login, all of it is filtered out. The render_screen parameter is then converted to 
 * lower case. If the render_screen parameter can not be found, a default render_screen is returned.
 * 
 * @param {object} urlSearchParamsObj - The URL search parameter object.
 * @throws {error} - If an error occures when fetching the render_screen.
 * @returns {string} - The render_screen in lower case or a default render_screen, if no render_screen found.
 */
 function getRenderedScreenFromUrl(urlSearchParamsObj) {
  try {
    var render_screen = DEFAULT_RENDERED_SCREEN;

    if (urlSearchParamsObj && urlSearchParamsObj.has('render_screen')) {
      
      render_screen = urlSearchParamsObj.get('render_screen');

      render_screen = render_screen.replace(/ /g, "");   //Regis@@t  er2#  -> Regis@@ter2#
      
      render_screen = render_screen.toLowerCase();      // Regis@@ter2# -> regis@@ter2#
      
      render_screen = render_screen.replace(/[^a-z ]/g, "");   //regis@@ter2# -> register
      
    
    }else{

      render_screen = DEFAULT_RENDERED_SCREEN;

    }

    return render_screen;

  } catch (err) {
    throw new Error(`Can not get render_screen: ${err.message}`);
  }
}


/**
 * Get sourceCode from URL query parameters object;
 * 
 * Gets the sourceCode from the URL, using the URL search parameters 
 * object.
 * If the sourceCode parameter can not be found, an empty string is returned.
 * 
 * @param {object} urlSearchParamsObj - The URL search parameter object.
 * @throws {error} - If an error occures when fetching the sourceCode.
 * @returns {string} - The sourceCode or an empty string if no brand found.
 */
 function getSourceCodeFromUrl(urlSearchParamsObj) {
  try {
    var sourceCode = DEFAULT_SOURCE_CODE;

    if (urlSearchParamsObj && urlSearchParamsObj.has('sourceCode')) {
      sourceCode = urlSearchParamsObj.get('sourceCode');
      sourceCode = sourceCode.replace(/ /g, "");        
      sourceCode = sourceCode.replace(/[^0-9]/g, "") ;
    }

    return sourceCode;
  } catch (err) {
    throw new Error(`Can not get source code: ${err.message}`);
  }
}


/**
 * Get market from URL query parameters object;
 * 
 * Gets the market from the URL, using the URL search parameters 
 * object. If the market contains a small letter or a special character, for example 
 * uk or ind, all of it is filtered out. The market parameter is then converted to 
 * upper case. If the market parameter can not be found, a default market is returned.
 * 
 * @param {object} urlSearchParamsObj - The URL search parameter object.
 * @throws {error} - If an error occures when fetching the market.
 * @returns {string} - The market in upper case or a default market, if no market found.
 */
 function getMarketFromUrl(urlSearchParamsObj) {
  try {
    var market = DEFAULT_MARKET;

    if (urlSearchParamsObj && urlSearchParamsObj.has('market')) {
      
      market = urlSearchParamsObj.get('market');
     
      market = market.replace(/ /g, "");   
      
      market = market.toUpperCase();      
      
      market = market.replace(/[^A-Z ]/g, "") ;  
      
    }

    return market;

  } catch (err) {
    throw new Error(`Can not get market: ${err.message}`);
  }
}
/**
 * Get Optanon Consent(GA-OneTrust) from URL query parameters object;
 * 
 * @param {object} urlSearchParamsObj - The URL search parameter object.
 * @throws {error} - If an error occures when fetching the market.
 * @returns {string} - The market in upper case or a default market, if no market found.
 */
 function getoptanonConsentFromUrl(urlSearchParamsObj) {
  try {
    var consent = DEFAULT_OPTANONCONSENT;

    if (urlSearchParamsObj && urlSearchParamsObj.has('optanonConsent')) {
      
      consent = urlSearchParamsObj.get('optanonConsent');    
    }

    return consent;

  } catch (err) {
    throw new Error(`Can not get OptanonConsent: ${err.message}`);
  }
}
/**
 * Get UAID(Google Analytics) from URL query parameters object;
 * 
 * @param {object} urlSearchParamsObj - The URL search parameter object.
 * @throws {error} - If an error occures when fetching the market.
 * @returns {string} - The market in upper case or a default market, if no market found.
 */
 function getUAIDFromUrl(urlSearchParamsObj) {
  try {
    var UA_ID = DEFAULT_UAID;

    if (urlSearchParamsObj && urlSearchParamsObj.has('UAID')) {
      
      UA_ID = urlSearchParamsObj.get('UAID');    
    }

    return UA_ID;

  } catch (err) {
    throw new Error(`Can not get UAID: ${err.message}`);
  }
}
/**
 * Get _gl(Google Analytics) from URL query parameters object;
 * 
 * @param {object} urlSearchParamsObj - The URL search parameter object.
 * @throws {error} - If an error occures when fetching the market.
 * @returns {string} - The market in upper case or a default market, if no market found.
 */
 function get_glFromUrl(urlSearchParamsObj) {
  try {
    var UA_ID = DEFAULT_UAID;

    if (urlSearchParamsObj && urlSearchParamsObj.has('_gl')) {
      
      UA_ID = urlSearchParamsObj.get('_gl');    
    }

    return UA_ID;

  } catch (err) {
    throw new Error(`Can not get _gl: ${err.message}`);
  }
}
/**
 * Get passReturnURL from URL query parameters object;
 * 
 * Gets the passReturnURL from the URL, using the URL search parameters 
 * object. If the passReturnURL parameter can not be found, a default passReturnURL is returned.
 * 
 * @param {object} urlSearchParamsObj - The URL search parameter object.
 * @throws {error} - If an error occures when fetching the passReturnURL.
 * @returns {string} - The passReturnURL in lower case or a default passReturnURL, if no passReturnURL found.
 */
 function getpassReturnURLFromUrl(urlSearchParamsObj) {
  try {
    var passReturnURL = DEFAULT_PASS_RETURN_URL;

    if (urlSearchParamsObj && urlSearchParamsObj.has('passReturnURL')) {
      
      passReturnURL = urlSearchParamsObj.get('passReturnURL');
    
    }else{

      passReturnURL = DEFAULT_PASS_RETURN_URL;

    }

    return passReturnURL;

  } catch (err) {
    throw new Error(`Can not get passReturnURL: ${err.message}`);
  }
}



/**
 * Loads the CDC API dynamically
 * 
 * Loads the CDC API dynamically by adding a script tag to the header.
 * It is necessary to load dynamically, because it is possible to choose
 * language of the services from the API. The language can be set as a
 * query in the URL to the page. For example /?lang=sv to get the service language
 * in Swedish.
 * 
 * If an error occurs, the default CDC API path is sent to the server. The default
 * language will then be English.
 * 
 * @param {object} cdcApiData - The CDC API data object
 * @throws {error} - If the CDC API can not be loaded dynamically.
 */
function loadCdcApiDynamically(cdcApiData, isStorageDomainOverride) {
  try {
    const cdcApiPath = createCdcApiPath(cdcApiData);
    createCdcApiScriptTag(cdcApiPath, isStorageDomainOverride);
  } catch (err) {
    throw new Error(err.message);
  }
}

/**
 * Creates the CDC API path
 * 
 * Creates the CDC API path. If the URL has the query parameters "lang" and childApiKey
 * the content is added to the CDC API path. If language is not present, a default language
 * is used.
 * 
 * @param {object} cdcApiData - The CDC API data object
 * @throws {error} - If creating of CDC API path fails
 * @returns - The CDC path
 */
function createCdcApiPath(cdcApiData) {
  try {
    const language = cdcApiData.language ? cdcApiData.language : DEFAULT_LANGUAGE;
    if (cdcApiData.childApiKey) {
      return `${CDC_PATH}?apiKey=${cdcApiData.apiKey}&childApiKey=${cdcApiData.childApiKey}&lang=${language}`;
    } else {
      return `${CDC_PATH}?apiKey=${cdcApiData.apiKey}&lang=${language}`
    }
  } catch (err) {
    throw new Error(`Can not create CDC API path: ${err.message}`);
  }
}

/**
 * Creates a CDC API script tag and adds the tag into the head section..
 * 
 * Creates the CDC API script tag and adds the tag into the head section.
 * When the script tag is added, the CDC API is fetch from the CDC server.
 * Throws an error if the CDC script tag can not be created.
 *
 * @param {string} cdcApiPath - The path to the CDC API.
 * @throws {error} - If an error occurs when creating the CDC script tag.
 */
function createCdcApiScriptTag(cdcApiPath, isStorageDomainOverride) {
  try {
    var cdcApiScript = document.createElement("script");
    cdcApiScript.type = "application/javascript";
    cdcApiScript.async = true;
    cdcApiScript.src = cdcApiPath;
    if (isStorageDomainOverride) {
      cdcApiScript.innerHTML = JSON.stringify({
        storageDomainOverride: "cdc.myaccount.electroluxgroup.eu",
        regSource: cdcApiData.passReturnURL
      });
    }

    document.head.appendChild(cdcApiScript);
  } catch (err) {
    throw new Error(`Can not create CDC API script tag: ${err.message}`);
  }
}

/**
 * Get error code from URL.
 * 
 * Gets the error code from the URL search object if the word errorCode
 * is present in the query of the URL. If not, an empty string is returned.
 * 
 * @param {object} urlSearchParamsObj - The URL search parameter object.
 * @throws {error} - If an error occures when fetching the error code.
 * @returns {string} - The error code if present, otherwise an empty string.
 */
function getErrorCodeFromUrl(urlSearchParamsObj) {
  try {
    var errorCode = '';

    if (urlSearchParamsObj && urlSearchParamsObj.has('errorCode')) {
      errorCode = urlSearchParamsObj.get('errorCode');
    }

    return errorCode;
  } catch (err) {
    throw new Error(`Can not get error code: ${err.message}`);
  }
}

/**
 * Get error message from URL.
 * 
 * Gets the error message from the URL search object if the word errorMessage
 * is present in the query of the URL. If not, an empty string is returned.
 * 
 * @param {object} urlSearchParamsObj - The URL search parameter object.
 * @throws {error} - If an error occures when fetching the error code.
 * @returns {string} - The error message if present, otherwise an empty string.
 */
 function getErrorMessageFromUrl(urlSearchParamsObj) {
  try {
    var errorMessage = '';

    if (urlSearchParamsObj && urlSearchParamsObj.has('errorMessage')) {
      errorMessage = urlSearchParamsObj.get('errorMessage');
    }

    return errorMessage;
  } catch (err) {
    throw new Error(`Can not get error code: ${err.message}`);
  }
}

/**
 * Creates the return link from the query parameters in the URL.
 * 
 * Replaces the parameter LANGLONG, if present, with a combination of country and
 * language. For example country=be and lang=fr will replace the LANGLONG parameter
 * in the URL with fr-be.
 * 
 * Replaces the parameter LANGSHORT, if present, with the language.
 * 
 * If not parameters LANGSHORT or LANGLONG is present in the return URL, the return
 * URL is returned.
 * 
 * @param {string} returnUrl - The return URL in the query
 * @param {string} country - The country in the query
 * @param {string} language - The language in the query
 * @returns {string} - The modified link with language, if present. Otherwise the unmodified link.
 */
 function createReturnLink(returnUrl, country, language) {
  if (returnUrl.includes(LANG_SHORT_IN_URL_LOWER_CASE) || returnUrl.includes(LANG_SHORT_IN_URL_UPPER_CASE)) {
    return createLangShortLink(returnUrl, language);
  }

  if (returnUrl.includes(LANG_LONG_IN_URL_LOWER_CASE) || returnUrl.includes(LANG_LONG_IN_URL_UPPER_CASE)) {
    return createLangLongLink(returnUrl, country, language);
  }

  return returnUrl;
}

/**
 * Creates a link based on the language in return URL.
 * 
 * Replaces the short language parameter in the return URL with
 * the language in the query. If not present, the unmodified
 * return URL is returned.
 * Handles the language parameter both in lower and upper case.
 * 
 * @param {string} returnUrl - The return URL in the query
 * @param {string} langue - The short language in the query
 * @returns {string} - The link where longlang is replaced with the short language.
 */
function createLangShortLink(returnUrl, language) {
  if (returnUrl.includes(LANG_SHORT_IN_URL_LOWER_CASE)) {
    return returnUrl.replace(LANG_SHORT_IN_URL_LOWER_CASE, language);
  }

  if (returnUrl.includes(LANG_SHORT_IN_URL_UPPER_CASE)) {
    return returnUrl.replace(LANG_SHORT_IN_URL_UPPER_CASE, language);
  }

  return returnUrl;
}

/**
 * Creates a link based on the language and country in return URL.
 *
 * Replaces the long language parameter in the return URL with
 * the language and brand in the query. The language and the brand
 * is separated with a dash. If the parameter is not present, the
 * unmodified URL is returned.
 * Handles the language parameter both in lower and upper case.
 * 
 * @param {string} returnUrl - The return URL in the query
 * @param {string} longLang - The long language in the query
 * @returns {string} - The link where longlang is replaced with the long language.
 */
function createLangLongLink(returnUrl, country, language) {
  const langLong = `${language}-${country}`
  if (returnUrl.includes(LANG_LONG_IN_URL_LOWER_CASE)) {
    return returnUrl.replace(LANG_LONG_IN_URL_LOWER_CASE, langLong);
  }

  if (returnUrl.includes(LANG_LONG_IN_URL_UPPER_CASE)) {
    return returnUrl.replace(LANG_LONG_IN_URL_UPPER_CASE, langLong);
  }

  return returnUrl;
}

/**
 * Add error content to the screen.
 * 
 * @param {string} header - The header error text.
 * @param {string} message - The error message text.
 */
 function addErrorContentToTemplate(header, message) {
  addErrorHeader(header);
  addErrorMessage(message);
}

/**
 * Shows the error content
 * 
 * Shows the error conent by cleraring the dispaly none style.
 */
 function showErrorContent() {
  const errorContentElement = document.getElementById('error-wrapper');
  errorContentElement.style.display = '';
}

/**
 * Adds the text to the error header.
 * 
 * Adds a text to the error header tag.
 * 
 * @param {string} text - The text to be added to the error header.
 * @throws {error} - If an error occures when adding the text.
 */
 function addErrorHeader(text) {
  try {
    const headerElement = document.getElementById('error-header');
    headerElement.textContent = text;
  } catch (err) {
    throw new Error(`Header text could not be set. Error: ${err.message}`);
  }
}

/**
 * Adds the text to the error message.
 * 
 * Adds a text to the message error text tag.
 * 
 * @param {string} text - The text to be added to the error message.
 * @throws {error} - If an error occures when adding the text.
 */
 function addErrorMessage(text) {
  try {
    const messageTextElement = document.getElementById('error-message-text');
    messageTextElement.textContent = text;
  } catch (err) {
    throw new Error(`Message text could not be set. Error: ${err.message}`);
  }
}

/**
 * Centers the error content.
 *
 * Centers the error content horizontally by adding a class with flex to
 * the page wrapper.
 * Used for pages which contains CDC screen set.
 *
 * @throws {error} - If an error occures when centering the error content.
 */
function centerErrorContent() {
  try {
    const  pageWrapperElement = document.getElementById('page-wrapper');
    if (!pageWrapperElement.classList.contains('center-error-content')) {
      pageWrapperElement.classList.add('center-error-content');
    }
  } catch (err) {
    throw new Error('Failed to center error content!');
  }
}

/**
 * Removes Centering of the error content.
 *
 * Removes the centering of the error content horizontally by removing the
 * center error content class.
 * Used for pages which contains CDC screen set.
 *
 * @throws {error} - If an error occures when removing the centering of the error content.
 */
function removeCenterErrorContent() {
  try {
    const  pageWrapperElement = document.getElementById('page-wrapper');
    if (pageWrapperElement.classList.contains('center-error-content')) {
      pageWrapperElement.classList.remove('center-error-content');
    }
  } catch (err) {
    throw new Error('Failed to remove the centering of the error content!');
  }
}