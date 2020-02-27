import LocalizedStrings from "react-localization";

let strings = new LocalizedStrings({
  // en: {
  //   logIn: "Log in",
  //   logOut: "Log out",
  // },

  fr: {
    logIn: "Se connecter",
    signUp: "S'inscrire",
    
  }
});

strings.setLanguage("fr");
// strings.setLanguage("en");
export default strings;
