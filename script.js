document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("language-selector");

  function setLanguage(lang) {
    fetch(`assets/lang/${lang}.json`)
      .then(res => res.json())
      .then(data => {
        document.querySelectorAll("[data-i18n]").forEach(el => {
          const key = el.getAttribute("data-i18n");
          if (data[key]) el.textContent = data[key];
        });
      });
  }

  selector.addEventListener("change", (e) => {
    setLanguage(e.target.value);
  });

  setLanguage("es"); // Idioma por defecto
});

