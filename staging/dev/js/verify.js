// 2021-04-19 07:30
const LOGO_PATH = 'logos/brands/';
const ERROR_CODE_EXPIRED = '403002';

var error = {
  isError: false,
  isExpired: false,
  errorCode: '',
  errorMessage: ''
}

/**
 * Creates a landing page for the result of the login.
 * 
 * The parameter return URL is mandatory if the event
 * is successful or if expired.
 * 
 * If mandatory parameters are missing, a error message
 * is shown instead of the event message.
 * 
 * This is the start function.
 */
function createVerificationText() {
  try {
    showVerifyContent();
    const urlSearchParamsObj = getUrlParametersObj();
    const brand = getBrandFromUrl(urlSearchParamsObj);
    const language = getLanguageFromUrl(urlSearchParamsObj);
    error = getError(error, urlSearchParamsObj);

    addBrandTextStyleAndLogo(brand);
    addTextContentToTemplate(language, error);

    const country = getCountryFromUrl(urlSearchParamsObj);
    const returnUrl = getReturnUrlFromUrl(urlSearchParamsObj, error);
    if (shouldBtnBeAdded(returnUrl, country, error)) {
      const linkLanguage = getLanguageWithFallback(country, language);
      addButton(error, linkLanguage, country, returnUrl);
    }
  } catch (err) {
    hideVerifyContent();
    showErrorContent();
    const header = 'Error when creating verification page';
    addErrorContentToTemplate(header, err.message);
    console.log(`Error when creating verification page. Error: ${err.message}`);
  }
}

/**
 * Get the get error code from the URL and sets the error status object.
 *
 * Gets error code from the URL and updates the error code object, if an
 * error can be fetch from the URL and the error code is not zero.
 *
 * @param {object} urlSearchParamsObj - The URL search parameter object.
 * @throws {error} - If an error occurs when fetching the error code.
 * @returns {string} - The error object
 */
 function getError(error, urlSearchParamsObj) {
  try {
    const errorCode = getErrorCodeFromUrl(urlSearchParamsObj);
    if (errorCode && errorCode !=='0') {
      error = setErrorCodes(errorCode, urlSearchParamsObj);
    }
    return error;
  } catch (err) {
    throw new Error(err.message);
  }
}

/**
 * Set the error codes.
 * 
 * Sets the error codes based on the error.
 * 
 * @param {object} errorCode - The error status and message
 * @param {object} urlSearchParamsObj - The URL search parameter object.
 * @returns {object} - The error object with error status and error message.
 */
function setErrorCodes(errorCode, urlSearchParamsObj) {
  if (errorCode === ERROR_CODE_EXPIRED) {
    error.isError = true;
    error.isExpired = true;
    error.errorCode = errorCode;
  } else {
    error.isError = true;
    error.errorCode = errorCode;
  }
  error.errorMessage = getErrorMessageFromUrl(urlSearchParamsObj);

  return error;
}

/**
 * Set the text and logo for a brand.
 * 
 * Sets the text style and the logo for a brand. Is used in the
 * different messages to a user.
 * 
 * @param {string} - The brand
 * @throws {error} - If the text style and or the logo can not be set.
 */
function addBrandTextStyleAndLogo(brand) {
  try {
    addBrandSpecificStyle(brand);
    addBrandLogo(brand);
  } catch (err) {
    throw new Error(err.message);
  }
}

/**
 * Adds a style for the landing page, based on the brand
 * 
 * Adds style dependency, based on the brand, by adding a specific brand class.
 * 
 * @param {string} brand - The brand for a specific style.
 */
function addBrandSpecificStyle(brand) {
  try {
    const innerWrapperElement = document.getElementById('inner-wrapper');
    innerWrapperElement.classList.add(brand.toLowerCase());
  } catch (err) {
    console.log('Brand style could not be added. Error: ', err.message);
  }
}

