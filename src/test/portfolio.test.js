import { renderPortfolio } from '../js/portfolio';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        items: [
          { category: "Web", title: "Project 1", image: "image1.jpg" },
          { category: "Mobile", title: "Project 2", image: "image2.jpg" },
          { category: "Web", title: "Project 3", image: "image3.jpg" },
        ],
      }),
  })
);

describe('renderPortfolio', () => {
  beforeEach(() => {
    global.currentPage = 1;
    global.itemPerPage = 9; // Установите значение itemPerPage для тестов
    document.body.innerHTML = `
      <div class="portfolio-content"></div>
      <div class="portfolio-pagination"></div>
    `;
  });

  test('renders portfolio items', async () => {
    await renderPortfolio();

    const portfolioItems = document.querySelectorAll('.portfolio-content__item');
    expect(portfolioItems.length).toBeGreaterThan(0);
  });

  test('renders pagination buttons', async () => {
    await renderPortfolio();

    const paginationItems = document.querySelectorAll('.portfolio-pagination__item');
    expect(paginationItems.length).toBeGreaterThan(0);
  });

  test('updates currentPage and renders correct items', async () => {
    global.currentPage = 2; 
    await renderPortfolio();

    const portfolioItems = document.querySelectorAll('.portfolio-content__item');
    expect(portfolioItems.length).toBeLessThanOrEqual(global.itemPerPage); 
  });
});
