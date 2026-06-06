let questions = [];
let current = 0;
let selected = [];
let totalSecs = 0;
let timerInterval;

const letters = ['A', 'B', 'C', 'D'];

fetch('/api/questions')
    .then(res => res.json())
    .then(data => {
        questions = data;
        selected = new Array(questions.length).fill(null);
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

    document.getElementById('q-counter').textContent = `${current + 1} / ${questions.length}`;
    document.getElementById('progress-fill').style.width = ((current + 1) / questions.length * 100) + '%';
    document.getElementById('progress-label').textContent = `Question ${current + 1} of ${questions.length}`;

    // update score display to show answered count instead
    const answered = selected.filter(s => s !== null).length;
    document.getElementById('score-display').textContent = answered;

    const badgeCls = q.difficulty === 'easy' ? 'easy' : q.difficulty === 'hard' ? 'hard' : 'medium';

    const optionsHtml = q.options.map((opt, i) => {
        let cls = 'option-btn';
        if (selected[current] === i) cls += ' selected';
        return `<button class="${cls}" onclick="selectOption(${i})">
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
    selected[current] = idx;
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

    let score = 0;
    questions.forEach((q, idx) => {
        if (selected[idx] === q.correctIndex) score++;
    });

    const pct = Math.round((score / questions.length) * 100);
    const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚';
    const msg = pct >= 80 ? 'Excellent work!' : pct >= 60 ? 'Good job!' : 'Keep studying!';

    // show per-question review
    const reviewHtml = questions.map((q, idx) => {
        const userAns = selected[idx];
        const correct = userAns === q.correctIndex;
        const icon = correct ? '✅' : '❌';
        return `
            <div class="question-card" style="margin-bottom:10px;">
                <div class="q-text" style="font-size:13px;">${icon} ${q.text}</div>
                ${!correct && userAns !== null ? `<div style="font-size:12px;color:#c0392b;margin-top:4px;">Your answer: ${q.options[userAns]}</div>` : ''}
                ${!correct ? `<div style="font-size:12px;color:#1D9E75;margin-top:2px;">Correct: ${q.options[q.correctIndex]}</div>` : ''}
            </div>`;
    }).join('');

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
        <hr style="margin: 20px 0; border-color: #eee;">
        <div style="font-size:13px;font-weight:600;color:#888;margin-bottom:12px;">REVIEW YOUR ANSWERS</div>
        ${reviewHtml}
    `;

    document.getElementById('progress-fill').style.width = '100%';
    document.querySelector('.stats-bar').style.display = 'none';
    document.querySelector('.progress-wrap').style.display = 'none';
}