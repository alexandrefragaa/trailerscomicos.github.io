const allmoviesDatabase = {
  marvel: [
    {
      title: "Thunderbolts",
      embedUrl: [
        "https://www.youtube.com/embed/8OAZI6Q9Qj8",
        "https://www.youtube.com/embed/sXGZbXPjdUs",
        "https://www.youtube.com/embed/LUBixPLbdmQ",
        "https://www.youtube.com/embed/MaLy0D2FTDc",
      ],
      description: "Um grupo de anti-heróis e vilões se une em uma missão secreta que pode mudar o destino do mundo.",
      releaseDate: "01/05/2025"
    },
    {
      title: "Quarteto Fantastico: Novos Passos",
      embedUrl: "https://www.youtube.com/embed/8OAZI6Q9Qj8",
      description: "A primeira família dos quadrinhos chega ao MCU em uma aventura cósmica que redefinirá o futuro do universo.",
      releaseDate: "25/07/2025"
    },
    {
      title: "Blade",
      embedUrl: "https://www.youtube.com/embed/8OAZI6Q9Qj8",
      description: "O caçador de vampiros retorna em um filme sombrio que mergulhará o MCU no sobrenatural.",
      releaseDate: "07/11/2025"
    }
  ],

  dc: [
    {
      title: "Superman: O Legado",
      embedUrl: "https://www.youtube.com/embed/...",
      description: "Nova versão do Superman...",
      releaseDate: "11/07/2025"
    },
    {
    title: "Batman, parte 2",
    embedUrl: "https://www.youtube.com/embed/...",
    description: "Segunda parte da saga sombria de Matt Reeves, com Robert Pattinson retornando como o Batman em um confronto com o Coringa.",
    releaseDate: "03/10/2025"
},
{
    title: "Supergirl : Mulher do Amanhã",
    embedUrl: "https://www.youtube.com/embed/...",
    description: "Baseado na HQ homônima, acompanha Kara Zor-El em uma jornada cósmica repleta de vingança e redenção.",
    releaseDate: "26/12/2025"
  }
]
};

//Função para filtro de datas dos fimes 
function getCurrentMovies() { 
  const today = new Date().toISOString().split('T')[0];

return {
marvel: allmoviesDatabase.marvel.filter(movie => movie.releaseDate >= today),
dc: allmoviesDatabase.dc.filter(movie => movie.releaseDate >= today)
};
}

// Banco de dados dinamico (Filmes futuro)
const MovieDatabase = getCurrentMovies();

//Atualizaçao auto 
console.log("Filmes atualizados:", movieDatabase);