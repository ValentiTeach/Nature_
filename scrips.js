document.addEventListener('DOMContentLoaded', () => {

    // ===== Питання на тему природи =====
    const questions = [
        {
            question: "Яка тварина є найшвидшою на суші?",
            answers: ["Лев", "Гепард", "Антилопа", "Кінь"],
            correct: 1
        },
        {
            question: "Скільки сердець має восьминіг?",
            answers: ["1", "2", "3", "4"],
            correct: 2
        },
        {
            question: "Як називається найбільший океан світу?",
            answers: ["Атлантичний", "Індійський", "Тихий", "Північний Льодовитий"],
            correct: 2
        },
        {
            question: "Яке дерево є символом України?",
            answers: ["Дуб", "Береза", "Калина", "Верба"],
            correct: 2
        }
    ];

    // ===== Отримання елементів =====
    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');
    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');
    const resultText = document.querySelector('.result-text');
    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const scoreDisplay = document.querySelector('#score-display');
    const timerDisplay = document.querySelector('#timer');

    let questionIndex = 0;
    let score = 0;
    let timer = 15;
    let interval;

    // ===== Показ запитання =====
    function showQuestion(question) {
        clearInterval(interval);
        startTimer();

        answersContainer.innerHTML = '';
        questionText.innerText = question.question;

        for (let i = 0; i < question.answers.length; i++) {
            const button = document.createElement('button');
            button.innerText = question.answers[i];
            button.classList.add('answer-btn');
            button.addEventListener('click', () => checkAnswer(button, i));
            answersContainer.appendChild(button);
        }
    }

    // ===== Перевірка відповіді =====
    function checkAnswer(button, i) {
        clearInterval(interval);

        if (i === questions[questionIndex].correct) {
            score++;
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }

        scoreDisplay.innerText = `🌱 ${score}`;

        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
        });

        setTimeout(nextQuestion, 1000);
    }

    // ===== Перехід до наступного запитання =====
    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }

    // ===== Показ результату =====
    function showResult() {
        clearInterval(interval);
        const accuracy = Math.round((score / questions.length) * 100);
        resultText.innerText = `Твій результат: ${score}/${questions.length} (${accuracy}%)`;
        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');
    }

    // ===== Старт гри =====
    function startGame() {
        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');
        questionIndex = 0;
        score = 0;
        scoreDisplay.innerText = `🌱 0`;
        showQuestion(questions[questionIndex]);
    }

    // ===== Таймер =====
    function startTimer() {
        timer = 15;
        timerDisplay.innerText = `🕐 ${timer}с`;
        interval = setInterval(() => {
            timer--;
            timerDisplay.innerText = `🕐 ${timer}с`;
            if (timer <= 0) {
                clearInterval(interval);
                document.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);
                setTimeout(nextQuestion, 500);
            }
        }, 1000);
    }

    // ===== Слухачі подій =====
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
});
