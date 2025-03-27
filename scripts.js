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
      activeUntil: "18/04/2025" // 30 dias após último episódio
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
      imageUrl: "img/legiao_fFpOw0dkBrZR.png",
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
      imageUrl: "img/batman2.png", // Nome de arquivo corrigido
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
      imageUrl: "img/03035154871002.jpg",
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
    }
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
