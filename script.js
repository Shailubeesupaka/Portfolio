document.documentElement.classList.add("js");

const toggleButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const revealElements = document.querySelectorAll(".reveal");

if (toggleButton && siteNav) {
  toggleButton.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    toggleButton.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav?.classList.remove("is-open");
    toggleButton?.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0 }
);

revealElements.forEach((element) => observer.observe(element));

// Safety net: never leave content hidden, even if the fade-in does not trigger.
const showAll = () => revealElements.forEach((element) => element.classList.add("is-visible"));
window.addEventListener("load", () => setTimeout(showAll, 600));
setTimeout(showAll, 2500);
