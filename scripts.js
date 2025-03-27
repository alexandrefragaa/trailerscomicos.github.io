const allSeriesDatabase = {
  marvel: [
    {
      title: "Demolidor: Renascido",
      embedUrl: "https://www.youtube.com/embed/9KZyUQpihsE",
      description: "Continuação da série do Demolidor com Charlie Cox",
      streaming: "Disney+",
      episodes: [
        { date: "04/03/2025", type: "Estreia" },
        { date: "11/03/2025", type: "Novo" },
        { date: "18/03/2025", type: "Final" }
      ],
      activeUntil: "18/04/2025"
    },
    {
      title: "Coração de Ferro",
      embedUrl: "https://www.youtube.com/embed/OoKSKzqpPy4",
      description: "A jornada de Riri Williams como nova heroína tecnológica",
      streaming: "Disney+",
      episodes: [
        { date: "24/06/2025", type: "Estreia" },
        { date: "01/07/2025", type: "Novo" },
        { date: "08/07/2025", type: "Final" }
      ],
      activeUntil: "08/08/2025"
    },
    {
      title: "Olhos de Wakanda",
      imageUrl: "img/wakandaeyes.jpg",
      description: "Aventuras do super-herói wakandano",
      streaming: "Disney+",
      episodes: [
        { date: "01/08/2025", type: "Estreia" },
        { date: "08/08/2025", type: "Novo" }
      ],
      activeUntil: "08/09/2025"
    },
    {
      title: "Marvel Zombies",
      imageUrl: "img/marvel-zombies.jpg",
      description: "Universo alternativo zumbi do MCU",
      streaming: "Disney+",
      episodes: [
        { date: "03/10/2025", type: "Estreia" },
        { date: "10/10/2025", type: "Final" }
      ],
      activeUntil: "10/11/2025"
    },
    {
      title: "Wonder Man",
      imageUrl: "img/WONDERMAN.jpg",
      description: "As aventuras do herói cinematográfico Simon Williams",
      streaming: "Disney+",
      episodes: [
        { date: "01/12/2025", type: "Estreia" },
        { date: "08/12/2025", type: "Novo" }
      ],
      activeUntil: "08/01/2026"
    },
    {
      title: "Visão",
      imageUrl: "img/visao.jpg",
      description: "Jornada do androide após WandaVision",
      streaming: "Disney+",
      episodes: [
        { date: "01/01/2026", type: "Estreia" },
        { date: "08/01/2026", type: "Novo" }
      ],
      activeUntil: "08/02/2026"
    }
  ],
  dc: [
    {
      title: "Pacificador - Temporada 2",
      embedUrl: "https://www.youtube.com/embed/OJGFcVfct4Y",
      description: "As novas missões do anti-herói interpretado por John Cena",
      streaming: "Max",
      episodes: [
        { date: "01/08/2025", type: "Estreia" },
        { date: "08/08/2025", type: "Novo" }
      ],
      activeUntil: "08/09/2025"
    },
    {
      title: "Supergirl: Mulher do Amanhã",
      imageUrl: "img/supergirl.jpg",
      description: "Novas aventuras cósmicas da Supergirl",
      streaming: "Max",
      episodes: [
        { date: "26/06/2026", type: "Estreia" },
        { date: "03/07/2026", type: "Novo" }
      ],
      activeUntil: "03/08/2026"
    },
    {
      title: "Batman 2",
      imageUrl: "img/batman2.jpg",
      description: "Continuação da saga do Batman de Matt Reeves",
      streaming: "Max",
      episodes: [
        { date: "26/06/2026", type: "Estreia" },
        { date: "03/07/2026", type: "Novo" }
      ],
      activeUntil: "03/08/2026"
    },
    {
      title: "Cara de Barro",
      imageUrl: "img/cara-de-barro.jpg",
      description: "A origem do vilão argiloso de Gotham",
      streaming: "Max",
      episodes: [
        { date: "26/09/2026", type: "Estreia" },
        { date: "03/10/2026", type: "Novo" }
      ],
      activeUntil: "03/11/2026"
    },
    {
      title: "Lanterns",
      imageUrl: "img/lanterns.jpg",
      description: "A equipe dos Lanternas Verdes em ação",
      streaming: "Max",
      episodes: [
        { date: "01/01/2026", type: "Estreia" },
        { date: "08/01/2026", type: "Novo" }
      ],
      activeUntil: "08/02/2026"
    },
    {
      title: "Esquadrão Suicida: Renascimento",
      embedUrl: "https://www.youtube.com/embed/kg_jH3uIgMs",
      description: "Nova formação do Esquadrão Suicida",
      streaming: "Max",
      episodes: [
        { date: "15/03/2026", type: "Estreia" },
        { date: "22/03/2026", type: "Novo" }
      ],
      activeUntil: "22/04/2026"
    }
  ]
};

