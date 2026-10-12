document.addEventListener("DOMContentLoaded", () => {

  /* ===== HERO CAROUSEL ===== */

  const carousel = document.querySelector("#heroCarousel");

  if (carousel) {
    new bootstrap.Carousel(carousel, {
      interval: 6000,
      ride: "carousel",
      pause: false,
      touch: true,
      wrap: true
    });
  }


  /* ===== DESKTOP MEGA MENU ===== */
  const navButtons = document.querySelectorAll(".desktop-nav-link[data-mega]");
  const megaMenus = document.querySelectorAll(".mega-menu");

  function closeMegaMenus() {
    navButtons.forEach(button => button.classList.remove("is-open"));
    megaMenus.forEach(menu => menu.classList.remove("is-open"));
  }

  navButtons.forEach(button => {
    button.addEventListener("click", event => {
      event.stopPropagation();

      const targetId = button.dataset.mega;
      const targetMenu = document.getElementById(targetId);
      const alreadyOpen = button.classList.contains("is-open");

      closeMegaMenus();

      if (!alreadyOpen && targetMenu) {
        button.classList.add("is-open");
        targetMenu.classList.add("is-open");
      }
    });
  });

  megaMenus.forEach(menu => {
    menu.addEventListener("click", event => {
      event.stopPropagation();
    });
  });

  document.addEventListener("click", () => {
    closeMegaMenus();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth < 992) {
      closeMegaMenus();
    }
  });

});

/* ===== PRODUCT SLIDER ===== */

const productSlider = document.querySelector(".product-slider-track");
const productViewport = document.querySelector(".product-slider-viewport");
const productCards = document.querySelectorAll(".product-card");
const productPrev = document.querySelector(".product-prev");
const productNext = document.querySelector(".product-next");
const productProgressThumb = document.querySelector(".product-progress-thumb");

if (productSlider && productViewport && productCards.length) {

  let productIndex = 0;
  let productAutoPlay = null;

  const PRODUCT_AUTOPLAY_SPEED = 3500;

  function getVisibleProducts() {
    if (window.innerWidth <= 767) return 1;
    if (window.innerWidth <= 1199) return 3;
    return 4;
  }

  function getProductStep() {
    const card = productCards[0];
    const trackStyle = window.getComputedStyle(productSlider);
    const gap = parseFloat(trackStyle.gap) || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function getMaxProductIndex() {
    return Math.max(0, productCards.length - getVisibleProducts());
  }

  function updateProductSlider() {

    const maxIndex = getMaxProductIndex();

    if (productIndex > maxIndex) productIndex = 0;
    if (productIndex < 0) productIndex = maxIndex;

    const step = getProductStep();

    productSlider.style.transform = `translateX(-${productIndex * step}px)`;

    updateProductProgress();

  }

  function updateProductProgress() {

    const maxIndex = getMaxProductIndex();
    const visible = getVisibleProducts();
    const total = productCards.length;

    const thumbWidth = Math.min(100, (visible / total) * 100);
    const movableWidth = 100 - thumbWidth;
    const position = maxIndex === 0 ? 0 : (productIndex / maxIndex) * movableWidth;

    productProgressThumb.style.width = `${thumbWidth}%`;
    productProgressThumb.style.transform = `translateX(${position / thumbWidth * 100}%)`;

  }

  function nextProducts() {

    const maxIndex = getMaxProductIndex();

    productIndex++;

    if (productIndex > maxIndex) productIndex = 0;

    updateProductSlider();

  }

  function prevProducts() {

    const maxIndex = getMaxProductIndex();

    productIndex--;

    if (productIndex < 0) productIndex = maxIndex;

    updateProductSlider();

  }

  function startProductAutoPlay() {

    stopProductAutoPlay();

    productAutoPlay = setInterval(() => {
      nextProducts();
    }, PRODUCT_AUTOPLAY_SPEED);

  }

  function stopProductAutoPlay() {

    if (productAutoPlay) {
      clearInterval(productAutoPlay);
      productAutoPlay = null;
    }

  }

  productNext.addEventListener("click", () => {
    nextProducts();
    startProductAutoPlay();
  });

  productPrev.addEventListener("click", () => {
    prevProducts();
    startProductAutoPlay();
  });

  productViewport.addEventListener("mouseenter", stopProductAutoPlay);
  productViewport.addEventListener("mouseleave", startProductAutoPlay);

  window.addEventListener("resize", () => {
    productIndex = 0;
    updateProductSlider();
  });

  updateProductSlider();
  startProductAutoPlay();

}

/* ===== MAKEUP BEST CATEGORY ===== */

const makeupBestTabs = document.querySelectorAll(".makeup-best-tab");
const makeupBestTitle = document.querySelector("#makeupBestTitle");
const makeupBestSubtitle = document.querySelector("#makeupBestSubtitle");

makeupBestTabs.forEach(tab => {
  tab.addEventListener("shown.bs.tab", () => {
    makeupBestTitle.textContent = tab.dataset.title;
    makeupBestSubtitle.textContent = tab.dataset.subtitle;
  });
});