console.log("script.js connected!");

// Store user answers
const userAnswers = {}; // e.g., {1: "Pizza", 2: "Chocolate", ...}

// Grab all question blocks
const questions = document.querySelectorAll('.question-block');

// Initially hide all questions except the first
questions.forEach((q, index) => {
    if(index !== 0) q.style.display = 'none';
});

// Track user selection and highlight
questions.forEach((questionBlock, qIndex) => {
    const buttons = questionBlock.querySelectorAll('.answer-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove 'selected' class from all buttons in this block
            buttons.forEach(b => b.classList.remove('btn-primary'));
            
            // Highlight clicked button
            btn.classList.add('btn-primary');

            // Store user's answer
            const answer = btn.getAttribute('data-answer');
            const questionNumber = qIndex + 1; // 1-based
            userAnswers[questionNumber] = answer;
            console.log("Current selections:", userAnswers);

            // Hide current question and show next
            questionBlock.style.display = 'none';
            const nextBlock = questionBlock.parentElement.nextElementSibling;
            if(nextBlock && nextBlock.querySelector('.question-block')) {
                nextBlock.querySelector('.question-block').style.display = 'block';
            }
        });
    });
});

// Function to calculate and display final result
function displayResult() {
    console.log("Calculating result with:", userAnswers);

    // Example scoring system
    const pointsMap = {
        Pizza: 3,
        Chocolate: 1,
        Apple: 2,
        Sushi: 4
    };

    let totalPoints = 0;
    for(let key in userAnswers) {
        const answer = userAnswers[key];
        if(pointsMap[answer]) totalPoints += pointsMap[answer];
    }

    // Determine final result
    let resultText = "";
    if(totalPoints >= 4 && totalPoints <= 6) resultText = "Chocolate";
    else if(totalPoints >= 7 && totalPoints <= 9) resultText = "Apple";
    else if(totalPoints >= 10 && totalPoints <= 12) resultText = "Pizza";
    else if(totalPoints >= 13 && totalPoints <= 16) resultText = "Sushi";
    else resultText = "No result — try again!";

    // Update result container
    const resultContainer = document.getElementById('result-container');
    const resultTextEl = document.getElementById('result-text');
    resultTextEl.textContent = resultText;
    resultContainer.style.display = 'block';
}

// Attach displayResult() to the "Show Results" button
document.getElementById('show-result').addEventListener('click', displayResult);