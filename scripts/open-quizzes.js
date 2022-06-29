let questions = [];
let answers = [];
let validateAnswer;

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
                        <div class="answer">
                            <img src="${question.answers[0].image}" alt="" onclick="checkAnswer()">
                            <h3 onclick="checkAnswer()">${question.answers[0].text}</h3>
                        </div>

                        <div class="answer">
                            <img src="${question.answers[1].image}" alt="" onclick="checkAnswer()">
                            <h3 onclick="checkAnswer()">${question.answers[1].text}</h3>
                        </div>

                        <div class="answer">
                            <img src="${question.answers[2].image}" alt="" onclick="checkAnswer()">
                            <h3 onclick="checkAnswer()">${question.answers[2].text}</h3>
                        </div>

                        <div class="answer">
                            <img src="${question.answers[3].image}" alt="" onclick="checkAnswer()">
                            <h3 onclick="checkAnswer()">${question.answers[3].text}</h3>
                        </div>
                </div>
        `;

    });
    /* pega respostas */
    for (let i = 0; i<=quiz.questions.length-1; i++){
        answers = quiz.questions[i].answers;
        console.log(answers);
    }

    /*if (answers.isCorrectAnswer) {
        document.querySelector(".answer").classList.add("correct-answer");
    } else  {
        document.querySelector(".answer").classList.add("wrong-answer");
    }*/
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
                        <div class="answer">
                            <img src="${question.answers[0].image}" alt="" onclick="checkAnswer()">
                            <h3 onclick="checkAnswer()">${question.answers[0].text}</h3>
                        </div>

                        <div class="answer">
                            <img src="${question.answers[1].image}" alt="" onclick="checkAnswer()">
                            <h3 onclick="checkAnswer()">${question.answers[1].text}</h3>
                        </div>

                        <div class="answer">
                            <img src="${question.answers[2].image}" alt="" onclick="checkAnswer()">
                            <h3 onclick="checkAnswer()">${question.answers[2].text}</h3>
                        </div>

                        <div class="answer">
                            <img src="${question.answers[3].image}" alt="" onclick="checkAnswer()">
                            <h3 onclick="checkAnswer()">${question.answers[3].text}</h3>
                        </div>
                </div>
        `;
        
    });
    
}

function sorter() { 
	return Math.random() - 0.5; 
}

function checkAnswer() {
    console.log("teste")
}