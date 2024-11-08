/**
 * Formate une date en fonction de la locale
 * @param {Date} date - La date à formater
 * @param {string} locale - La locale à utiliser (fr-FR, en-US, etc.)
 * @returns {string} La date formatée
 */
export const formatDate = (date, locale = "fr-FR") => {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

/**
 * Calcule une date future en ajoutant des jours ouvrés
 * @param {number} businessDays - Nombre de jours ouvrés à ajouter
 * @returns {Date} La nouvelle date
 */
export const addBusinessDays = (businessDays) => {
  const date = new Date();
  let count = 0;

  while (count < businessDays) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      count++;
    }
  }

  return date;
};

/**
 * Formate une plage de dates pour l'estimation de livraison
 * @param {Object} estimatedDays - Objet contenant min et max jours
 * @param {string} locale - La locale à utiliser
 * @returns {string} La plage de dates formatée
 */
export const formatDeliveryEstimate = (estimatedDays, locale = "fr-FR") => {
  const minDate = addBusinessDays(estimatedDays.min);
  const maxDate = addBusinessDays(estimatedDays.max);

  return `${formatDate(minDate, locale)} - ${formatDate(maxDate, locale)}`;
};

/**
 * Vérifie si une date est un jour ouvré
 * @param {Date} date - La date à vérifier
 * @returns {boolean} True si c'est un jour ouvré
 */
export const isBusinessDay = (date) => {
  const day = date.getDay();
  return day !== 0 && day !== 6;
};

/**
 * Obtient le prochain jour ouvré
 * @param {Date} date - La date de départ
 * @returns {Date} Le prochain jour ouvré
 */
export const getNextBusinessDay = (date = new Date()) => {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);

  while (!isBusinessDay(nextDay)) {
    nextDay.setDate(nextDay.getDate() + 1);
  }

  return nextDay;
};
