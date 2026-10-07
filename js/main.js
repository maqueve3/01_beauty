document.addEventListener("DOMContentLoaded", () => {

    const carouselElement = document.querySelector("#mainVisualCarousel");
  
    if (carouselElement) {
  
      new bootstrap.Carousel(carouselElement, {
        interval: 6000,
        ride: "carousel",
        pause: false,
        touch: true,
        wrap: true
      });
  
    }
  
  });