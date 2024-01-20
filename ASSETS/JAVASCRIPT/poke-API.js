const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  //convertendo do modelo de pokemon do pokeapi para um criado por mim
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types; //pegando a primeira posição

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getpokemons = (offset = 0, limite = 20) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limite}`;

  return fetch(url)
    .then((response) => response.json()) //convertendo esse response para json
    .then((jsonBody) => jsonBody.results) //pegando somente o nosso resultado(lista de pokemons)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //listas de requisições dos detalhes do pokemon
    .then((detailRequests) => Promise.all(detailRequests)) //esperando a lista de requisições ser resolvida
    .then((pokemonsDetails) => pokemonsDetails);
};
