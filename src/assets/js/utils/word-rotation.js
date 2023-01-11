setInterval(function () {
  const show = document.querySelector("span.animated_text[data-show]");
  const next =
    show.nextElementSibling ||
    document.querySelector("span.animated_text:first-child");
  const up = document.querySelector("span.animated_text[data-up]");

  if (up) {
    up.removeAttribute("data-up");
  }

  show.removeAttribute("data-show");
  show.setAttribute("data-up", "");
  next.setAttribute("data-show", "");
}, 3000);