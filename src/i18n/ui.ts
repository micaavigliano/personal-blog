export const languages = {
  en: "English",
  es: "Español",
};

export const defaultLang = "es";
export const showDefaultLang = true;

export const ui = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.twitter": "Twitter",
  },
  es: {
    "nav.home": "Inicio",
    "nav.about": "Sobre mi",
  },
} as const;

export const routes = {
  es: {
    about: "sobre mi",
  },
  en: {
    about: "about-me",
  },
};
