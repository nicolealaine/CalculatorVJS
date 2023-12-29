document.addEventListener("DOMContentLoaded", function (event) {
  const themeElement = document.querySelector("body");
  const toggleButton = document.querySelector(".toggle__button");
  toggleButton.style.alignItems = "left";
  toggleButton.addEventListener("click", function () {
    if (themeElement.classList.contains("theme1")) {
      themeElement.classList.remove("theme1");
      themeElement.classList.add("theme2");
    } else if (themeElement.classList.contains("theme2")) {
      themeElement.classList.remove("theme2");
      themeElement.classList.add("theme3");
    } else if (themeElement.classList.contains("theme3")) {
      themeElement.classList.remove("theme3");
      themeElement.classList.add("theme1");
    }
  });
});
