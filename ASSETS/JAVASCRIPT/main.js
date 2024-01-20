const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
let offset = 0;
const limit = 10;
const maxRecords = 151;//limitando os pokemons aos da primeira geração

function loadPokemonsitens(offset, limit) {
  pokeApi.getpokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        (pokemon) => ` 
           <li class="pokemon ${pokemon.type}">
             <span class="number">#${pokemon.number}</span>
             <span class="name">${pokemon.name}</span>
                  
             <div class="detail">
                  <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class ="type ${type}">${type}</li>`)
                      .join("")}
                  </ol>
                  <img src="${pokemon.photo}" 
                      alt="${pokemon.name}">
            </div>
           </li>`
      )
      .join(""); //recebe um pokemon e converte para html e junta tudo através do join

    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonsitens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtd_RecordsNextpage = offset + limit;

  if (qtd_RecordsNextpage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonsitens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton); //removendo o botao quando o limite for atingido
  } else {
    loadPokemonsitens(offset, limit);
  }
});
