// --- LÓGICA DEL SLIDER ---
let currentIdx = 0;
const slides = document.querySelectorAll('.slider-image');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    if (slides.length === 0) return;
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.replace('bg-yellow-400', 'bg-slate-600'));
    
    currentIdx = (n + slides.length) % slides.length;
    slides[currentIdx].classList.add('active');
    dots[currentIdx].classList.replace('bg-slate-600', 'bg-yellow-400');
}

function nextSlide() { showSlide(currentIdx + 1); }
function prevSlide() { showSlide(currentIdx - 1); }
function currentSlide(n) { showSlide(n); }

// Cambio automático de imagen cada 5 segundos
if (slides.length > 0) {
    setInterval(() => { nextSlide(); }, 5000);
}


// --- LÓGICA DEL MINIJUEGO DE TARJETAS / TRIVIA ---
const quizData = [
    {
        question: "¿Cuál es el aniversario que conmemoraba la comuna de Frutillar en la celebración?",
        options: [
            "Aniversario número 100",
            "Aniversario número 150",
            "Aniversario número 170",
            "Aniversario número 200"
        ],
        correct: 2
    },
    {
        question: "¿Cuál fue el principal motivo por el cual se canceló la competencia acuática de patitos?",
        options: [
            "Falta de presupuesto municipal",
            "Preocupación por contaminación de microplásticos y fauna local",
            "Malas condiciones climáticas en el lago",
            "Falta de participantes inscritos"
        ],
        correct: 1
    },
    {
        question: "¿Qué actividad reemplazó al evento acuático para mantener la ayuda benéfica?",
        options: [
            "Una corrida familiar pedestre y una rifa solidaria",
            "Un concierto sinfónico masivo",
            "Una feria gastronómica de comida típica",
            "Una competencia de natación profesional"
        ],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;

const questionProgress = document.getElementById('question-progress');
const scoreCounter = document.getElementById('score-counter');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const quizBox = document.getElementById('quiz-box');
const resultBox = document.getElementById('result-box');
const finalScoreText = document.getElementById('final-score-text');

function loadQuestion() {
    if (!questionText) return;
    const q = quizData[currentQuestion];
    questionProgress.innerText = `Pregunta ${currentQuestion + 1} de ${quizData.length}`;
    scoreCounter.innerText = `Puntaje: ${score}`;
    questionText.innerText = q.question;
    optionsContainer.innerHTML = '';

    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.innerText = option;
        btn.className = "w-full text-left bg-slate-700/60 hover:bg-yellow-500 hover:text-slate-950 font-medium p-4 rounded-xl border border-slate-600 transition duration-200 shadow-md cursor-pointer";
        btn.onclick = () => selectOption(index);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(selectedIndex) {
    const q = quizData[currentQuestion];
    if (selectedIndex === q.correct) {
        score += 10;
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    if (!quizBox || !resultBox) return;
    quizBox.classList.add('hidden');
    resultBox.classList.remove('hidden');
    finalScoreText.innerText = `¡Has obtenido ${score} de ${quizData.length * 10} puntos posibles!`;
}

function restartGame() {
    currentQuestion = 0;
    score = 0;
    resultBox.classList.add('hidden');
    quizBox.classList.remove('hidden');
    loadQuestion();
}

// Inicializar juego al cargar
if (questionText) {
    loadQuestion();
}