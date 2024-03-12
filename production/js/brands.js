// 2021-05-05 12:50
const MAX_LENGTH_OF_BRAND = 3;

const brands = {
  aeg: {
    logoName: 'AEG.svg',
    alt: 'AEG logo'
  },
  elx: {
    logoName: 'Electrolux.svg',
    alt: 'Electrolux logo'
  },
  zan: {
    logoName: 'Zanussi.svg',
    alt: 'Zanussi logo'
  },
  def: {
    logoName: 'Default.png',
    alt: 'Default logo'
  }
};

const brandMappings = {
  electrolux: {
    brandShortcut: 'elx'
  },
  zanussi: {
    brandShortcut: 'zan'
  },
  default: {
    brandShortcut: 'def'
  }
}

/**
 * Get the brand logo name.
 *
 * Gets the logo filname from the brands object, if found. If the brand name is
 * longer than shortcut max length, it tries to get the shortcut name from
 * the brand mapping table.
 *
 * @param {string} brand - The brand.
 * @throws {error} - If an error occures when fetching the file name for the logo.
 * @returns {string} - The file name for the logo.
 */
function getBrandLogoName(brand) {
  try {
    var brandLogoName = brand.toLowerCase();
    if (brandLogoName.length > MAX_LENGTH_OF_BRAND) {
      brandLogoName = getBrandShortcut(brandLogoName);
    }

    return brands[brandLogoName].logoName;
  } catch (err) {
    console.log(`Logo name for the brand ${brand} could not be fetched: Error ${err.message}`);
    throw new Error(`Logo name for the brand ${brand} could not be fetched: Error ${err.message}`);
  }
}

/**
 * Get the brand alt name.
 *
 * Gets the alt filname from the brands object, if found. If the brand name is
 * longer than shortcut max length, it tries to get the shortcut name from
 * the brand mapping table.
 *
 * @param {string} brand - The brand.
 * @throws {error} - If an error occures when fetching the file name for the logo.
 * @returns {string} - The alt name for the logo.
 */
 function getBrandAltName(brand) {
  try {
    var brandAltName = brand.toLowerCase();
    if (brandAltName.length > MAX_LENGTH_OF_BRAND) {
      brandAltName = getBrandShortcut(brandLogoName);
    }
    return brands[brandAltName].alt;
  } catch (err) {
    console.log(`Alt name for the brand ${brand} could not be fetched: Error ${err.message}`);
    throw new Error(`Alt name for the brand ${brand} could not be fetched: Error ${err.message}`);
  }
}

/**
   * Get the shortcut name for the brand from the full name.
   *
   * @param {string} brand - The full brand name.
   * @returns {string} - The shortcut name for the brand.
   */
 function getBrandShortcut(brand) {
  try {
    const brandLogoName = brand.toLowerCase();
    return brandMappings[brandLogoName].brandShortcut;
  } catch (err) {
    console.log(`Shortcut name for the brand ${brand} could not be fetched: Error ${err.message}`);
    throw new Error(`Shortcut name for the brand ${brand} could not be fetched: Error ${err.message}`);
  }
}