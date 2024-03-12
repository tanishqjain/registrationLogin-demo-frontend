
/**
 * Get the succuess header text for a language.
 * 
 * Gets the successful header text for a specific language from the verification text
 * object.
 * 
 * @param {string} language - The wanted language
 * @throws {error} - If an error occures when fetching the text for the header.
 * @returns {string} - The successful text for the header in a specific language, if found.
 */
 function getSuccessHeaderForLanguage(language) {
    const lang = language.toLowerCase();
    try {
      return verificationTexts[lang].success.header;
    } catch (err) {
      console.log(`Language ${lang} for successful header not found or wrong struction i verification text object!`);
      throw new Error(`Language ${lang} for successful header not found: ${err.message}`);
    }
  }
  
  /**
   * Get the succuess message text for a language.
   * 
   * Gets the successful message text in a specifict language from the verification text
   * object.
   * 
   * @param {string} language - The wanted language
   * @throws {error} - If an error occures when fetching the text for the message.
   * @returns {string} - The succesful text for the message in a specific language, if found.
   */
  function getSuccessMessageForLanguage(language) {
    const lang = language.toLowerCase();
    try {
      return verificationTexts[lang].success.message;
    } catch (err) {
      console.log(`Language ${lang} for successful message not found or wrong struction i verification text object!`);
      throw new Error(`Language ${lang} for successful message not found: ${err.message}`);
    }
  }
  
  /**
   * Get the succuess button text for a language.
   * 
   * Gets the successful button text in a specifict language from the verification text
   * object.
   * 
   * @param {string} language - The wanted language
   * @throws {error} - If an error occures when fetching the button text for the message.
   * @returns {string} - The successful button text in a specific language, if found.
   */
  function getSuccessButtonTextForLanguage(language) {
    const lang = language.toLowerCase();
    try {
      return verificationTexts[lang].success.buttonText;
    } catch (err) {
      console.log(`Language ${lang} for successful button text not found or wrong struction i verification text object!`);
      throw new Error(`Language ${lang} for successful button text not found: ${err.message}`);
    }
  }
  
  /**
   * Get the expired header text for a language.
   * 
   * Gets the expired header text in a specific language from the verification text
   * object.
   * 
   * @param {string} language - The wanted language
   * @throws {error} - If an error occures when fetching the text for the header.
   * @returns {string} - The expired text for the header in a specific language, if found.
   */
  function getExpiredHeaderForLanguage(language) {
    const lang = language.toLowerCase();
    try {
      return verificationTexts[lang].expired.header;
    } catch (err) {
      console.log(`Language ${lang} for expired header not found or wrong struction i verification text object!`);
      throw new Error(`Language ${lang} for expired header not found: ${err.message}`);
    }
  }
  
  /**
   * Get the expired message text for a language.
   * 
   * Gets the expired message text in a specifict language from the verification text
   * object.
   * 
   * @param {string} language - The wanted language
   * @throws {error} - If an error occures when fetching the text for the message.
   * @returns {string} - The expired text for the message in a specific language, if found.
   */
  function getExpiredMessageForLanguage(language) {
    const lang = language.toLowerCase();
    try {
      return verificationTexts[lang].expired.message;
    } catch (err) {
      console.log(`Language ${lang} for expired message not found or wrong struction i verification text object!`);
      throw new Error(`Language ${lang} for expired message not found: ${err.message}`);
    }
  }
  
  /**
   * Get the expired button text for a language.
   * 
   * Gets the expired button text in a specifict language from the verification text
   * object.
   * 
   * @param {string} language - The wanted language
   * @throws {error} - If an error occures when fetching the button text for the message.
   * @returns {string} - The expired button text in a specific language, if found.
   */
  function getExpiredButtonTextForLanguage(language) {
    const lang = language.toLowerCase();
    try {
      return verificationTexts[lang].expired.buttonText;
    } catch (err) {
      console.log(`Language ${lang} for expired button text not found or wrong struction i verification text object!`);
      throw new Error(`Language ${lang} for expired button text not found: ${err.message}`);
    }
  }
  
  /**
   * Get the error header text for a language.
   * 
   * Gets the error header text in a specific language from the verification text
   * object.
   * 
   * @param {string} language - The wanted language
   * @throws {error} - If an error occures when fetching the text for the header.
   * @returns {string} - The error text for the header in a specific language, if found.
   */
  function getErrorHeaderForLanguage(language) {
    const lang = language.toLowerCase();
    try {
      return verificationTexts[lang].error.header;
    } catch (err) {
      console.log(`Language ${lang} for error header not found or wrong struction i verification text object!`);
      throw new Error(`Language ${lang} for error header not found: ${err.message}`);
    }
  }
  
  /**
   * Get the error message text for a language.
   * 
   * Gets the error message text in a specifict language from the verification text
   * object.
   * 
   * @param {string} language - The wanted language
   * @throws {error} - If an error occures when fetching the text for the message.
   * @returns {string} - The error text for the message in a specific language, if found.
   */
  function getErrorMessageForLanguage(language) {
    const lang = language.toLowerCase();
    try {
      return verificationTexts[lang].error.message;
    } catch (err) {
      console.log(`Language ${lang} for error message not found or wrong struction i verification text object!`);
      throw new Error(`Language ${lang} for error message not found: ${err.message}`);
    }
  }
  
  /**
   * Get the second error message text for a language.
   * 
   * Gets the second error message text in a specifict language from the verification text
   * object.
   * 
   * @param {string} language - The wanted language
   * @throws {error} - If an error occures when fetching the text for the message.
   * @returns {string} - The second error text for the message in a specific language, if found.
   */
  function getErrorSecondMessageForLanguage(language) {
    const lang = language.toLowerCase();
    try {
      return verificationTexts[lang].error.secondMessage;
    } catch (err) {
      console.log(`Language ${lang} for second error text not found or wrong struction i verification text object!`);
      throw new Error(`Language ${lang} for second error text not found: ${err.message}`);
    }
  }
  