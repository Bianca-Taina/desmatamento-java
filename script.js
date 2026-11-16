const questions = [
    {
        question: "1. Qual é o principal fator responsável pelo desmatamento no Brasil atualmente?",
        options: [
            "Construção de ferrovias",
            "Expansão da agropecuária (pastagens e monoculturas)",
            "Crescimento urbano das capitais",
            "Turismo ecológico desordenado"
        ],
        answer: 1
    },
    {
        question: "2. O que são os 'rios voadores' gerados pela Floresta Amazônica?",
        options: [
            "Rios subterrâneos que abastecem o Nordeste",
            "Massas de umidade que levam chuvas para outras regiões do Brasil",
            "Canais artificiais construídos para irrigação",
            "Nuvens de fumaça causadas pelas queimadas"
        ],
        answer: 1
    },
    {
        question: "3. O que significa 'grilagem de terras'?",
        options: [
            "Técnica sustentável de plantio direto",
            "Monitoramento de florestas por drones",
            "Ocupação e falsificação de documentos de terras públicas",
            "Reflorestamento de áreas de preservação permanente"
        ],
        answer: 2
    },
    {
        question: "4. Qual alternativa representa uma solução baseada na bioeconomia?",
        options: [
            "Derrubar a mata para vender madeira nobre",
            "Extrair frutos como açaí e castanha mantendo a floresta em pé",
            "Substituir florestas nativas por pasto",
            "Liberar o garimpo em reservas ambientais"
        ],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackText = document.getElementById("feedback-text");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {
    feedbackText.textContent = "";
    nextBtn.classList.add("hidden");
    optionsContainer.innerHTML = "";

    const q = questions[currentQuestion];
    questionText.textContent = q.question;

    q.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.onclick = () => checkAnswer(index, button);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex, selectedButton) {
    const correctIndex = questions[currentQuestion].answer;
    const allButtons = optionsContainer.querySelectorAll(".option-btn");

    // Desativa todos os botões após a escolha
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === correctIndex) {
        selectedButton.classList.add("correct");
        feedbackText.textContent = "Resposta correta!";
        feedbackText.style.color = "#2d6a4f";
        score++;
    } else {
        selectedButton.classList.add("wrong");
        allButtons[correctIndex].classList.add("correct");
        feedbackText.textContent = "Resposta incorreta.";
        feedbackText.style.color = "#d9534f";
    }

    nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    questionText.textContent = `Quiz Finalizado! Você acertou ${score} de ${questions.length} perguntas.`;
    optionsContainer.innerHTML = "";
    feedbackText.textContent = score === questions.length 
        ? "Excelente! Você domina o assunto." 
        : "Bom trabalho! Revise o conteúdo acima para saber ainda mais.";
    feedbackText.style.color = "#1b4332";
    
    nextBtn.textContent = "Refazer Quiz";
    nextBtn.classList.remove("hidden");
    nextBtn.onclick = () => {
        currentQuestion = 0;
        score = 0;
        nextBtn.textContent = "Próxima Pergunta";
        nextBtn.onclick = null;
        location.reload();
    };
}

// Inicia o quiz ao carregar a página
loadQuestion();