export async function fetchPortfolio() {
  try {
    const response = await fetch("./json/portfolio.json");
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
  }
}

const itemPerPage = 9;
let currentPage = 1;
let currentFilter = "All";

export async function renderPortfolio() {
  const portfolioItems = await fetchPortfolio();

  const filteredItems = portfolioItems.filter(
    (item) => currentFilter === "All" || item.category === currentFilter
  );

  const start = (currentPage - 1) * itemPerPage;
  const paginatedItems = filteredItems.slice(start, start + itemPerPage);

  const portfolioContent = document.querySelector(".portfolio-content");
  portfolioContent.innerHTML = "";

  paginatedItems.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "portfolio-content__item";
    itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="portfolio-content__item-text">
            <p class="portfolio-content__item-text-category">${item.category}</p>
            <h3 class="portfolio-content__item-text-title">${item.title}</h3>
        </div>
    `;
    portfolioContent.appendChild(itemElement);
  });
  renderPagination(filteredItems.length);
}

export function renderPagination(totalItems) {
  const pagination = document.querySelector(".portfolio-pagination");
  const totalPages = Math.ceil(totalItems / itemPerPage);

  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageItem = document.createElement("button");
    pageItem.className = `portfolio-pagination__item ${
      i === currentPage ? "active" : ""
    }`;
    pageItem.textContent = i;
    pageItem.addEventListener("click", () => {
      currentPage = i;
      renderPortfolio();
    });
    pagination.appendChild(pageItem);
  }
}

export function setupFilters() {
  const filterItems = document.querySelectorAll(".portfolio-filter__item");
  filterItems.forEach((filter) => {
    filter.addEventListener("click", function () {
      document
        .querySelector(".portfolio-filter__item.active")
        .classList.remove("active");
      this.classList.add("active");
      currentFilter = this.textContent;
      currentPage = 1;
      renderPortfolio();
    });
  });
}
    