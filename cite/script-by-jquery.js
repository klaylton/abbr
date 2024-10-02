// codigo convertido de jquery para js direto do codigo do plugin original

document.addEventListener('DOMContentLoaded', function () {
    var targets = document.querySelectorAll('[rel~=tooltip]');
    var target = null;
    var tooltip = null;
    var tip = null;

    targets.forEach(function (el) {
        el.addEventListener('mouseenter', function () {
            target = el;
            tip = target.getAttribute('title');
            if (!tip || tip === '') return false;

            tooltip = document.createElement('div');
            tooltip.id = 'tooltip';
            tooltip.style.opacity = 0;
            tooltip.innerHTML = tip;
            document.body.appendChild(tooltip);

            target.removeAttribute('title');

            var init_tooltip = function () {
                if (window.innerWidth < tooltip.offsetWidth * 1.5) {
                    tooltip.style.maxWidth = (window.innerWidth / 2) + 'px';
                } else {
                    tooltip.style.maxWidth = '340px';
                }

                var pos_left = target.getBoundingClientRect().left + (target.offsetWidth / 2) - (tooltip.offsetWidth / 2);
                var pos_top = target.getBoundingClientRect().top - window.scrollY - tooltip.offsetHeight - 20;

                if (pos_left < 0) {
                    pos_left = target.getBoundingClientRect().left + target.offsetWidth / 2 - 20;
                    tooltip.classList.add('left');
                } else {
                    tooltip.classList.remove('left');
                }

                if (pos_left + tooltip.offsetWidth > window.innerWidth) {
                    pos_left = target.getBoundingClientRect().left - tooltip.offsetWidth + target.offsetWidth / 2 + 20;
                    tooltip.classList.add('right');
                } else {
                    tooltip.classList.remove('right');
                }

                if (pos_top < 0) {
                    pos_top = target.getBoundingClientRect().top + target.offsetHeight;
                    tooltip.classList.add('top');
                } else {
                    pos_top = target.getBoundingClientRect().top - tooltip.offsetHeight - 20;
                    tooltip.classList.remove('top');
                }

                tooltip.style.left = pos_left + 'px';
                tooltip.style.top = pos_top + 'px';
                tooltip.style.opacity = 1;
                tooltip.style.transition = 'top 0.05s ease, opacity 0.05s ease';
                tooltip.style.top = (parseFloat(tooltip.style.top) + 10) + 'px';
            };

            init_tooltip();
            window.addEventListener('resize', init_tooltip);

            var remove_tooltip = function () {
                tooltip.style.top = (parseFloat(tooltip.style.top) - 10) + 'px';
                tooltip.style.opacity = 0;
                setTimeout(function () {
                    tooltip.remove();
                }, 50);

                target.setAttribute('title', tip);
            };

            // target.addEventListener('mouseleave', remove_tooltip);
            tooltip.addEventListener('click', remove_tooltip);
        });
    });
});
