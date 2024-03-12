// 2022-01-11 02:23 PM IST
// const CDC_PATH = 'https://cdc.myaccount.electroluxgroup.eu/js/gigya.js';
const DC_FROM_URL = '.'+getDataCenterFromUrl(getUrlParametersObj());
const CDC_PATH = `https://cdns${DC_FROM_URL}.gigya.com/js/gigya.js`; 

const DEFAULT_BRAND = 'ELX';
const DEFAULT_LANGUAGE = 'en';
const LANG_SHORT_IN_URL_LOWER_CASE = 'langshort';
const LANG_SHORT_IN_URL_UPPER_CASE = 'LANGSHORT'
const LANG_LONG_IN_URL_LOWER_CASE = 'langlong';
const LANG_LONG_IN_URL_UPPER_CASE = 'LANGLONG';
const LETTERS_ONLY_REGEX = /^[a-zA-Z]*$/;

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
     
      brand = brand == 'Default' ? brand : brand.toUpperCase();
    }

    return brand;
  } catch (err) {
    throw new Error(`Can not get brand: ${err.message}`);
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

    if (urlSearchParamsObj && ( urlSearchParamsObj.has('lang') || urlSearchParamsObj.has('LANG'))) {
      const fetchedLanguage = urlSearchParamsObj.get('lang');
      language = fetchedLanguage.substring(0,5).toLowerCase();
    }
    return language;
  } catch (err) {
    throw new Error(`Can not get language: ${err.message}`);
  }
}

/**
 * Get Data Center from URL query parameters object.
 * 
 * Gets the Data Center from the query parameters object, which
 * contains the query parameters from URL. If the Data Center is
 * not present in the URL, an empty string is returned.
 * 
 * @param {object} urlSearchParamsObj - The URL search parameters object.
 * @throws {error} - If an error occures when fetching the Data Center.
 * @returns - The Data Center key from the URL, otherwise an empty string
 */
 function getDataCenterFromUrl(urlSearchParamsObj) {
  try {
    var dc = '';

    if (urlSearchParamsObj && urlSearchParamsObj.has('dc')) {
      dc = urlSearchParamsObj.get('dc');
    }

    return dc;
  } catch (err) {
    throw new Error(`Can not get API key: ${err.message}`);
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
function loadCdcApiDynamically(cdcApiData, isStorageDomainOverride = false) {
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
        //storageDomainOverride: "cdc.myaccount.electroluxgroup.eu"
        storageDomainOverride: `cdns${DC_FROM_URL}.gigya.com`
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
