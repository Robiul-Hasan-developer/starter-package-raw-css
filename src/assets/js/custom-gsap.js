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
      gsap.utils.clamp(0, 100),
    );

    const yTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, height, 0, 100),
      gsap.utils.clamp(0, 100),
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

// **************************** Text Reveal js Start ****************************
function text_reveal() {
  const split_2 = new SplitText(".text-reveal", { type: "lines" });
  split_2.lines.forEach((target) => {
    gsap.to(target, {
      backgroundPositionX: 0,
      ease: "none",
      scrollTrigger: {
        trigger: target,
        scrub: 1,
        start: "top 85%",
        end: "bottom center",
      },
    });
  });
}

function text_reveal_two() {
  const split = new SplitText(".text-reveal-two", { type: "lines" });
  split.lines.forEach((target) => {
    gsap.to(target, {
      backgroundPositionX: 0,
      ease: "none",
      scrollTrigger: {
        trigger: target,
        scrub: 1,
        start: "top 85%",
        end: "bottom center",
      },
    });
  });
}

$(function () {
  text_reveal();
  text_reveal_two();
});
// **************************** Text Reveal js Start ****************************

// **************************** Text Reveal with Wave js Start ****************************
function tp_scrollBg($wrap) {
  $wrap = $wrap || jQuery("body");
  $wrap.find(".text-reveal-wave").each(function () {
    var $el = jQuery(this);
    var tpSplit = new SplitText($el[0], { type: "words, chars" });
    jQuery(tpSplit.words).children().first().addClass("tp-first-char");
    gsap.fromTo(
      tpSplit.chars,
      {
        position: "relative",
        display: "inline-block",
        opacity: 0.2,
        x: -5,
      },
      {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: $el[0],
          toggleActions: "play pause reverse pause",
          start: "top 70%",
          end: "top 40%",
          scrub: 0.7,
        },
      },
    );
  });
}
window.addEventListener("DOMContentLoaded", function () {
  tp_scrollBg();
});
// **************************** Text Reveal with Wave js End ****************************

//**************************** clip animation image js Start ****************************
document.addEventListener("DOMContentLoaded", () => {
  const initialClipPaths = [
    "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
    "polygon(33.33% 0%, 33.33% 0%, 33.33% 0%, 33.33% 0%)",
    "polygon(65.66% 0%, 66.66% 0%, 66.66% 0%, 66.66% 0%)",
    "polygon(0% 33.33%, 0% 33.33%, 0% 33.33%, 0% 33.33%)",
    "polygon(33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%)",
    "polygon(65.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%)",
    "polygon(0% 66.66%, 0% 66.66%, 0% 66.66%, 0% 66.66%)",
    "polygon(33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%)",
    "polygon(65.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%)",
  ];

  const finalClipPaths = [
    "polygon(0% 0%, 34.33% 0%, 34.33% 34.33%, 0% 34.33%)",
    "polygon(32.33% 0%, 66.66% 0%, 66.66% 33.33%, 33.33% 34.33%)",
    "polygon(65.66% 0%, 100% 0%, 100% 33.33%, 65.66% 34.33%)",
    "polygon(0% 33.33%, 33.33% 33.33%, 33.33% 66.66%, 0% 66.66%)",
    "polygon(30.33% 33.33%, 66.66% 33.33%, 66.66% 66.66%, 33.33% 66.66%)",
    "polygon(65.66% 33.33%, 100% 32.33%, 100% 66.66%, 65.66% 66.66%)",
    "polygon(0% 65.66%, 33.33% 66.66%, 33.33% 100%, 0% 100%)",
    "polygon(30.33% 66.66%, 66.66% 65.66%, 66.66% 100%, 33.33% 100%)",
    "polygon(65.66% 66.66%, 100% 65.66%, 100% 100%, 65.66% 100%)",
  ];

  // Create mask divs for each wrapper
  document.querySelectorAll(".clip-animation").forEach((wrapper) => {
    const img = wrapper.querySelector(
      ".clip-animation-img[data-animate='true']",
    );
    if (!img) return;
    const url = img.src;

    // Remove old masks if any (reuse safe)
    wrapper.querySelectorAll(".mask").forEach((m) => m.remove());

    for (let i = 0; i < 9; i++) {
      const mask = document.createElement("div");
      mask.className = `mask mask-${i + 1}`;
      Object.assign(mask.style, {
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "absolute",
        inset: "0",
      });
      wrapper.appendChild(mask);
    }
  });

  // Animate masks
  gsap.utils.toArray(".clip-animation").forEach((wrapper) => {
    const masks = wrapper.querySelectorAll(".mask");
    if (!masks.length) return;

    gsap.set(masks, { clipPath: (i) => initialClipPaths[i] });

    const order = [
      [".mask-1"],
      [".mask-2", ".mask-4"],
      [".mask-3", ".mask-5", ".mask-7"],
      [".mask-6", ".mask-8"],
      [".mask-9"],
    ];

    const tl = gsap.timeline({
      scrollTrigger: { trigger: wrapper, start: "top 75%" },
    });

    order.forEach((targets, i) => {
      const validTargets = targets
        .map((c) => wrapper.querySelector(c))
        .filter((el) => el); // filter out nulls

      if (validTargets.length) {
        tl.to(
          validTargets,
          {
            clipPath: (j, el) => finalClipPaths[Array.from(masks).indexOf(el)],
            duration: 1,
            ease: "power4.out",
            stagger: 0.1,
          },
          i * 0.125,
        );
      }
    });
  });
});
//**************************** clip animation image js End ****************************


/* **************************************************************************** 
                          Custom GSAP js start 
****************************************************************************  */
