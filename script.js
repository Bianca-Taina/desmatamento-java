// Carrega dados salvos no navegador ou usa exemplos iniciais
const dadosIniciais = [
  { id: 1, rua: 'Av. Brasil', bairro: 'Centro', especie: 'Ipê Amarelo', saude: 'Saudável', idade: 15 },
  { id: 2, rua: 'Rua das Flores', bairro: 'Jardim América', especie: 'Sibipiruna', saude: 'Risco de Queda', idade: 35 },
  { id: 3, rua: 'Rua Barão do Rio Branco', bairro: 'Vila Industrial', especie: 'Jacarandá', saude: 'Necessita Poda', idade: 12 },
  { id: 4, rua: 'Av. Parigot de Souza', bairro: 'Jardim Porto Alegre', especie: 'Oiti', saude: 'Em Tratamento', idade: 8 }
];

let arvores = JSON.parse(localStorage.getItem('ecoMapeamento_arvores')) || dadosIniciais;
let graficoInstancia = null;

const form = document.getElementById('treeForm');
const tabelaCorpo = document.getElementById('tabelaCorpo');
const campoBusca = document.getElementById('busca');
const mensagemVazia = document.getElementById('mensagemVazia');

// Inicializa a aplicação
document.addEventListener('DOMContentLoaded', () => {
  atualizarTudo();
});

// Salva no localStorage e atualiza tela, indicadores e gráfico
function atualizarTudo() {
  localStorage.setItem('ecoMapeamento_arvores', JSON.stringify(arvores));
  renderizarTabela();
  atualizarIndicadores();
  atualizarGrafico();
}

// Evento de cadastro
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const novaArvore = {
    id: Date.now(),
    rua: document.getElementById('rua').value.trim(),
    bairro: document.getElementById('bairro').value.trim(),
    especie: document.getElementById('especie').value,
    saude: document.getElementById('saude').value,
    idade: parseInt(document.getElementById('idade').value)
  };

  arvores.unshift(novaArvore); // Adiciona no topo da lista
  atualizarTudo();
  
  form.reset();
  document.getElementById('idade').value = 1;
});

// Filtro de busca em tempo real
campoBusca.addEventListener('input', () => {
  renderizarTabela();
});

// Renderiza as linhas da tabela
function renderizarTabela() {
  const termo = campoBusca.value.toLowerCase();
  tabelaCorpo.innerHTML = '';

  const arvoresFiltradas = arvores.filter(a => 
    a.rua.toLowerCase().includes(termo) || 
    a.bairro.toLowerCase().includes(termo) ||
    a.especie.toLowerCase().includes(termo)
  );

  if (arvoresFiltradas.length === 0) {
    mensagemVazia.classList.remove('hidden');
  } else {
    mensagemVazia.classList.add('hidden');
  }

  arvoresFiltradas.forEach(arvore => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <span class="local-rua">${arvore.rua}</span>
        <span class="local-bairro">${arvore.bairro}</span>
      </td>
      <td>${arvore.especie}</td>
      <td><span class="badge ${obterClasseBadge(arvore.saude)}">${arvore.saude}</span></td>
      <td>${arvore.idade} ${arvore.idade === 1 ? 'ano' : 'anos'}</td>
      <td>
        <button class="btn-excluir" onclick="removerArvore(${arvore.id})">Remover</button>
      </td>
    `;
    tabelaCorpo.appendChild(tr);
  });
}

function obterClasseBadge(saude) {
  switch (saude) {
    case 'Saudável': return 'badge-saudavel';
    case 'Necessita Poda': return 'badge-poda';
    case 'Risco de Queda': return 'badge-risco';
    case 'Em Tratamento': return 'badge-tratamento';
    default: return '';
  }
}

function removerArvore(id) {
  arvores = arvores.filter(a => a.id !== id);
  atualizarTudo();
}

// Atualiza os cards de números no topo
function atualizarIndicadores() {
  const total = arvores.length;
  const saudaveis = arvores.filter(a => a.saude === 'Saudável').length;
  const poda = arvores.filter(a => a.saude === 'Necessita Poda').length;
  const risco = arvores.filter(a => a.saude === 'Risco de Queda').length;

  document.getElementById('totalArvores').innerText = total;
  document.getElementById('totalSaudaveis').innerText = saudaveis;
  document.getElementById('totalPoda').innerText = poda;
  document.getElementById('totalRisco').innerText = risco;
}

// Cria ou atualiza o gráfico de rosca
function atualizarGrafico() {
  const saudaveis = arvores.filter(a => a.saude === 'Saudável').length;
  const poda = arvores.filter(a => a.saude === 'Necessita Poda').length;
  const risco = arvores.filter(a => a.saude === 'Risco de Queda').length;
  const tratamento = arvores.filter(a => a.saude === 'Em Tratamento').length;

  const ctx = document.getElementById('graficoSaude').getContext('2d');

  if (graficoInstancia) {
    graficoInstancia.destroy();
  }

  graficoInstancia = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Saudável', 'Necessita Poda', 'Risco de Queda', 'Em Tratamento'],
      datasets: [{
        data: [saudaveis, poda, risco, tratamento],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#3b82f6'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            usePointStyle: true,
            font: { size: 12 }
          }
        }
      }
    }
  });
}