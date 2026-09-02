/**
 * Copy deck for the 403 page. English is the Figma source (node 128-5900);
 * uk / ru are localised runs of the same strings.
 * The last two words of every paragraph are bound with U+00A0 so a line
 * never ends on a lone word.
 */
window.LANGS = [
  { id: "en", name: "English" },
  { id: "uk", name: "Українська" },
  { id: "ru", name: "Русский" },
];

window.I18N = {
  en: {
    "403_code": "403",
    "403_title": "Access Denied",
    "403_sub": "Our security systems have flagged this connection. To protect our merchants and their customers, we've restricted access from your current IP or location.",
    "403_btn": "Contact Support",
    "403_what": "If you need immediate assistance, please contact us. We apologize for any inconvenience.",
    "403_toast": "Opening support…",
    "what_title": "What can I do?",
  },
  uk: {
    "403_code": "403",
    "403_title": "Доступ заборонено",
    "403_sub": "Наші системи безпеки позначили це з’єднання. Щоб захистити наших продавців та їхніх покупців, ми обмежили доступ з вашої поточної IP-адреси або локації.",
    "403_btn": "Звернутися до підтримки",
    "403_what": "Якщо вам потрібна термінова допомога, зверніться до нас. Просимо вибачення за незручності.",
    "403_toast": "Відкриваємо підтримку…",
    "what_title": "Що можна зробити?",
  },
  ru: {
    "403_code": "403",
    "403_title": "Доступ запрещён",
    "403_sub": "Наши системы безопасности отметили это соединение. Чтобы защитить наших продавцов и их покупателей, мы ограничили доступ с вашего текущего IP-адреса или местоположения.",
    "403_btn": "Связаться с поддержкой",
    "403_what": "Если вам нужна срочная помощь, свяжитесь с нами. Приносим извинения за неудобства.",
    "403_toast": "Открываем поддержку…",
    "what_title": "Что можно сделать?",
  },
};
