let slideIndex = 1;
showSlides(slideIndex);
let slideInterval = setInterval(function () {
  plusSlides(1);
}, 2000); // 2000ms = 2초마다 슬라이드가 넘어갑니다.

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");

  menuToggle.addEventListener("click", function () {
    // Toggle the active class to show/hide the menu
    nav.classList.toggle("active");
  });
});

// 클릭 시 메뉴 밖 클릭 시 메뉴 닫기 (옵션)
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
    nav.classList.remove("active"); // 메뉴 닫기
  }
});
document.querySelectorAll(".menu-item > a").forEach(function (menuLink) {
  menuLink.addEventListener("click", function (e) {
    e.preventDefault(); // 기본 링크 동작 방지
    const submenu = this.nextElementSibling;

    if (submenu) {
      submenu.classList.toggle("active"); // 하위 메뉴 열기/닫기
    }
  });
});
