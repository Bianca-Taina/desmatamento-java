const dadosBiomas = [
    {
        id: "amazonia",
        nome: "Amazônia",
        risco: "Crítico",
        classeRisco: "risco-critico",
        regioesCriticas: "Arco do Desmatamento (Sul do Amazonas, Pará, Rondônia e Norte do Mato Grosso)",
        principalVetor: "Grilagem de terras públicas, pastagens ilegais, garimpo e abertura de estradas clandestinas.",
        monitoramento: "Satélites DETER e PRODES (INPE) em tempo diário.",
        participacaoAlerta: 48
    },
    {
        id: "cerrado",
        nome: "Cerrado",
        risco: "Crítico",
        classeRisco: "risco-critico",
        regioesCriticas: "Região do MATOPIBA (Maranhão, Tocantins, Piauí e Bahia) e Oeste da Bahia",
        principalVetor: "Expansão da fronteira agrícola (soja, milho e algodão) e conversão de vegetação nativa.",
        monitoramento: "DETER Cerrado (INPE) e MapBiomas Alerta.",
        participacaoAlerta: 38
    },
    {
        id: "pantanal",
        nome: "Pantanal",
        risco: "Alto",
        classeRisco: "risco-alto",
        regioesCriticas: "Corumbá (MS), Poconé e Cáceres (MT)",
        principalVetor: "Incêndios florestais agravados por secas extremas e abertura de áreas para pecuária.",
        monitoramento: "Programa Queimadas (INPE) e MapBiomas Fogo.",
        participacaoAlerta: 6
    },
    {
        id: "caatinga",
        nome: "Caatinga",
        risco: "Alto",
        classeRisco: "risco-alto",
        regioesCriticas: "Sertão da Bahia, Ceará, Pernambuco e Piauí",
        principalVetor: "Extração ilegal de lenha nativa, sobrepastoreio e risco severo de desertificação.",
        monitoramento: "MapBiomas Alerta e monitoramento de desertificação.",
        participacaoAlerta: 5
    },
    {
        id: "mata-atlantica",
        nome: "Mata Atlântica",
        risco: "Moderado",
        classeRisco: "risco-moderado",
        regioesCriticas: "Sudoeste da Bahia, Norte de Minas Gerais e Paraná",
        principalVetor: "Expansão urbana desordenada, especulação imobiliária e pequenos cortes ilegais.",
        monitoramento: "Atlas da Mata Atlântica (SOS Mata Atlântica / INPE).",
        participacaoAlerta: 3
    }
];

const painelGrid = document.getElementById("painel-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderizarPainel(filtro) {
    painelGrid.innerHTML = "";

    const biomasFiltrados = filtro === "todos" 
        ? dadosBiomas 
        : dadosBiomas.filter(b => b.id === filtro);

    biomasFiltrados.forEach(bioma => {
        const card = document.createElement("div");
        card.classList.add("monitor-card");

        card.innerHTML = `
            <div>
                <div class="monitor-header">
                    <h3>${bioma.nome}</h3>
                    <span class="badge-risco ${bioma.classeRisco}">Alerta ${bioma.risco}</span>
                </div>
                <p class="monitor-detail"><strong>📍 Onde ocorre mais:</strong> ${bioma.regioesCriticas}</p>
                <p class="monitor-detail"><strong>⚠️ Principal causa:</strong> ${bioma.principalVetor}</p>
                <p class="monitor-detail"><strong>🛰️ Sistema ativo:</strong> ${bioma.monitoramento}</p>
            </div>
            <div class="progress-container">
                <div class="progress-label">
                    <span>Fatia aproximada dos alertas no país</span>
                    <span>${bioma.participacaoAlerta}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${bioma.participacaoAlerta}%;"></div>
                </div>
            </div>
        `;

        painelGrid.appendChild(card);
    });
}

// Configura os cliques nos botões de filtro
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const biomaSelecionado = btn.getAttribute("data-bioma");
        renderizarPainel(biomaSelecionado);
    });
});

// Carrega todos os biomas inicialmente
renderizarPainel("todos");