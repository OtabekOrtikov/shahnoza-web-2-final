import { setupFilters, renderPortfolio } from "./portfolio.js";

setupFilters();
renderPortfolio();


const submenu = document.querySelector(".submenu");
const submenuList = document.querySelector(".submenu-list");

submenu.addEventListener("click", () => {
  console.log("click");
  submenuList.classList.toggle("active");
  submenu.classList.toggle("active");
});

const burger = document.querySelector(".burger");
const nav = document.querySelector(".header-nav");

burger.addEventListener("click", () => {
  console.log("click");
  nav.classList.toggle("active");
  burger.classList.toggle("active");
});
