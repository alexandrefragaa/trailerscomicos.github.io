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
    },
    // Novos filmes adicionados do HTML
    {
      title: "Demolidor: Renascido",
      embedUrl: "https://www.youtube.com/embed/9KZyUQpihsE",
      description: "Continuação dos eventos de Demolidor na Netflix com Charlie Cox retornando como o herói.",
      releaseDate: "04/03/2025"
    },
    {
      title: "Coração de Ferro",
      embedUrl: "https://www.youtube.com/embed/OoKSKzqpPy4",
      description: "Riri Williams retorna com sua série própria após Wakanda Para Sempre.",
      releaseDate: "24/06/2025"
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
    },
    // Novos filmes adicionados do HTML
    {
      title: "Pacificador - Temporada 2",
      embedUrl: "https://www.youtube.com/embed/OJGFcVfct4Y",
      description: "Esquadrão militar formado por criaturas sobrenaturais em missões especiais.",
      releaseDate: "08/2025"
    },
    {
      title: "Lanterns",
      imageUrl: "img/lanterns.jpg",
      description: "Série que reúne todos os Lanternas Verdes.",
      releaseDate: "2026"
    }
  ]
};

// 2. FUNÇÕES DE MANIPULAÇÃO DE DATA
function parseDate(dateStr) {
  // Converte datas nos formatos: DD/MM/YYYY, MM/YYYY ou YYYY
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    return new Date(parts[2], parts[1] - 1, parts[0]); // DD/MM/YYYY
  } else if (parts.length === 2) {
    return new Date(parts[1], parts[0] - 1, 1); // MM/YYYY
  } else {
    return new Date(parts[0], 0, 1); // YYYY
  }
}

function isMovieReleased(releaseDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Ignora horas/minutos
  return parseDate(releaseDate) <= today;
}

// 3. SISTEMA DE ATUALIZAÇÃO AUTOMÁTICA
class MovieManager {
  constructor() {
    this.updateFrequency = 24 * 60 * 60 * 1000; // 24 horas
    this.init();
  }

  init() {
    this.renderMovies();
    this.setupAutoUpdate();
    this.updateTimestamp();
  }

  getUpcomingMovies() {
    return {
      marvel: allMoviesDatabase.marvel.filter(m => !isMovieReleased(m.releaseDate)),
      dc: allMoviesDatabase.dc.filter(m => !isMovieReleased(m.releaseDate))
    };
  }

  renderMovies() {
    const { marvel, dc } = this.getUpcomingMovies();
    
    // Renderização Marvel
    const marvelContainer = document.getElementById('marvel-movies');
    marvelContainer.innerHTML = marvel.map(movie => this.createMovieCard(movie)).join('');
    
    // Renderização DC
    const dcContainer = document.getElementById('dc-movies');
    dcContainer.innerHTML = dc.map(movie => this.createMovieCard(movie)).join('');
  }

  createMovieCard(movie) {
    const mediaContent = movie.embedUrl 
      ? `<iframe src="${Array.isArray(movie.embedUrl) ? movie.embedUrl[0] : movie.embedUrl}" allowfullscreen></iframe>`
      : `<img src="${movie.imageUrl}" alt="${movie.title}">`;

    return `
      <div class="movie-card">
        <h2>${movie.title}</h2>
        ${mediaContent}
        <p>${movie.description}</p>
        <p class="release-date">Lançamento: ${movie.releaseDate}</p>
      </div>
    `;
  }

  setupAutoUpdate() {
    setInterval(() => {
      this.renderMovies();
      this.updateTimestamp();
    }, this.updateFrequency);
  }

  updateTimestamp() {
    document.getElementById('update-time').textContent = new Date().toLocaleString();
  }
}

// 4. INICIALIZAÇÃO DO SISTEMA
document.addEventListener('DOMContentLoaded', () => {
  new MovieManager();
});
