const allSeriesDatabase = {
  marvel: [
    {
      title: "Agatha: Darkhold Diaries",
      embedUrl: "https://www.youtube.com/embed/ZgKizhUuT7E",
      description: "Spin-off de WandaVision com Kathryn Hahn",
      streaming: "Disney+",
      episodes: [
        { date: "18/09/2024", type: "Estreia" },
        { date: "25/09/2024", type: "Novo" },
        { date: "02/10/2024", type: "Novo" }
      ],
      activeUntil: "30/10/2024"
    },
    {
      title: "Echo - Temporada 1",
      imageUrl: "img/echo.jpg",
      description: "Série da heroína indígena Maya Lopez",
      streaming: "Disney+",
      episodes: [
        { date: "09/01/2024", type: "Estreia" },
        { date: "16/01/2024", type: "Final" }
      ],
      activeUntil: "30/01/2024"
    },
    // ... (mantenha as outras séries Marvel)
  ],
  dc: [
    {
      title: "The Penguin",
      imageUrl: "img/penguin.jpg",
      description: "Spin-off de The Batman com Colin Farrell",
      streaming: "Max",
      episodes: [
        { date: "22/10/2024", type: "Estreia" },
        { date: "29/10/2024", type: "Novo" }
      ],
      activeUntil: "30/11/2024"
    },
    // ... (mantenha as outras séries DC)
  ]
};

class SeriesManager {
  constructor() {
    this.updateInterval = 3600000; // 1 hora
    this.episodeValidity = 30; // Dias de permanência após último episódio
    this.init();
  }

  init() {
    this.cleanExpiredContent();
    this.renderAllContent();
    this.setupAutoUpdate();
  }

  parseDate(dateStr) {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  cleanExpiredContent() {
    const today = new Date();
    ['marvel', 'dc'].forEach(universe => {
      allSeriesDatabase[universe] = allSeriesDatabase[universe].filter(series => {
        const lastEpisodeDate = this.parseDate(series.activeUntil);
        return lastEpisodeDate >= today;
      });
    });
  }

  getSeriesStatus(series) {
    const today = new Date();
    const nextEpisode = series.episodes.find(ep => this.parseDate(ep.date) > today);
    const lastEpisodeDate = this.parseDate(series.activeUntil);
    const daysRemaining = Math.ceil((lastEpisodeDate - today) / (1000 * 3600 * 24));

    return {
      isActive: lastEpisodeDate >= today,
      nextEpisode: nextEpisode ? this.parseDate(nextEpisode.date) : null,
      daysRemaining
    };
  }

  createSeriesCard(series) {
    const status = this.getSeriesStatus(series);
    if (!status.isActive) return '';

    return `
      <div class="serie">
        <div class="media-container">
          ${createMediaElement(series)}
          <div class="streaming-info">
            <span class="platform">${series.streaming}</span>
            ${status.nextEpisode ? `
              <div class="countdown">
                <span>Próximo: ${status.nextEpisode.toLocaleDateString('pt-BR')}</span>
                <progress value="${30 - status.daysRemaining}" max="30"></progress>
              </div>
            ` : ''}
          </div>
        </div>
        <h2>${series.title}</h2>
        <p>${series.description}</p>
        <div class="episode-schedule">
          ${series.episodes.map(ep => `
            <div class="episode ${this.parseDate(ep.date) <= new Date() ? 'released' : ''}">
              <span>${ep.type}</span>
              <small>${this.parseDate(ep.date).toLocaleDateString('pt-BR')}</small>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  setupAutoUpdate() {
    setInterval(() => {
      this.cleanExpiredContent();
      this.renderAllContent();
    }, this.updateInterval);
  }

  renderAllContent() {
    const renderSection = (containerId, seriesList) => {
      const container = document.getElementById(containerId);
      container.innerHTML = seriesList
        .map(series => this.createSeriesCard(series))
        .join('') || `<p class="no-series">Nenhuma série disponível</p>`;
    };

    renderSection('marvel-series', allSeriesDatabase.marvel);
    renderSection('dc-series', allSeriesDatabase.dc);
    this.updateTimestamp();
  }

  updateTimestamp() {
    document.getElementById('update-time').textContent = 
      `Última atualização: ${new Date().toLocaleString('pt-BR')}`;
  }
}

// CSS Adicional
.streaming-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.9));
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.platform {
  background: var(--brand-color);
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8em;
}

.episode-schedule {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin-top: 15px;
}

.episode {
  background: #2a2a2a;
  padding: 10px;
  border-radius: 6px;
  text-align: center;
}

.episode.released {
  opacity: 0.6;
}

progress {
  width: 100%;
  height: 5px;
  accent-color: #e62429;
}
