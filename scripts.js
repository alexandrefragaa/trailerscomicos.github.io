// Banco de dados completo das séries
const allSeriesDatabase = {
  marvel: [
    {
      title: "Demolidor: Renascido",
      embedUrl: "https://www.youtube.com/embed/9KZyUQpihsE",
      description: "Demolidor: Renascido vai continuar os fatos de Demolidor na Netflix, novamente com Charlie Cox no papel do herói, além do retorno de outros personagens, como Rei do Crime, Karen Page e o Justiceiro",
      releaseDate: "04/03/2025"
    },
    {
      title: "Coração de Ferro",
      embedUrl: "https://www.youtube.com/embed/OJGFcVfct4Y",
      description: "Após estrear no MCU em Wakanda Para Sempre, Riri Williams retorna neste ano com sua série própria em Coração de Ferro",
      releaseDate: "24/06/2025"
    },
    {
      title: "Olhos de Wakanda",
      imageUrl: "img/wakandaeyes.jpg",
      description: "A série do super-herói Magnum, chega em 2025. Ela será estrelada por Yahya Abdul-Mateen II no papel central.",
      releaseDate: "01/08/2025"
    },
    {
      title: "Marvel Zombies",
      imageUrl: "img/legiao_fFpOw0dkBrZR.png",
      description: "Marvel Zombies será uma mini animada em quatro episódios, situada em uma realidade alternativa do MCU. A série terá protagonistas como Guardião Vermelho, Feiticeira Escarlate, Shang-Chi, Kate Bishop e mais.",
      releaseDate: "03/10/2025"
    },
    {
      title: "Wonder Man",
      imageUrl: "img/WONDERMAN.jpg",
      description: "A série do super-herói Magnum, chega em 2025. Ela será estrelada por Yahya Abdul-Mateen II no papel central.",
      releaseDate: "01/12/2025"
    },
    {
      title: "Visão",
      imageUrl: "img/visao.jpg",
      description: "Spin-off de WandaVision acompanhando a jornada do androide Visão após os eventos da série.",
      releaseDate: "01/01/2026"
    }
  ],
  dc: [
    {
      title: "Pacificador - Temporada 2",
      embedUrl: "https://www.youtube.com/embed/OJGFcVfct4Y",
      description: "Esquadrão militar formado por criaturas sobrenaturais em missões especiais.",
      releaseDate: "01/08/2025"
    },
    {
      title: "Supergirl: Mulher do Amanhã",
      imageUrl: "img/supergirl.jpg",
      description: "Conta com a presença de Krypto o Supercão, Supergirl ajuda Ruthye a perseguir Krem pelas estrelas depois que o bandido mata o pai da garota",
      releaseDate: "26/06/2026"
    },
    {
      title: "Batman 2",
      imageUrl: "img/Captura de tela 2024-08-13 085730.png",
      description: "Segunda parte da saga sombria de Matt Reeves, com Robert Pattinson retornando como o Batman em um confronto com o Coringa.",
      releaseDate: "26/06/2026"
    },
    {
      title: "Cara de Barro",
      imageUrl: "img/03035154871002.jpg",
      description: "É um personagem fictício, supervilão inimigo do Batman que teve seu corpo transformado em uma matéria argilosa. Existiram diversas identidades, com a mais conhecida sendo Basil Karlo",
      releaseDate: "26/09/2026"
    },
    {
      title: "Lanterns",
      imageUrl: "img/lanterns.jpg",
      description: "Série que reúne todos os Lanternas Verdes.",
      releaseDate: "01/01/2026"
    }
  ]
};

// Função para criar elemento de mídia
function createMediaElement(series) {
  if (series.embedUrl) {
    return `<iframe src="${series.embedUrl}" allowfullscreen title="${series.title}"></iframe>`;
  } else if (series.imageUrl) {
    return `<img src="${series.imageUrl}" alt="${series.title}">`;
  }
  return '<div class="no-media">Sem mídia disponível</div>';
}

// Classe para gerenciar as séries
class SeriesManager {
  constructor() {
    this.updateFrequency = 60000; // 1 minuto para testes (mude para 86400000 = 24h)
    this.init();
  }

  init() {
    this.renderAllSeries();
    this.setupAutoUpdate();
  }

  parseDate(dateStr) {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day || 1);
  }

  renderAllSeries() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignora horas/minutos
    
    // Render Marvel
    const marvelContainer = document.getElementById('marvel-series');
    marvelContainer.innerHTML = allSeriesDatabase.marvel
      .filter(series => this.parseDate(series.releaseDate) >= today)
      .map(series => this.createSeriesCard(series))
      .join('') || '<p class="no-series">Nenhuma série Marvel em breve</p>';
    
    // Render DC
    const dcContainer = document.getElementById('dc-series');
    dcContainer.innerHTML = allSeriesDatabase.dc
      .filter(series => this.parseDate(series.releaseDate) >= today)
      .map(series => this.createSeriesCard(series))
      .join('') || '<p class="no-series">Nenhuma série DC em breve</p>';
    
    this.updateTimestamp();
  }

  createSeriesCard(series) {
    return `
      <div class="serie">
        <div class="media-container">
          ${createMediaElement(series)}
        </div>
        <h2>${series.title}</h2>
        <p>${series.description}</p>
        <p class="release-date">Data de lançamento: ${series.releaseDate}</p>
      </div>
    `;
  }

  setupAutoUpdate() {
    setInterval(() => this.renderAllSeries(), this.updateFrequency);
  }

  updateTimestamp() {
    document.getElementById('update-time').textContent = new Date().toLocaleString('pt-BR');
  }
}

// Inicialização com tratamento de erros
document.addEventListener('DOMContentLoaded', () => {
  try {
    new SeriesManager();
    console.log('Sistema iniciado com sucesso!');
  } catch (error) {
    console.error('Erro ao iniciar:', error);
    document.getElementById('marvel-series').innerHTML = 
      '<p class="error">Erro ao carregar séries Marvel</p>';
    document.getElementById('dc-series').innerHTML = 
      '<p class="error">Erro ao carregar séries DC</p>';
  }
});
