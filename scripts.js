// Banco de dados completo de filmes
const allMoviesDatabase = {
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
      title: "Supergirl: Mulher do Amanhã",
      embedUrl: "https://www.youtube.com/embed/...",
      description: "Baseado na HQ homônima, acompanha Kara Zor-El em uma jornada cósmica repleta de vingança e redenção.",
      releaseDate: "26/12/2025"
    }
  ]
};

// Função para converter data no formato DD/MM/YYYY para objeto Date
function parseDate(dateString) {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
}

// Função para filtrar filmes futuros
function getCurrentMovies() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Remove a hora para comparação apenas de datas

  return {
    marvel: allMoviesDatabase.marvel.filter(movie => {
      const releaseDate = parseDate(movie.releaseDate);
      return releaseDate >= today;
    }),
    dc: allMoviesDatabase.dc.filter(movie => {
      const releaseDate = parseDate(movie.releaseDate);
      return releaseDate >= today;
    })
  };
}

// Banco de dados dinâmico (apenas filmes futuros)
let movieDatabase = getCurrentMovies();

// Função para renderizar os filmes na página
function renderMovies() {
  movieDatabase = getCurrentMovies(); // Atualiza o banco de dados
  
  const marvelContainer = document.getElementById('marvel-movies');
  const dcContainer = document.getElementById('dc-movies');
  
  // Limpa os containers
  marvelContainer.innerHTML = '';
  dcContainer.innerHTML = '';
  
  // Renderiza filmes da Marvel
  movieDatabase.marvel.forEach(movie => {
    const trailerUrl = Array.isArray(movie.embedUrl) ? movie.embedUrl[0] : movie.embedUrl;
    
    const movieElement = document.createElement('div');
    movieElement.className = 'filme';
    movieElement.innerHTML = `
      <h2>${movie.title}</h2>
      <iframe src="${trailerUrl}" allowfullscreen></iframe>
      <p>${movie.description}</p>
      <p>Data de lançamento: ${movie.releaseDate}</p>
    `;
    marvelContainer.appendChild(movieElement);
  });
  
  // Renderiza filmes da DC
  movieDatabase.dc.forEach(movie => {
    const trailerUrl = Array.isArray(movie.embedUrl) ? movie.embedUrl[0] : movie.embedUrl;
    
    const movieElement = document.createElement('div');
    movieElement.className = 'filme';
    movieElement.innerHTML = `
      <h2>${movie.title}</h2>
      <iframe src="${trailerUrl}" allowfullscreen></iframe>
      <p>${movie.description}</p>
      <p>Data de lançamento: ${movie.releaseDate}</p>
    `;
    dcContainer.appendChild(movieElement);
  });
}

// Atualiza automaticamente a cada dia (86400000 ms = 1 dia)
setInterval(renderMovies, 86400000);

// Renderiza os filmes quando a página carrega
window.addEventListener('DOMContentLoaded', renderMovies);
