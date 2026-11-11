// Array para armazenar as árvores
let arvores = [
  { id: 1, rua: 'Av. Brasil', bairro: 'Centro', especie: 'Ipê Amarelo', saude: 'Saudável', idade: 15 },
  { id: 2, rua: 'Rua das Flores', bairro: 'Jardim América', especie: 'Sibipiruna', saude: 'Risco de Queda', idade: 35 }
];

const form = document.getElementById('treeForm');
const tabelaCorpo = document.getElementById('tabelaCorpo');
const campoBusca = document.getElementById('busca');

// Inicializa a tela
document.addEventListener('DOMContentLoaded', () => {
  renderizarTabela();
  atualizarIndicadores();
});

// Evento de envio do formulário
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

  arvores.push(novaArvore);
  renderizarTabela();
  atualizarIndicadores();
  form.reset();
  document.getElementById('idade').value = 1;
});

// Evento de busca em tempo real
campoBusca.addEventListener('input', () => {
  renderizarTabela();
});

// Função para renderizar a tabela
function renderizarTabela() {
  const termo = campoBusca.value.toLowerCase();
  tabelaCorpo.innerHTML = '';

  const arvoresFiltradas = arvores.filter(a => 
    a.rua.toLowerCase().includes(termo) || 
    a.bairro.toLowerCase().includes(termo)
  );

  arvoresFiltradas.forEach(arvore => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${arvore.rua}</td>
      <td>${arvore.bairro}</td>
      <td>${arvore.especie}</td>
      <td><span class="badge ${obterClasseBadge(arvore.saude)}">${arvore.saude}</span></td>
      <td>${arvore.idade} anos</td>
      <td>
        <button class="btn-excluir" onclick="removerArvore(${arvore.id})">Remover</button>
      </td>
    `;
    tabelaCorpo.appendChild(tr);
  });
}

// Retorna a classe visual para a badge do estado de saúde
function obterClasseBadge(saude) {
  switch (saude) {
    case 'Saudável': return 'badge-saudavel';
    case 'Necessita Poda': return 'badge-poda';
    case 'Risco de Queda': return 'badge-risco';
    case 'Em Tratamento': return 'badge-tratamento';
    default: return '';
  }
}

// Remover registro
function removerArvore(id) {
  arvores = arvores.filter(a => a.id !== id);
  renderizarTabela();
  atualizarIndicadores();
}

// Atualiza as estatísticas no topo da página
function atualizarIndicadores() {
  const total = arvores.length;
  const risco = arvores.filter(a => a.saude === 'Risco de Queda').length;
  const saudaveis = arvores.filter(a => a.saude === 'Saudável').length;

  document.getElementById('totalArvores').innerText = total;
  document.getElementById('totalRisco').innerText = risco;
  document.getElementById('totalSaudaveis').innerText = saudaveis;
}