class SeriesManager {
  constructor() {
    this.currentFilter = 'all';
    this.selectedPlatform = 'all';
    this.init();
  }

  init() {
    // Ativar filtros padrão
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
    document.querySelector('.platform-badge[data-platform="all"]').classList.add('active');
    
    this.setupFilters();
    this.setupPlatformFilters();
    this.renderAllContent();
  }

  setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.dataset.filter;
        this.renderAllContent();
      });
    });
  }

  setupPlatformFilters() {
    const platformBadges = document.querySelectorAll('.platform-badge');
    platformBadges.forEach(badge => {
      badge.addEventListener('click', () => {
        platformBadges.forEach(b => b.classList.remove('active'));
        badge.classList.add('active');
        this.selectedPlatform = badge.dataset.platform;
        this.renderAllContent();
      });
    });
  }

  parseDate(dateStr) {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  getSeriesStatus(series) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const firstEpisodeDate = this.parseDate(series.episodes[0].date);
    const lastEpisodeDate = this.parseDate(series.activeUntil);

    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

    // Verifica se está no ar (este mês)
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const currentMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    return {
      isCurrent: (today >= firstEpisodeDate && today <= lastEpisodeDate) || 
                (firstEpisodeDate >= currentMonthStart && firstEpisodeDate <= currentMonthEnd),
      isNextMonths: firstEpisodeDate > today && firstEpisodeDate <= threeMonthsFromNow,
      isAll: true // Para o filtro "Todas"
    };
  }

  filterSeries(series) {
    const status = this.getSeriesStatus(series);
    
    // Filtro por plataforma
    const platformMatch = this.selectedPlatform === 'all' || 
                         series.streaming.toLowerCase().includes(this.selectedPlatform.toLowerCase());

    // Filtro por status
    switch(this.currentFilter) {
      case 'current': 
        return status.isCurrent && platformMatch;
      case 'next-months': 
        return status.isNextMonths && platformMatch;
      case 'all':
      default:
        return platformMatch;
    }
  }

  createSeriesCard(series) {
    const status = this.getSeriesStatus(series);
    const platformClass = series.streaming.toLowerCase().replace('+', '-plus');

    return `
      <div class="serie">
        <div class="serie-header">
          <div class="platform-tag ${platformClass}">${series.streaming}</div>
          <div class="status-indicator">
            ${status.isCurrent ? '<span class="current-badge">No Ar</span>' : ''}
            ${status.isNextMonths ? '<span class="upcoming-badge">Em Breve</span>' : ''}
            ${status.isNextYears ? '<span class="future-badge">Próximo Ano</span>' : ''}
          </div>
        </div>
        
        <div class="media-container">
          ${series.embedUrl ? 
            `<iframe src="${series.embedUrl}" frameborder="0" allowfullscreen></iframe>` : 
            `<img src="${series.imageUrl || 'https://via.placeholder.com/300x169?text=Poster+Indispon%C3%ADvel'}" alt="${series.title}">`}
        </div>

        <div class="serie-info">
          <h3>${series.title}</h3>
          <p>${series.description}</p>
          <div class="timeline">
            ${series.episodes.map(ep => {
              const episodeDate = this.parseDate(ep.date);
              const isAired = episodeDate <= new Date();
              return `
                <div class="timeline-item ${isAired ? 'aired' : ''}">
                  <div class="timeline-point"></div>
                  <div class="timeline-content">
                    <span>${ep.type}</span>
                    <small>${episodeDate.toLocaleDateString('pt-BR')}</small>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderAllContent() {
    const renderSection = (containerId, seriesList) => {
      const container = document.getElementById(containerId);
      const filteredSeries = seriesList.filter(series => this.filterSeries(series));
      
      container.innerHTML = filteredSeries.length > 0 
        ? filteredSeries.map(series => this.createSeriesCard(series)).join('')
        : '<p class="no-series">Nenhuma série encontrada com esses filtros</p>';
    };

    renderSection('marvel-series', allSeriesDatabase.marvel);
    renderSection('dc-series', allSeriesDatabase.dc);
    this.updateTimestamp();
  }

  updateTimestamp() {
    document.getElementById('update-time').textContent = 
      new Date().toLocaleString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SeriesManager();
});
