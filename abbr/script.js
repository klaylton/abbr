function func(el) {
  // const el = event.target;
  const title = el.getAttribute('title');

  const tooltip = document.createElement("div");
  tooltip.setAttribute("id", "tooltip");
  tooltip.textContent = title;

  const corpo = document.querySelector("body");
  corpo.appendChild(tooltip);
  tooltip.style.opacity = 0;
  el.removeAttribute("title");

  // função iniciar
  const init_tooltip = function () {
    if (window.innerWidth < tooltip.offsetWidth * 1.5) {
      tooltip.style.maxWidth = (window.innerWidth / 2) + "px";
    } else {
      tooltip.style.maxWidth = "340px";
    }

    var pos_left = el.offsetLeft + (el.offsetWidth / 2) - (tooltip.offsetWidth / 2);
    var pos_top = el.offsetTop - document.documentElement.scrollTop - tooltip.offsetHeight - 20;

    if (pos_left < 0) {
      pos_left = el.offsetLeft + el.offsetWidth / 2 - 20;
      tooltip.classList.add('left');
    } else {
      tooltip.classList.remove('left');
    }

    if (pos_left + tooltip.offsetWidth > window.innerWidth) {
      pos_left = el.offsetLeft - tooltip.offsetWidth + el.offsetWidth / 2 + 20;
      tooltip.classList.add('right');
    } else {
      tooltip.classList.remove('right');
    }

    if (pos_top < 0) {
      pos_top = el.offsetTop + el.offsetHeight + 10;
      tooltip.classList.add('top');
    } else {
      pos_top = el.offsetTop - tooltip.offsetHeight - 10;
      tooltip.classList.remove('top');
    }

    tooltip.style.left = pos_left + "px";
    tooltip.style.top = pos_top + "px";
    tooltip.style.opacity = 1;
    tooltip.style.transition = "all 0.5s";

  };

  init_tooltip();

  function esconder() {
    if (tooltip.parentNode) {
      tooltip.style.opacity = 0;
      setTimeout(() => {
        corpo.removeChild(tooltip);
      }, 500);
    }

    el.setAttribute("title", title);
  };

  el.addEventListener("blur", esconder);

  el.addEventListener("mouseout", esconder);
}

window.addEventListener('mouseover', function (event) {
  if (event.target.tagName === 'ABBR') {
    func(event.target)
  }
})