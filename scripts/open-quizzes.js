let questions = [];
let answers = [];

function openUserQuizz(index){
    const quiz = userQuizzList[index];
    /* inicia a parte de conteudo principal */
    let content = document.querySelector('.content');
    content.innerHTML = '<div class="quizz-content"></div>';

    /* colocar quizzes do usuario */
    let quizzContent = document.querySelector('.quizz-content');

    /* Titulo */
    quizzContent.innerHTML+=
        `
        <div class="quizz-title">
            <img src="${quiz.image}" alt="">
            <h1>${quiz.title}</h1>
        </div>
        `;

    /* ativar perguntas */
    questions = quiz.questions;
    questions.forEach(question => {
        question.answers.sort(sorter);
        quizzContent.innerHTML+=
        `
        <div class="question-title">
                    ${question.title}
                </div>

                <div class="answer-container">
                        <div class="answer ${question.answers[0].isCorrectAnswer.toString()}">
                            <img src="${question.answers[0].image}" alt="" onclick="checkAnswer(this)">
                            <h3 onclick="checkAnswer(this)">${question.answers[0].text}</h3>
                        </div>

                        <div class="answer ${question.answers[1].isCorrectAnswer.toString()}">
                            <img src="${question.answers[1].image}" alt="" onclick="checkAnswer(this)">
                            <h3 onclick="checkAnswer(this)">${question.answers[1].text}</h3>
                        </div>

                        <div class="answer ${question.answers[2].isCorrectAnswer.toString()}">
                            <img src="${question.answers[2].image}" alt="" onclick="checkAnswer(this)">
                            <h3 onclick="checkAnswer(this)">${question.answers[2].text}</h3>
                        </div>

                        <div class="answer ${question.answers[3].isCorrectAnswer.toString()}">
                            <img src="${question.answers[3].image}" alt="" onclick="checkAnswer(this)">
                            <h3 onclick="checkAnswer(this)">${question.answers[3].text}</h3>
                        </div>
                </div>
        `;
        console.log(question.answers);
    });
    /* pega respostas */

}


function openQuizz (index){
    const quiz = quizzList[index];
    /* inicia a parte de conteudo principal */
    let content = document.querySelector('.content');
    content.innerHTML = '<div class="quizz-content"></div>';

    /* colocar quizzes */
    let quizzContent = document.querySelector('.quizz-content');

    /* Titulo */
    quizzContent.innerHTML+=
        `
        <div class="quizz-title">
            <img src="${quiz.image}" alt="">
            <h1>${quiz.title}</h1>
        </div>
        `;

    /* ativar perguntas */
    questions = quiz.questions;
    questions.forEach(question => {
        question.answers.sort(sorter);
        quizzContent.innerHTML+=
        `
        <div class="question-title">
                    ${question.title}
                </div>

                <div class="answer-container">
                        <div class="answer ${question.answers[0].isCorrectAnswer.toString()}">
                            <img src="${question.answers[0].image}" alt="" onclick="checkAnswer(this)">
                            <h3 onclick="checkAnswer(this)">${question.answers[0].text}</h3>
                        </div>

                        <div class="answer ${question.answers[1].isCorrectAnswer.toString()}">
                            <img src="${question.answers[1].image}" alt="" onclick="checkAnswer(this)">
                            <h3 onclick="checkAnswer(this)">${question.answers[1].text}</h3>
                        </div>

                        <div class="answer ${question.answers[2].isCorrectAnswer.toString()}">
                            <img src="${question.answers[2].image}" alt="" onclick="checkAnswer(this)">
                            <h3 onclick="checkAnswer(this)">${question.answers[2].text}</h3>
                        </div>

                        <div class="answer ${question.answers[3].isCorrectAnswer.toString()}">
                            <img src="${question.answers[3].image}" alt="" onclick="checkAnswer(this)">
                            <h3 onclick="checkAnswer(this)">${question.answers[3].text}</h3>
                        </div>
                </div>
        `;
    });
    for (let i = 0; i<questions.length; i++){
        answers = questions[i];
        console.log (answers);
    }
    
}

function sorter() { 
	return Math.random() - 0.5; 
}

function checkAnswer(element) {
    let divAnswer = element.parentNode;
    console.log(divAnswer);
        if (divAnswer.classList.contains("true")) {
            divAnswer.querySelector("h3").classList.add("correct-answer");
        } else {
            divAnswer.querySelector("h3").classList.add("wrong-answer");
        }
        toggleAnswers(divAnswer);
}

function toggleAnswers(divAnswer){
    let answer = document.queryselectorAll("h3");

    if (answer.classList.contains("correct-answer")){

    }
}