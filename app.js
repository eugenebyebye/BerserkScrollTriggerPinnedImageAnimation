document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    duration: 1.5,
  });

  gsap.to(".hero", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".hero",
      scrub: 1.5,
      start: "top top",
      end: "+=55%",
    },
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Устанавливаем z-index для всех элементов
  let workInfoItems = document.querySelectorAll(".work__img-item");
  workInfoItems.forEach(function (item, index) {
    item.style.zIndex = workInfoItems.length - index;
  });

  // Устанавливаем начальный clipPath для всех элементов
  gsap.set(".work__img-item", {
    clipPath: "inset(0% 0% 0% 0%)",
  });

  // Анимация clipPath для всех, кроме последнего элемента
  const animation = gsap.to(".work__img-item:not(:last-child)", {
    clipPath: "inset(0% 0% 100% 0%)",
    stagger: 0.5,
    ease: "none",
  });

  // Настройка ScrollTrigger
  ScrollTrigger.create({
    trigger: ".work__place",
    start: "top top",
    end: "bottom bottom",
    animation: animation,
    scrub: 1,
  });
});