/**
 * Adds a logo, based on a brand.
 * 
 * Adds a logo to the landing page, based on a brand, by adding a path to
 * the image source. The path is constant and the file name is fetched
 * from the brands table. The alt name is also added.
 *
 * @param {string} brand - The brand for a specific style.
 */
function addBrandLogo(brand) {
  try {
    brand = brand.toLowerCase();
    const logoName = getBrandLogoName(brand);
    document.getElementById('logo').src = LOGO_PATH + logoName;
    altName = getBrandAltName(brand);
    document.getElementById('logo').alt = `${altName} logo`;
  } catch (err) {
    console.log('Brand logo could not be added: Error: ', err.message);
  }
}

/**
 * Adds the text content to the landing page.
 * 
 * Adds heading, text message, button to the landing page. If an error should show, the
 * button is replaced with a text and an error status is added. If the language is
 * missing, a default language is used.
 * 
 * @param {string} language - The language for the text.
 * @param {object} error - Contains the error flag, the expired flag and an error code.
 */
function addTextContentToTemplate(language, error) {
  try {
    const lang = language ? language : DEFAULT_LANGUAGE;
    const headerText = getHeaderForLanguage(lang, error);
    addHeader(headerText);

    const message = getMessageForLanguage(lang, error);
    addMessage(message);

    if (error.isError && !error.isExpired) {
      showSecondMessage();
      showErrorStatus();
      const secondMessage = getSecondMessageForLanguage(lang);
      addSecondMessageText(secondMessage);
      addErrorStatusText(error);
    } else {
      hideSecondMessage();
      hideErrorStatus();
    }
  } catch (err) {
    console.log('Content could not be added to template. Error: ', err.message);
  }
}

/**
 * Gets the header text for a specific language.
 * 
 * Gets the header text for a specfic language. The text is based on the event
 * successful, expired or error. If the language is not found from the query, the 
 * text is in a default language. If the text can not be found, an empty string is
 * returned.
 * 
 * @param {string} language - The language for the text.
 * @param {boolean} isExpired - If an expired text should be shown.
 * @param {object} error - Contains the error flag, the expired flag and an error code.
 * @returns {string} - The header text, based on a specific language and an event, otherwise an empty string.
 */
function getHeaderForLanguage(language, error) {
  var header ='';
  try {
    if (error.isExpired) {
      header = getExpiredHeaderForLanguage(language);
    } else if (error.isError && !error.isExpired) {
      header = getErrorHeaderForLanguage(language);
    } else {
      header = getSuccessHeaderForLanguage(language);
    }
  } catch (err) {
    header = getHeaderForDefaultLanguage(DEFAULT_LANGUAGE, error);
  } finally {
    return header;
  }
}

/**
 * Gets the header text for a default language.
 * 
 * Gets the header text for a default language. The text is based on the event
 * (successful, expired or error). If the text can not be found, an empty string
 * is returned.
 * 
 * @param {string} language - The language for the text.
 * @param {boolean} isExpired - If an expired text should be shown.
 * @param {object} error - Contains the error flag, the expired flag and an error code.
 * @returns {string} - The header text, based on a specific language and an event, otherwise an empty string.
 */
function getHeaderForDefaultLanguage(language, error) {
  var header = '';
  try {
    if (error.isExpired) {
      header = getExpiredHeaderForLanguage(language)
    } else if (error.isError && !error.isExpired) {
      header = getErrorHeaderForLanguage(language)
    } else {
      header = getSuccessHeaderForLanguage(language);
    }
  } catch (err) {
    console.log(`Error, no heading for language ${language} found! Error: ${err.message}`);
    header = `Error: ${err.message}`;
  } finally {
    return header;
  }
}

/**
 * Adds the text to the header.
 * 
 * Adds a text to the header tag.
 * 
 * @param {string} text - The text to be added to the header.
 * @throws {error} - If an error occures when adding the text.
 */
