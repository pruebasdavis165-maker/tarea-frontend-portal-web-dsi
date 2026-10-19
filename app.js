const grid = document.getElementById('pokemon-grid');

async function fetchPokemons() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
        const data = await response.json();
        
        for (const item of data.results) {
            const pokeRes = await fetch(item.url);
            const pokeData = await pokeRes.json();
            createCard(pokeData);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function createCard(pokemon) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    // Usamos el artwork oficial para mayor calidad visual
    const imageUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    
    card.innerHTML = `
        <img src="${imageUrl}" alt="${pokemon.name}">
        <h3>${pokemon.name}</h3>
        <p>Tipo: ${pokemon.types.map(t => t.type.name).join(', ')}</p>
    `;
    grid.appendChild(card);
}

fetchPokemons();
