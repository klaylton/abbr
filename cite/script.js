// Map para armazenar os dados já consultados da API
const cache = new Map();

document.addEventListener('mouseover', async (event) => {
    const el = event.target;

    // Verifica se o elemento é um cite com rel="tooltip" e data-reference
    if (el.tagName === 'CITE' && el.getAttribute('rel') === 'tooltip' && el.getAttribute('data-reference')) {
        const reference = el.getAttribute('data-reference');

        // Se a referência já foi consultada e armazenada no cache, usa ela
        if (cache.has(reference)) {
            showTooltip(el, cache.get(reference));
        } else {
            // Caso contrário, faz a requisição para a API
            const tooltipData = await fetchReferenceData(reference);
            if (tooltipData) {
                cache.set(reference, tooltipData);
                showTooltip(el, tooltipData);
            }
        }

        el.addEventListener('mouseleave', () => hideTooltip());
    }
});

// Função para buscar os dados da API
async function fetchReferenceData(reference) {
    const apiUrl = `https://api.dastrevasparaluz.com/api/?ref=${encodeURIComponent(reference)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Formata os dados da resposta
        const verses = Object.values(data.verses)[0].verse_data;
        const verseText = Object.keys(verses).map(key => `${key}: ${verses[key]}`).join(' ');

        return {
            reference: data.reference,
            verses: verseText,
            translation: data.translation
        };
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        return null;
    }
}

// Função para exibir o tooltip
function showTooltip(el, data) {
    const tooltip = document.createElement('div');
    tooltip.setAttribute('id', 'tooltip');

    // Conteúdo do tooltip
    tooltip.innerHTML = `
        <header><strong>${data.reference}</strong></header>
        <div>${data.verses}</div>
        <footer><em>${data.translation}</em></footer>
    `;

    document.body.appendChild(tooltip);
    positionTooltip(el, tooltip);

    // Função para reposicionar o tooltip
    el.addEventListener('mousemove', () => positionTooltip(el, tooltip));
}

// Função para posicionar o tooltip
function positionTooltip(target, tooltip) {
    // largura
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
}

// Função para esconder o tooltip
function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}
