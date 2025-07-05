document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("language-selector");
  const userLang = localStorage.getItem("lang") || "es";

  selector.value = userLang;
  loadLanguage(userLang);

  selector.addEventListener("change", (e) => {
    const lang = e.target.value;
    localStorage.setItem("lang", lang);
    loadLanguage(lang);
  });
});

function loadLanguage(lang) {
  fetch(`assets/lang/${lang}.json`)
    .then(response => response.json())
    .then(translations => {
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[key]) {
          el.textContent = translations[key];
        }
      });
      document.title = translations["title"];
    })
    .catch(error => console.error("Error cargando traducción:", error));
}