function addHeader(text) {
  try {
    const headerElement = document.getElementById('header');
    headerElement.textContent = text;
  } catch (err) {
    throw new Error(`Header text could not be set. Error: ${err.message}`);
  }
}

/**
 * Gets the message text for a specific language.
 * 
 * Gets the message text for a specfic language. The text is based on the event
 * successful, expired or error. If the language is not found from the
 * query, the text is in a default language. If the text can not be found, an
 * empty string is returned.
 * 
 * @param {string} language - The language for the text.
 * @param {boolean} isExpired - If an expired text should be shown.
 * @param {object} error - Contains the error flag, the expired flag and an error code.
 * @returns {string} - The message text, based on a specific language and an event, otherwise an empty string.
 */
function getMessageForLanguage(language, error) {
  var message ='';
  try {
    if (error.isExpired) {
      message = getExpiredMessageForLanguage(language);
    } else if (error.isError && !error.isExpired) {
      message = getErrorMessageForLanguage(language);
    } else {
      message = getSuccessMessageForLanguage(language);
    }
  } catch (err) {
    message = getMessageForDefaultLanguage(DEFAULT_LANGUAGE, error);
  } finally {
    return message;
  }
}

/**
 * Gets the message text for a default language.
 * 
 * Gets the message text for a default language. The text is based on the event
 * successful, expired or error. If the text can not be found, an empty string
 * is returned.
 * 
 * @param {string} language - The language for the text.
 * @param {boolean} isExpired - If an expired text should be shown.
 * @param {object} error - Contains the error flag, the expired flag and an error code.
 * @returns {string} - The message text, based on a specific language and an event, otherwise an empty string.
 */
function getMessageForDefaultLanguage(language, error) {
  var message = '';
  try {
    if (error.isExpired) {
      message = getExpiredMessageForLanguage(language);
    } else if (error.isError && !error.isExpired) {
      message = getErrorMessageForLanguage(language);
    } else {
      message = getSuccessMessageForLanguage(language);
    }
  } catch (err) {
    console.log(`Error, no message for default language ${language} found! Error: ${err.message}`);
    message = `Error: ${err.message}`;
  } finally {
    return message;
  }
}

/**
 * Adds the text to the message.
 * 
 * Adds a text to the message text tag.
 * 
 * @param {string} text - The text to be added to the message.
 * @throws {error} - If an error occures when adding the text.
 */
function addMessage(text) {
  try {
    const messageTextElement = document.getElementById('message-text');
    messageTextElement.textContent = text;
  } catch (err) {
    throw new Error(`Message text could not be set. Error: ${err.message}`);
  }
}

/**
 * Hides the button.
 * 
 * Hides the button by setting the style to display none.
 */
function hideButton() {
  const buttonElement = document.getElementById('button-link');
  buttonElement.style.display = 'none';
}

/**
 * Shows the second message.
 * 
 * Shows the second message by cleraring the dispaly none style.
 */
function showSecondMessage() {
  const secondMessageElement = document.getElementById('second-message');
  secondMessageElement.style.display = '';
}

/**
 * Shows the error status.
 * 
 * Shows the error status message by cleraring the dispaly none style.
 */
function showErrorStatus() {
  const errorStatusElement = document.getElementById('error-status');
  errorStatusElement.style.display = '';
}

/**
 * Gets the second message text for a specific language.
 * 
 * Gets the second message text for a specfic language. The text is based on the event
 * error. If the language is not found from the query, the text is in a default language. 
 * If the text can not be found, anempty string is returned.
 * 
 * @param {string} language - The language for the text.
 * @returns {string} - The second message text, based on a specific language and the error event, otherwise an empty string.
 */
function getSecondMessageForLanguage(language) {
  var secondMessage ='';
  try {
    secondMessage = getErrorSecondMessageForLanguage(language);
  } catch (err) {
    secondMessage = getSecondMessageForDefaultLanguage(DEFAULT_LANGUAGE);
  } finally {
    return secondMessage;
  }
}

