document.addEventListener("DOMContentLoaded", function () {
  var isPopOpen = false;
  const dropDownBtn = document.getElementById("dropDownBtn");
  const menu = document.getElementById("dropdown-menu");

  dropDownBtn.addEventListener("click", () => {
    if (isPopOpen) {
      isPopOpen = false;
      menu.classList.remove("show");
      menu.classList.add("close");
      setTimeout(() => {
        menu.classList.add("hidden");
      }, 1000);
    } else {
      isPopOpen = true;
      menu.classList.add("show");
      menu.classList.remove("hidden");
    }
  });

  document.addEventListener("click", (event) => {
    if (
      !event.target.closest("#dropdown-menu") &&
      !event.target.closest("#dropDownBtn")
    ) {
      isPopOpen = false;
      menu.classList.remove("show");
      menu.classList.add("close");
      setTimeout(() => {
        menu.classList.add("hidden");
      }, 500);
    }
  });
});
