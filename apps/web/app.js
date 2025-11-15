const app = document.getElementById('app');

function renderBase() {
    // Desenha o layout principal (busca + área de conteúdo)
    app.innerHTML = `
    <div class="search-box">
        <input type="text" id="poke-search" placeholder="Digite o nome do Pokémon para buscar: "/>
        <button id="btn-search">Buscar</button>
        <button id="btn-list">Listar 20</button>
    </div>
    <div id="content"><p>Carregando...</p></div>
    <p>Dados da <strong>PokeAPI</strong>(pokeapi.co)</p>
    `;
    
    // 2. SÓ DEPOIS de desenhar, adiciona os eventos
    document.getElementById('btn-search').addEventListener('click', () => {
        const term = document.getElementById('poke-search').value.toLowerCase().trim();
        if (term) {
            loadPokemonByName(term);
        }
    });

    document.getElementById('btn-list').addEventListener('click', () => {
        loadPokemonList();
    });
}

// 3. Função para LISTAR 20 (renomeei para ficar claro)
async function loadPokemonList() {
    const content = document.getElementById('content');
    content.innerHTML = `<p>Carregando lista...</p>`;
    
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`);
        if (!res.ok) throw new Error('Erro na API');
        const data = await res.json();

        const listHTML = `
        <h2>Lista de Pokémons</h2>
        <div class="poke-list">
            ${data.results.map((p, i) => `
                <div class="pokemon-card">
                    <span>${i + 1}. ${p.name}</span>
                    <button data-name="${p.name}" class="btn-details">Detalhes</button>
                </div>
            `).join('')}
        </div>
        `;
        content.innerHTML = listHTML;

        // Adiciona eventos nos novos botões de "Detalhes"
        document.querySelectorAll('.btn-details').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const name = e.currentTarget.getAttribute('data-name');
                loadPokemonByName(name);
            });
        });

    } catch (err) {
        console.error(err);
        content.innerHTML = `<h2>Erro ao carregar a lista. Tente novamente.</h2>`;
    }
}

// 4. Função para buscar UM Pokémon pelo nome
async function loadPokemonByName(name) {
    const content = document.getElementById('content');
    content.innerHTML = `<p>Buscando ${name}...</p>`;

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        if (!res.ok) throw new Error('Pokémon não encontrado');
        
        const p = await res.json(); 

        const types = p.types.map(t => t.type.name).join(', ');

        const pokemonHTML = `
        <h2>${p.name} (ID: ${p.id})</h2>
        <div class="poke-detail">
            <img src="${p.sprites.front_default}" alt="${p.name}"/>
            <p>Altura: ${p.height}</p>
            <p>Peso: ${p.weight}</p>
            <p>Tipos: ${types}</p>
        </div>
        <button id="btn-back">Voltar para Lista</button>
        `;

        // Atualiza SÓ o conteúdo
        content.innerHTML = pokemonHTML;
        
        // Adiciona evento no novo botão "Voltar"
        document.getElementById('btn-back').addEventListener('click', loadPokemonList);
        
    } catch (err) {
        console.error(err);
        content.innerHTML = `<h2>Erro: Pokémon "${name}" não encontrado.</h2>`;
    }
}

// 5. Inicia o App
renderBase();
loadPokemonList();