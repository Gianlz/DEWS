// Use AJAX para carregar projetos do GitHub
$(document).ready(function () {
    $.ajax({
        url: 'https://api.github.com/users/seu-usuario/repos',
        dataType: 'json',
        success: function (data) {
            // Processar os dados e criar o carrossel de projetos aqui
        }
    });
});

// Mapeamento entre nomes de Pokémon e repositórios do GitHub
const pokemonToRepo = {
    "bulbasaur": "NomeDoRepositorio1",
    "charmander": "NomeDoRepositorio2",
    "squirtle": "NomeDoRepositorio3",
    // Adicione mais Pokémon e repositorios conforme necessário
};

// Função para buscar informações sobre Pokémon usando a API do Pokémon
function getPokemonInfo() {
    const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=10"; // Limitamos a 10 Pokémon neste exemplo

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Chamada de função para buscar os repositórios do GitHub
            getGitHubRepos(data.results);
        })
        .catch(error => console.error(error));
}

// Função para buscar os repositórios do GitHub do usuário "Gianlz" usando a API do GitHub
function getGitHubRepos(pokemonList) {
    const githubApiUrl = "https://api.github.com/users/Gianlz/repos";

    fetch(githubApiUrl)
        .then(response => response.json())
        .then(repos => {
            // Chamada de função para criar o carrossel com as informações de Pokémon e repositórios
            createPokemonCarousel(pokemonList, repos);
        })
        .catch(error => console.error(error));
}

// Função para criar o carrossel com as informações de Pokémon e repositórios
function createPokemonCarousel(pokemonList, githubRepos) {
    const projectCarousel = document.getElementById("project-carousel");

    pokemonList.forEach((pokemon, index) => {
        const projectCard = document.createElement("a"); // Usando <a> em vez de <div>
        projectCard.classList.add("carousel-slide");
        projectCard.href = `https://github.com/Gianlz/${githubRepos[index].name}`; // Link para o repositório GitHub

        const projectImage = document.createElement("img");
        projectImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`;
        projectImage.alt = pokemon.name;

        projectCard.appendChild(projectImage);
        projectCarousel.appendChild(projectCard);
    });

    // Inicialize o carrossel com o Slick Carousel
    initCarousel();
}

// Função para inicializar o carrossel com o Slick Carousel
function initCarousel() {
    $('.project-carousel').slick({
        slidesToShow: 3, // Mostrar 3 slides de uma vez
        slidesToScroll: 1, // Rolagem de 1 em 1
        infinite: true, // Loop infinito
        centerMode: true, // Modo de centro para mostrar partes dos Pokémon adjacentes
        variableWidth: true, // Largura variável para permitir diferentes larguras de slides
        prevArrow: $('#prev-slide'), // Botão anterior
        nextArrow: $('#next-slide') // Botão próximo
    });
}

// Chame a função para buscar informações sobre Pokémon quando a página for carregada
getPokemonInfo();
