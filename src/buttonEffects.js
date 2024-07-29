document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".button");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      button.style.backgroundColor = "#333";
      button.style.color = "white";
      button.style.transform = "scale(1.05)";
    });

    button.addEventListener("mouseleave", function () {
      button.style.backgroundColor = button.classList.contains("kakao")
        ? "#fee500"
        : button.classList.contains("custom1-button")
        ? "#4caf50"
        : "#ff5c5c";
      button.style.color = "white";
      button.style.transform = "scale(1)";
    });
  });
});
