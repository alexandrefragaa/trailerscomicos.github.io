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
        this.currentFilters = {
            platform: 'all',
            status: 'active'
        };
        this.init();
    }

    init() {
        this.setupFilters();
        this.updateContent();
        this.setupAutoUpdate();
    }

    setupFilters() {
        document.getElementById('filter-platform').addEventListener('change', (e) => {
            this.currentFilters.platform = e.target.value;
            this.renderAllContent();
        });

        document.getElementById('filter-status').addEventListener('change', (e) => {
            this.currentFilters.status = e.target.value;
            this.renderAllContent();
        });
    }

    parseDate(dateStr) {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
    }

    getSeriesStatus(series) {
        const today = new Date();
        const startDate = this.parseDate(series.episodes[0].date);
        const endDate = this.parseDate(series.activeUntil);
        const totalEpisodes = series.episodes.length;
        const releasedEpisodes = series.episodes.filter(ep => 
            this.parseDate(ep.date) <= today
        ).length;

        return {
            isUpcoming: startDate > today,
            isActive: today >= startDate && today <= endDate,
            isEnded: today > endDate,
            progress: (releasedEpisodes / totalEpisodes) * 100,
            daysUntilStart: Math.ceil((startDate - today) / (1000 * 3600 * 24))
        };
    }

    createSeriesCard(series) {
        const status = this.getSeriesStatus(series);
        
        // Aplicar filtros
        if(this.currentFilters.platform !== 'all' && series.streaming !== this.currentFilters.platform) return '';
        if(this.currentFilters.status === 'active' && !status.isActive) return '';
        if(this.currentFilters.status === 'upcoming' && !status.isUpcoming) return '';

        return `
            <div class="serie">
                <div class="serie-header">
                    <div class="platform-tag">${series.streaming}</div>
                    ${status.isUpcoming ? `
                        <div class="status-tag upcoming">
                            Estreia em ${status.daysUntilStart} dias
                        </div>
                    ` : ''}
                    ${status.isEnded ? `
                        <div class="status-tag ended">
                            Concluída
                        </div>
                    ` : ''}
                </div>

                <div class="media-container">
                    ${series.embedUrl ? 
                        `<iframe src="${series.embedUrl}" allowfullscreen title="${series.title}"></iframe>` : 
                        `<img src="${series.imageUrl}" alt="${series.title}">`}
                </div>

                <div class="serie-info">
                    <h2>${series.title}</h2>
                    <p>${series.description}</p>
                    
                    <div class="progress-bar">
                        <div class="progress" style="width: ${status.progress}%"></div>
                    </div>

                    <div class="episode-schedule">
                        ${series.episodes.map((ep, index) => `
                            <div class="episode ${this.parseDate(ep.date) <= new Date() ? 'released' : ''}">
                                <span>Ep. ${index + 1} - ${ep.type}</span>
                                <small>${this.parseDate(ep.date).toLocaleDateString('pt-BR')}</small>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    updateContent() {
        const today = new Date();
        
        // Atualização automática do catálogo
        ['marvel', 'dc'].forEach(universe => {
            allSeriesDatabase[universe] = allSeriesDatabase[universe]
                .filter(series => this.parseDate(series.activeUntil) >= today)
                .sort((a, b) => this.parseDate(a.episodes[0].date) - this.parseDate(b.episodes[0].date));
        });

        this.renderAllContent();
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

    setupAutoUpdate() {
        setInterval(() => {
            this.updateContent();
        }, this.updateInterval);
    }

    updateTimestamp() {
        document.getElementById('update-time').textContent = 
            `Atualizado em: ${new Date().toLocaleString('pt-BR')}`;
    }
}

// Inicialização
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
