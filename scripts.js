class SeriesManager {
  constructor() {
    this.currentFilter = 'current';
    this.init();
  }

  init() {
    this.setupFilters();
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

  getSeriesStatus(series) {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const episodeDates = series.episodes.map(ep => this.parseDate(ep.date));
    const lastEpisodeDate = Math.max(...episodeDates);
    const firstEpisodeDate = Math.min(...episodeDates);

    return {
      isCurrent: new Date(firstEpisodeDate).getMonth() === currentMonth &&
                 new Date(firstEpisodeDate).getFullYear() === currentYear,
      isNextMonths: new Date(firstEpisodeDate) > today &&
                   (new Date(firstEpisodeDate).getTime() - today) < 7776000000, // 3 meses
      isNextYears: new Date(firstEpisodeDate).getFullYear() > currentYear
    };
  }

  filterSeries(series) {
    const status = this.getSeriesStatus(series);
    
    switch(this.currentFilter) {
      case 'current':
        return status.isCurrent;
      case 'next-months':
        return status.isNextMonths;
      case 'next-years':
        return status.isNextYears;
      default:
        return true;
    }
  }

  createSeriesCard(series, universe) {
    const status = this.getSeriesStatus(series);
    const platformClass = `platform-${series.streaming.toLowerCase().replace(/ /g, '-')}`;

    return `
      <div class="serie ${platformClass}">
        <div class="serie-header">
          <div class="platform-tag ${platformClass}">${series.streaming}</div>
          <div class="status-indicator">
            ${status.isCurrent ? '<span class="current-badge">No Ar</span>' : ''}
            ${status.isNextMonths ? '<span class="upcoming-badge">Em Breve</span>' : ''}
            ${status.isNextYears ? '<span class="future-badge">${new Date(series.episodes[0].date).getFullYear()}</span>' : ''}
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
              <div class="timeline-item ${this.parseDate(ep.date) <= Date.now() ? 'aired' : ''}">
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
    const renderSection = (containerId, seriesList, universe) => {
      const container = document.getElementById(containerId);
      container.className = `series-grid universe-${universe}`;
      container.innerHTML = seriesList
        .filter(series => this.filterSeries(series))
        .map(series => this.createSeriesCard(series, universe))
        .join('') || `<p class="no-series">Nenhuma série encontrada</p>`;
    };

    renderSection('marvel-series', allSeriesDatabase.marvel, 'marvel');
    renderSection('dc-series', allSeriesDatabase.dc, 'dc');
    this.updateTimestamp();
  }

  // ... (mantenha os outros métodos)
}

// CSS Adicional para Timeline
.timeline {
  position: relative;
  margin: 20px 0;
  padding-left: 20px;
}

.timeline-item {
  position: relative;
  margin-bottom: 15px;
  padding-left: 20px;
}

.timeline-point {
  position: absolute;
  left: -8px;
  top: 5px;
  width: 12px;
  height: 12px;
  background: #444;
  border-radius: 50%;
}

.timeline-item.aired .timeline-point {
  background: #e62429;
}

.timeline-content {
  background: #2a2a2a;
  padding: 10px;
  border-radius: 6px;
}

.current-badge {
  background: #00c853;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.8em;
}

.upcoming-badge {
  background: #ffd600;
  color: #000;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.8em;
}

.future-badge {
  background: #0476f2;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.8em;
}