/**
 * Gets the second message text for a default language.
 * 
 * Gets the second message text for a default language. The text is based on the event
 * error. If the text can not be found, an empty string is returned.
 * 
 * @param {string} language - The language for the text.
 * @returns {string} - The second message text, based on a specific language and the error event, otherwise an empty string.
 */
function getSecondMessageForDefaultLanguage(language) {
  var secondMessage = '';
  try {
    secondMessage = getErrorSecondMessageForLanguage(language);
  } catch (err) {
    console.log(`Error, no second message for default language ${language} found! Error: ${err.message}`);
    secondMessage = `Error: ${err.message}`;
  } finally {
    return secondMessage;
  }
}

/**
 * Adds the text to the second message.
 * 
 * Adds a text to the second message text tag.
 * 
 * @param {string} text - The text to be added to the second message.
 * @throws {error} - If an error occures when adding the text.
 */
function addSecondMessageText(text) {
  try {
    const secondMessageElement = document.getElementById('second-message');
    secondMessageElement.textContent = text;
  } catch (err) {
    throw new Error(`Second message text could not be set. Error: ${err.message}`);
  }
}

/**
 * Adds the text to the error status.
 * 
 * Adds a text to the error status text tag.
 * 
 * @param {object} error - Contains the error flag, the expired flag and an error code.
 * @throws {error} - If an error occures when adding the text.
 */
function addErrorStatusText(error) {
  try {
    const errorStatusElement = document.getElementById('error-status');
    errorStatusElement.textContent = `ERROR ${error.errorCode}`;
  } catch (err) {
    throw new Error(`Error status text could not be set. Error: ${err.message}`);
  }
}

/**
 * Hides secon message text.
 * 
 * Hides the second message text by setting the style to display none.
 */
function hideSecondMessage() {
  const secondMessageElement = document.getElementById('second-message');
  secondMessageElement.style.display = 'none';
}

/**
 * Hides the error status text.
 * 
 * Hides the error status setting the style to display none.
 */
function hideErrorStatus() {
  const errorStatusElement = document.getElementById('error-status');
  errorStatusElement.style.display = 'none';
}

/**
 * Shows the button.
 * 
 * Shows the button by cleraring the dispaly none style.
 */
function showButton() {
  const buttonElement = document.getElementById('button-link');
  buttonElement.style.display = '';
}

/**
 * Checks if the continue button should be added or not.
 * 
 * The button should be added only when the return URL and country are present, at a
 * successful event or if the error event is expired.
 * The return URL is missing if the service is used on a mobile phone.
 * 
 * @param {string} returnUrl - The return url.
 * * @param {string} country - The country.
 * @param {object} error - The error object.
 * @throws {error} - If an error occurs when determing if the button should be added or not.
 * @returns {boolan} - If the button should be added, otherwise false.
 */
function shouldBtnBeAdded(returnUrl, country, error) {
  shouldBtnBeAdded = true;
  try {
    if (returnUrl && country) {
      if (error.isError && !error.isExpired) {
        shouldBtnBeAdded = false;
      }
    } else {
      shouldBtnBeAdded = false;
    }

    return shouldBtnBeAdded;
  } catch (err) {
    throw new Error('Error when determing if button should be added or not. Error: ', err.message);
  }
}

/**
 * Adds a button on the verify landing page.
 * 
 * Adds a button with a return link.
 * 
 * @param {object} error - Contains the error flag, the expired flag and an error code.
 * @param {string} language - The language for the text
 * @param {string} country - The country, used for the return link
 * @param {string} returnUrl - The return URL sent in the query.
 */
function addButton(error, language, country, returnUrl) {
  try {
    const buttonText = getButtonTextForLanguage(language, error);
    addButtonText(buttonText);
    addReturnUrlToButton(returnUrl, country, language);
    showButton();
  } catch (err) {
    throw new Error(err.message);
  }
}

