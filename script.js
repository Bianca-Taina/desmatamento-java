// 1. Inicialização do Gráfico com Chart.js
const ctx = document.getElementById('graficoDesmatamento').getContext('2d');

const grafico = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
    datasets: [{
      label: 'Área Desmatada (m²)',
      data: [12000, 19000, 15000, 22000, 18000, 25000, 21000],
      borderColor: '#d90429',
      backgroundColor: 'rgba(217, 4, 41, 0.1)',
      borderWidth: 2,
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  }
});

// 2. Lógica do Simulador de Impacto
const areaInput = document.getElementById('areaInput');
const btnCalcular = document.getElementById('btnCalcular');
const resultadosDiv = document.getElementById('resultados');

btnCalcular.addEventListener('click', function () {
  const area = parseFloat(areaInput.value);

  if (isNaN(area) || area <= 0) {
    alert('Por favor, digite um valor de área válido!');
    return;
  }

  // Fórmulas ambientais estimadas:
  const arvoresPerdidas = Math.round(area * 0.1); // ~1 árvore a cada 10m²
  const co2Emitido = Math.round(arvoresPerdidas * 22); // 22kg de CO2 por árvore/ano
  const o2Perdido = Math.round(arvoresPerdidas * 118); // 118kg de O2 por árvore/ano
  const compensacao = Math.round(arvoresPerdidas * 1.2); // +20% de margem

  // Atualiza os valores na tela com formatação numérica
  document.getElementById('resArvores').innerText = arvoresPerdidas.toLocaleString('pt-BR');
  document.getElementById('resCo2').innerText = co2Emitido.toLocaleString('pt-BR') + ' kg/ano';
  document.getElementById('resO2').innerText = o2Perdido.toLocaleString('pt-BR') + ' kg/ano';
  document.getElementById('resCompensacao').innerText = compensacao.toLocaleString('pt-BR') + ' mudas';

  // Exibe o painel de resultados
  resultadosDiv.classList.remove('hidden');
});