/* **************************************************************************** 
                          Custom GSAP js start 
****************************************************************************  */

var tl = gsap.timeline();
gsap.registerPlugin(ScrollTrigger, SplitText);

// **************************** Smooth Scroll js Start ****************************
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
if ($("#smooth-wrapper").length && $("#smooth-content").length) {
  ScrollSmoother.create({
    smooth: 2.35,
    effects: true,
    smoothTouch: 0.15,
    ignoreMobileResize: true,
  });
}
// **************************** Smooth Scroll js End **************************** 


// **************************** Custom Cursor Js Start ****************************
var body = document.body;
var cursor = document.querySelector(".cursor");
var dot = document.querySelector(".dot");
var cursorSmalls = document.querySelectorAll(".cursor-small");
var cursorBigs = document.querySelectorAll(".cursor-big");

// Move cursor
body.addEventListener("mousemove", function (event) {
  gsap.to(cursor, {
    x: event.x,
    y: event.y,
    duration: 1.5,
    delay: 0.1,
    visibility: "visible",
    ease: "expo.out",
  });

  gsap.to(dot, {
    x: event.x,
    y: event.y,
    duration: 1,
    visibility: "visible",
    ease: "expo.out",
  });
});

// Small Cursor
cursorSmalls.forEach((cursorSmall) => {
  cursorSmall.addEventListener("mouseenter", function () {
    gsap.to(dot, {
      scale: 8,
      backgroundColor: "#fff",
    });
    gsap.to(cursor, {
      opacity: 0,
      visibility: "hidden",
    });
  });

  cursorSmall.addEventListener("mouseleave", function () {
    gsap.to(dot, {
      scale: 1,
      backgroundColor: "#fff",
    });
    gsap.to(cursor, {
      opacity: 1,
      visibility: "visible",
    });
  });
});

// Big Cursor
cursorBigs.forEach((cursorBig) => {
  cursorBig.addEventListener("mouseenter", function () {
    gsap.to(dot, {
      scale: 30,
      backgroundColor: "#fff",
    });
    gsap.to(cursor, {
      opacity: 0,
      visibility: "hidden",
    });
  });

  cursorBig.addEventListener("mouseleave", function () {
    gsap.to(dot, {
      scale: 1,
      backgroundColor: "#fff",
    });
    gsap.to(cursor, {
      opacity: 1,
      visibility: "visible",
    });
  });
});

// 🔥 NEW: Hide cursor on a, button hover
document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", function () {
    gsap.to([cursor, dot], {
      scale: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  el.addEventListener("mouseleave", function () {
    gsap.to([cursor, dot], {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});
// **************************** Custom Cursor Js End ****************************


// **************************** Mobile Menu js Start ****************************
var mmm = gsap.matchMedia();
var mtl = gsap.timeline({ paused: true });

const toggleMobileMenu = document.querySelector(".toggle-mobileMenu");
const closeButton = document.querySelector(".close-button");
const mobileSideOverlay = document.querySelector(".side-overlay");

mmm.add("(max-width: 991px)", () => {
  mtl.to(".side-overlay", {
    opacity: 1,
    visibility: "visible",
    duration: 0.15,
  });

  mtl.to(".mobile-menu", {
    x: 0,
    delay: 0.2,
    duration: 0.2,
  });

  mtl.from(".nav-menu__item", {
    opacity: 0,
    duration: 0.2,
    y: -60,
    stagger: 0.08,
  });

  toggleMobileMenu.addEventListener("click", function () {
    mtl.play();
    document.body.style.overflow = "hidden";
  });

  closeButton.addEventListener("click", function () {
    mtl.reverse();
    document.body.style.overflow = "";
  });

  mobileSideOverlay.addEventListener("click", function () {
    mtl.reverse();
    document.body.style.overflow = "";
  });
});
// **************************** Mobile Menu js End ****************************

// **************************** Custom Split text Js Start ****************************
document.querySelectorAll(".splitTextStyleOne").forEach((title) => {
  const split = new SplitText(title, { type: "chars" });

  split.chars.forEach((char) => char.classList.add("char"));

  gsap.to(split.chars, {
    scrollTrigger: {
      trigger: title,
      start: "top 80%",
    },
    duration: 0.8,
    clipPath: "inset(0% 0% 0% 0%)",
    x: 0,
    opacity: 1,
    ease: "power4.out",
    stagger: 0.03,
  });
});
// **************************** Custom Split text Js End ****************************

// **************************** Position Aware button hover js start ****************************
class Button {
  constructor(buttonElement) {
    this.block = buttonElement;
    this.init();
    this.initEvents();
  }

  init() {
    const el = gsap.utils.selector(this.block);

    this.DOM = {
      button: this.block,
      flair: el(".button__flair"),
    };

    this.xSet = gsap.quickSetter(this.DOM.flair, "xPercent");
    this.ySet = gsap.quickSetter(this.DOM.flair, "yPercent");
  }

  getXY(e) {
    const { left, top, width, height } =
      this.DOM.button.getBoundingClientRect();

    const xTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, width, 0, 100),
      gsap.utils.clamp(0, 100)
    );

    const yTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, height, 0, 100),
      gsap.utils.clamp(0, 100)
    );

    return {
      x: xTransformer(e.clientX - left),
      y: yTransformer(e.clientY - top),
    };
  }

  initEvents() {
    this.DOM.button.addEventListener("mouseenter", (e) => {
      const { x, y } = this.getXY(e);

      this.xSet(x);
      this.ySet(y);

      gsap.to(this.DOM.flair, {
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
      });
    });

    this.DOM.button.addEventListener("mouseleave", (e) => {
      const { x, y } = this.getXY(e);

      gsap.killTweensOf(this.DOM.flair);

      gsap.to(this.DOM.flair, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.9,
        ease: "power2.out",
      });
    });

    this.DOM.button.addEventListener("mousemove", (e) => {
      const { x, y } = this.getXY(e);

      gsap.to(this.DOM.flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.9,
        ease: "power2",
      });
    });
  }
}

const buttonElements = document.querySelectorAll('[data-block="button"]');

buttonElements.forEach((buttonElement) => {
  new Button(buttonElement);
});
// **************************** Position Aware button hover js End ****************************

// **************************** split Reveal js Start ****************************
if ($(".split-reveal").length) {
  let revealContainers = document.querySelectorAll(".split-reveal");

  revealContainers.forEach((container) => {
    let splitElement = container.querySelector(".split-reveal-element");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        toggleActions: "play none none none",
      },
    });

    tl.set(container, {
      autoAlpha: 1,
    });

    tl.from(container, {
      duration: 1,
      xPercent: -100,
      ease: Power2.out,
    });

    tl.from(splitElement, {
      duration: 1,
      xPercent: 100,
      scale: 1,
      delay: -1,
      ease: Power2.out,
    });
  });
}
// **************************** split Reveal js End ****************************

//**************************** Move on cursor hover js Start ****************************
document.addEventListener("mousemove", parallax);
function parallax(e) {
  document.querySelectorAll(".move-on-cursor-hover").forEach(function (move) {
    var movingValue = move.getAttribute("data-value");
    var x = (e.clientX * movingValue) / 250;
    var y = (e.clientY * movingValue) / 250;
    move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
  });
}
//**************************** Move on cursor hover js End ****************************

/* **************************************************************************** 
                          Custom GSAP js start 
****************************************************************************  */
