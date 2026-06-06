let questions = [];
let current = 0;
let selected = [];
let revealed = [];
let score = 0;
let totalSecs = 0;
let timerInterval;

const letters = ['A', 'B', 'C', 'D'];

fetch('/api/questions')
    .then(res => res.json())
    .then(data => {
        questions = data;
        selected = new Array(questions.length).fill(null);
        revealed = new Array(questions.length).fill(false);
        totalSecs = questions.length * 30;
        startTimer();
        renderQuestion();
    });

function startTimer() {
    const timerEl = document.getElementById('timer');
    timerEl.textContent = fmt(totalSecs);
    timerInterval = setInterval(() => {
        totalSecs--;
        timerEl.textContent = fmt(totalSecs);
        if (totalSecs <= 60) timerEl.classList.add('danger');
        if (totalSecs <= 0) { clearInterval(timerInterval); showResult(); }
    }, 1000);
}

function fmt(s) {
    return Math.floor(s / 60) + ':' + (s % 60 < 10 ? '0' : '') + (s % 60);
}

function renderQuestion() {
    const q = questions[current];

    // update stats bar
    document.getElementById('q-counter').textContent = `${current + 1} / ${questions.length}`;
    const pct = ((current + 1) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('progress-label').textContent = `Question ${current + 1} of ${questions.length}`;

    // badge
    const badgeCls = q.difficulty === 'easy' ? 'easy' : q.difficulty === 'hard' ? 'hard' : 'medium';

    // options html
    const optionsHtml = q.options.map((opt, i) => {
        let cls = 'option-btn';
        if (revealed[current]) {
            if (i === q.correctIndex) cls += ' correct';
            else if (i === selected[current]) cls += ' wrong';
        } else if (selected[current] === i) {
            cls += ' selected';
        }
        return `<button class="${cls}" onclick="selectOption(${i})" ${revealed[current] ? 'disabled' : ''}>
                    <span class="option-letter">${letters[i]}</span>${opt}
                </button>`;
    }).join('');

    document.getElementById('question-box').innerHTML = `
        <div class="question-card">
            <div class="q-meta">
                <span class="q-number">Question ${current + 1}</span>
                <span class="badge ${badgeCls}">${q.difficulty}</span>
            </div>
            <div class="q-text">${q.text}</div>
            <div class="options-grid">${optionsHtml}</div>
        </div>
        <div class="nav-row">
            <button class="btn" onclick="navigate(-1)" ${current === 0 ? 'disabled' : ''}>&#8592; Previous</button>
            <button class="btn primary" onclick="navigate(1)">
                ${current === questions.length - 1 ? 'Submit ✓' : 'Next &#8594;'}
            </button>
        </div>
    `;
}

function selectOption(idx) {
    if (revealed[current]) return;
    selected[current] = idx;
    revealed[current] = true;
    if (idx === questions[current].correctIndex) {
        score++;
        document.getElementById('score-display').textContent = score;
    }
    renderQuestion();
}

function navigate(dir) {
    if (dir === 1 && current === questions.length - 1) {
        showResult();
        return;
    }
    current = Math.max(0, Math.min(questions.length - 1, current + dir));
    renderQuestion();
}

function showResult() {
    clearInterval(timerInterval);
    const pct = Math.round((score / questions.length) * 100);
    const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚';
    const msg = pct >= 80 ? 'Excellent work!' : pct >= 60 ? 'Good job!' : 'Keep studying!';

    document.getElementById('question-box').innerHTML = `
        <div class="result-screen">
            <div class="result-emoji">${emoji}</div>
            <div class="result-score">${score}/${questions.length}</div>
            <div class="result-sub">${pct}% correct — ${msg}</div>
            <div class="result-grid">
                <div class="result-card">
                    <div class="stat-label">Correct</div>
                    <div class="stat-value success">${score}</div>
                </div>
                <div class="result-card">
                    <div class="stat-label">Incorrect</div>
                    <div class="stat-value danger">${questions.length - score}</div>
                </div>
            </div>
            <button class="btn primary restart-btn" onclick="location.reload()">&#8635; Restart Quiz</button>
        </div>
    `;

    document.getElementById('progress-fill').style.width = '100%';
    document.querySelector('.stats-bar').style.display = 'none';
    document.querySelector('.progress-wrap').style.display = 'none';
}