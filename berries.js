const grid = document.getElementById('berries-grid');

async function fetchBerries() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/berry?limit=12');
        const data = await response.json();
        
        for (const item of data.results) {
            const berryRes = await fetch(item.url);
            const berryData = await berryRes.json();
            createCard(berryData);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function createCard(berry) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <span class="berry-icon">🍒</span>
        <h3>${berry.name}</h3>
        <p>Firmeza: ${berry.firmness.name}</p>
        <p>Crecimiento: ${berry.growth_time}h</p>
    `;
    grid.appendChild(card);
}

fetchBerries();
