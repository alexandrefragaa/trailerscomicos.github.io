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
    this.currentFilter = 'current';
    this.selectedPlatform = 'all';
    this.init();
  }

  init() {
    this.setupFilters();
    this.setupPlatformFilters();
    this.renderAllContent();
    this.setupAutoUpdate();
  }

  setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.dataset.filter;
        this.renderAllContent();
      });
    });
  }

  setupPlatformFilters() {
    document.querySelectorAll('.platform-badge').forEach(badge => {
      badge.addEventListener('click', () => {
        document.querySelectorAll('.platform-badge').forEach(b => b.classList.remove('active'));
        badge.classList.add('active');
        this.selectedPlatform = badge.textContent.trim() === 'Todas' ? 'all' : badge.textContent.trim();
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

    return {
      isCurrent: today >= firstEpisodeDate && today <= lastEpisodeDate,
      isNextMonths: firstEpisodeDate > today && firstEpisodeDate <= threeMonthsFromNow,
      isNextYears: firstEpisodeDate.getFullYear() > today.getFullYear()
    };
  }

  filterSeries(series) {
    const status = this.getSeriesStatus(series);
    const platformMatch = this.selectedPlatform === 'all' || 
                         series.streaming === this.selectedPlatform;

    switch(this.currentFilter) {
      case 'current': return status.isCurrent && platformMatch;
      case 'next-months': return status.isNextMonths && platformMatch;
      default: return platformMatch;
    }
  }

  createSeriesCard(series) {
    const status = this.getSeriesStatus(series);
    const platformClass = `platform-${series.streaming.toLowerCase().replace(/\+/g, 'plus')}`;

    return `
      <div class="serie ${platformClass}">
        <div class="serie-header">
          <div class="platform-tag ${platformClass}">${series.streaming}</div>
          <div class="status-indicator">
            ${status.isCurrent ? '<span class="current-badge">No Ar</span>' : ''}
            ${status.isNextMonths ? '<span class="upcoming-badge">Em Breve</span>' : ''}
            ${status.isNextYears ? `<span class="future-badge">${new Date(series.episodes[0].date).getFullYear()}</span>` : ''}
          </div>
        </div>
        
        <div class="media-container">
          ${series.embedUrl ? 
            `<iframe src="${series.embedUrl}" allowfullscreen title="${series.title}"></iframe>` : 
            `<img src="${series.imageUrl}" alt="${series.title}">`}
        </div>

        <div class="serie-info">
          <h2>${series.title}</h2>
          <div class="timeline">
            ${series.episodes.map(ep => `
              <div class="timeline-item ${this.parseDate(ep.date) <= new Date() ? 'aired' : ''}">
                <div class="timeline-point"></div>
                <div class="timeline-content">
                  <span>${ep.type}</span>
                  <small>${this.parseDate(ep.date).toLocaleDateString('pt-BR')}</small>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderAllContent() {
    const renderSection = (containerId, seriesList) => {
      const container = document.getElementById(containerId);
      container.innerHTML = seriesList
        .filter(series => this.filterSeries(series))
        .map(series => this.createSeriesCard(series))
        .join('') || `<p class="no-series">Nenhuma série encontrada</p>`;
    };

    renderSection('marvel-series', allSeriesDatabase.marvel);
    renderSection('dc-series', allSeriesDatabase.dc);
    this.updateTimestamp();
  }

  setupAutoUpdate() {
    setInterval(() => {
      this.renderAllContent();
    }, 3600000); // Atualiza a cada hora
  }

  updateTimestamp() {
    document.getElementById('update-time').textContent = 
      new Date().toLocaleString('pt-BR');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    new SeriesManager();
  } catch (error) {
    console.error('Erro ao iniciar:', error);
    document.querySelectorAll('.series-grid').forEach(container => {
      container.innerHTML = '<p class="error">Erro ao carregar conteúdo</p>';
    });
  }
});
