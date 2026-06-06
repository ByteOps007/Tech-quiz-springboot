let questions = [];
let currentPage = 0;
const questionsPerPage = 5;
let userAnswers = []; // Array to store what the user types
let totalTime = 0;
let timerInterval;

fetch('/api/questions')
    .then(response => response.json())
    .then(data => {
        questions = data;
        // Initialize empty answers for all questions
        userAnswers = new Array(questions.length).fill("");
        totalTime = questions.length * 45;
        startGlobalTimer();
        renderPage();
    });

function startGlobalTimer() {
    timerInterval = setInterval(() => {
        totalTime--;
        let mins = Math.floor(totalTime / 60);
        let secs = totalTime % 60;
        document.getElementById('timer').innerText = `Time Left: ${mins}:${secs < 10 ? '0' : ''}${secs}`;
        if (totalTime <= 0) {
            clearInterval(timerInterval);
            calculateFinalScore();
        }
    }, 1000);
}

function saveCurrentAnswers() {
    const inputs = document.querySelectorAll('.quiz-answer');
    inputs.forEach(input => {
        const idx = input.getAttribute('data-index');
        userAnswers[idx] = input.value; // Store the current text
    });
}

function renderPage() {
    const container = document.getElementById('question-box');
    container.innerHTML = "";

    const progress = ((currentPage * questionsPerPage) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;

    const start = currentPage * questionsPerPage;
    const end = Math.min(start + questionsPerPage, questions.length);
    const currentBatch = questions.slice(start, end);

    currentBatch.forEach((q, index) => {
        const globalIndex = start + index;
        const qDiv = document.createElement('div');
        qDiv.className = 'question-item';
        qDiv.innerHTML = `
            <span class="question-text">${globalIndex + 1}. ${q.text}</span>
            <input type="text" class="quiz-answer" data-index="${globalIndex}"
                   value="${userAnswers[globalIndex]}" placeholder="Type answer here...">
        `;
        container.appendChild(qDiv);
    });

    // Create Navigation Container
    const navDiv = document.createElement('div');
    navDiv.className = 'nav-buttons';

    // Previous Button (Only show if not on page 0)
    if (currentPage > 0) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'prev-btn';
        prevBtn.innerText = "Previous";
        prevBtn.onclick = () => { saveCurrentAnswers(); currentPage--; renderPage(); };
        navDiv.appendChild(prevBtn);
    }

    // Next/Finish Button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'next-btn';
    nextBtn.innerText = (end >= questions.length) ? "Finish Quiz" : "Next";
    nextBtn.onclick = () => {
        saveCurrentAnswers();
        if (end >= questions.length) {
            calculateFinalScore();
        } else {
            currentPage++;
            renderPage();
        }
    };
    navDiv.appendChild(nextBtn);

    container.appendChild(navDiv);
}

function calculateFinalScore() {
    clearInterval(timerInterval);
    let finalScore = 0;

    questions.forEach((q, idx) => {
        if (userAnswers[idx].trim().toLowerCase() === q.answer.toLowerCase()) {
            finalScore++;
        }
    });

    document.getElementById('progress-fill').style.width = `100%`;
    const mainBox = document.querySelector('.quiz-container');
    mainBox.innerHTML = `
        <div style="text-align:center; padding: 50px;">
            <h1 style="color: #4CAF50;">Quiz Completed!</h1>
            <p style="font-size: 1.5rem;">You scored <b>${finalScore}</b> / <b>${questions.length}</b></p>
            <button onclick="location.reload()" class="next-btn" style="float:none;">Restart</button>
        </div>
    `;
}