// 1. BANCO DE DADOS COMPLETO
const allSeriesDatabase = {
  marvel: [
    {
      title: "Demolidor: Renascido",
      embedUrl: "https://www.youtube.com/embed/9KZyUQpihsE",
      imageUrl: "img/demolidor.jpg",
      description: "Continuação dos eventos de Demolidor na Netflix com Charlie Cox retornando como o herói.",
      releaseDate: "04/03/2025"
    },
    {
      title: "Coração de Ferro",
      embedUrl: "https://www.youtube.com/embed/OoKSKzqpPy4",
      imageUrl: "img/coracao-ferro.jpg",
      description: "Riri Williams retorna com sua série própria após Wakanda Para Sempre.",
      releaseDate: "24/06/2025"
    }
  ],
  dc: [
    {
      title: "Pacificador - Temporada 2",
      embedUrl: "https://www.youtube.com/embed/OJGFcVfct4Y",
      imageUrl: "img/pacificador.jpeg",
      description: "Esquadrão militar formado por criaturas sobrenaturais em missões especiais.",
      releaseDate: "08/2025"
    }
  ]
};

// 2. SISTEMA DE RENDERIZAÇÃO CORRIGIDO
class SeriesManager {
  constructor() {
    this.updateFrequency = 5000; // 5 segundos para teste (altere para 86400000 = 24h)
    this.init();
  }

  init() {
    this.renderSeries();
    this.setupAutoUpdate();
  }

  getUpcomingSeries() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignora horas/minutos
    
    return {
      marvel: allSeriesDatabase.marvel.filter(series => 
        !this.isReleased(series.releaseDate, today)
      ,
      dc: allSeriesDatabase.dc.filter(series => 
        !this.isReleased(series.releaseDate, today)
    };
  }

  isReleased(releaseDate, today) {
    return this.parseDate(releaseDate) <= today;
  }

  parseDate(dateStr) {
    const parts = dateStr.split('/');
    // Formato DD/MM/YYYY
    if (parts.length === 3) {
      return new Date(parts[2], parts[1]-1, parts[0]);
    }
    // Formato MM/YYYY
    if (parts.length === 2) {
      return new Date(parts[1], parts[0]-1, 1);
    }
    // Formato YYYY
    return new Date(parts[0], 0, 1);
  }

  createMediaElement(series) {
    if (series.embedUrl) {
      return `<iframe src="${series.embedUrl}" allowfullscreen></iframe>`;
    }
    return `<img src="${series.imageUrl}" alt="${series.title}">`;
  }

  renderSeries() {
    const { marvel, dc } = this.getUpcomingSeries();
    
    // Debug no console
    console.log("Séries Marvel:", marvel);
    console.log("Séries DC:", dc);
    
    document.getElementById('marvel-series').innerHTML = 
      marvel.map(series => this.createSeriesCard(series)).join('') || 
      '<p class="no-series">Nenhuma série Marvel em breve</p>';
    
    document.getElementById('dc-series').innerHTML = 
      dc.map(series => this.createSeriesCard(series)).join('') || 
      '<p class="no-series">Nenhuma série DC em breve</p>';
    
    this.updateTimestamp();
  }

  createSeriesCard(series) {
    return `
      <div class="serie">
        <h2>${series.title}</h2>
        <div class="media-container">
          ${this.createMediaElement(series)}
        </div>
        <p>${series.description}</p>
        <p class="release-date">Lançamento: ${series.releaseDate}</p>
      </div>
    `;
  }

  setupAutoUpdate() {
    setInterval(() => {
      console.log("Atualizando automaticamente...");
      this.renderSeries();
    }, this.updateFrequency);
  }

  updateTimestamp() {
    const now = new Date();
    document.getElementById('update-time').textContent = 
      `${now.toLocaleDateString()} às ${now.toLocaleTimeString()}`;
  }
}

// 3. INICIALIZAÇÃO (COM VERIFICAÇÃO DE ERROS)
document.addEventListener('DOMContentLoaded', () => {
  try {
    new SeriesManager();
    console.log("Sistema iniciado com sucesso!");
  } catch (error) {
    console.error("Erro ao iniciar:", error);
    document.getElementById('marvel-series').innerHTML = 
      '<p class="error">Erro ao carregar séries Marvel</p>';
    document.getElementById('dc-series').innerHTML = 
      '<p class="error">Erro ao carregar séries DC</p>';
  }
});
