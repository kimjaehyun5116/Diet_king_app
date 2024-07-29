// /js/review.js
document.addEventListener("DOMContentLoaded", () => {
  const itemsPerPage = 4;
  const supplementContainer = document.querySelector(".supplement-container");
  const items = Array.from(supplementContainer.children);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  let currentPage = 1;

  function showPage(page) {
    items.forEach((item, index) => {
      item.style.display =
        Math.floor(index / itemsPerPage) + 1 === page ? "block" : "none";
    });
    updatePageNumbers();
    document.getElementById("prevPage").disabled = page === 1;
    document.getElementById("nextPage").disabled = page === totalPages;
  }

  function updatePageNumbers() {
    const pageNumbersContainer = document.getElementById("pageNumbers");
    pageNumbersContainer.innerHTML = "";

    const pageNumbers = Math.min(5, totalPages); // Show up to 5 page numbers
    const startPage = Math.max(1, currentPage - Math.floor(pageNumbers / 2));
    const endPage = Math.min(totalPages, startPage + pageNumbers - 1);

    for (let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.className = "page-button";
      if (i === currentPage) {
        pageButton.disabled = true;
      }
      pageButton.addEventListener("click", () => {
        currentPage = i;
        showPage(currentPage);
      });
      pageNumbersContainer.appendChild(pageButton);
    }
  }

  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
    }
  });

  showPage(currentPage);
});
document.addEventListener("DOMContentLoaded", function () {
  const filterItems = (group) => {
    const items = document.querySelectorAll(".supplement-item");
    items.forEach((item) => {
      if (group === "all" || item.getAttribute("data-group") === group) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  };

  // Default display all items
  filterItems("all");

  // Attach filter function to window for access from HTML
  window.filterItems = filterItems;
});