/**
 * Gets the button text for a specific language.
 * 
 * Gets the button text for a specfic language. The text is based on the event
 * successful or expired. If the language is not found from the query, the text
 * is in a default language. If the text can not be found, an empty string is 
 * returned.
 * 
 * @param {string} language - The language for the text.
 * @param {object} error - Contains the error flag, the expired flag and an error code.
 * @returns {string} - The message text, based on a specific language and an event, otherwise an empty string.
 */
 function getButtonTextForLanguage(language, error) {
  var buttonText ='';
  try {
    if (error.isExpired) {
      buttonText = getExpiredButtonTextForLanguage(language);
    } else {
      buttonText = getSuccessButtonTextForLanguage(language);
    }
  } catch (err) {
    buttonText = getButtonTextForDefaultLanguage(DEFAULT_LANGUAGE, error);
  } finally {
    return buttonText;
  }
}

/**
 * Gets the button text for a default language.
 * 
 * Gets the button text for a default language. The text is based on the event
 * successful or expired. If the text can not be found, an empty string is 
 * returned.
 * 
 * @param {string} language - The language for the text.
 * @param {object} error - Contains the error flag, the expired flag and an error code.
 * @returns {string} - The button text, based on a specific language and an event, otherwise an empty string.
 */
function getButtonTextForDefaultLanguage(language, error) {
  var buttonText = '';
  try {
    if (error.isExpired) {
      buttonText = getExpiredButtonTextForLanguage(language);
    } else {
      buttonText = getSuccessButtonTextForLanguage(language);
    }
  } catch (err) {
    console.log(`Error, no button text for default language ${language} found! Error: ${err.message}`);
    buttonText = `Error: ${err.message}`;
  } finally {
    return buttonText;
  }
}

/**
 * Adds the button text.
 * 
 * Adds a button text to the button tag.
 * 
 * @param {string} text - The text to be added to the button.
 * @throws {error} - If an error occures when adding the text.
 */
 function addButtonText(text) {
  try {
    const buttonElement = document.getElementById('button-text');
    buttonElement.textContent = text;
  } catch (err) {
    throw new Error(`Button text could not be set. Error: ${err.message}`)
  }
}

/**
 * Adds a return URL to the continue button.
 * 
 * Replaces the parameter LANGLONG, if present, with a combination of country and
 * language. For example country=be and lang=fr will replace the LANGLONG parameter
 * in the URL with fr-be.
 * 
 * Replaces the parameter LANGSHORT, if present, with the language.
 * 
 * @param {string} returnUrl - The return URL in the query
 * @param {string} country - The country in the query
 * @param {string} language - The language in the query
 */
function addReturnUrlToButton(returnUrl, country, language) {
  returnUrl = createReturnLink(returnUrl, country, language);
  console.log('Return URL: ', returnUrl);
  addLoginLink(returnUrl);
}

/**
 * Adds the login link.
 * 
 * Adds a path to the login link. The link is a a button.
 * 
 * @param {string} text - The path to be added to the login link (as a button).
 * @throws {error} - If an error occures when adding the text.
 */
function addLoginLink(returnUrl) {
  try {
    const buttonLinkElement = document.getElementById('button-link');
    buttonLinkElement.href = returnUrl;
  } catch (err) {
    throw new Error(`Login link could not be set. Error: ${err.message}`);
  }
}

/**
 * Hides the verify content
 * 
 * Hides the verify content by setting the style to none.
 */
 function showVerifyContent() {
  const verifyContentElement = document.getElementById('inner-wrapper');
  verifyContentElement.style.display = '';
}

/**
 * Hides the verify content
 * 
 * Hides the verify content by setting the style to none.
 */
 function hideVerifyContent() {
  const verifyContentElement = document.getElementById('inner-wrapper');
  verifyContentElement.style.display = 'none';
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