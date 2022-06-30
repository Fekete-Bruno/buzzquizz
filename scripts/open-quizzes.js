let questions = [];
let answers = [];
let levels = [];
let getResult;
let rightAnswerCount = 0;
let contador = 0;

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
        let ans = checkLength(question.answers.length,question);
        quizzContent.innerHTML += ans; 
    });

}


function openQuizz (index){
    const quiz = quizzList[index];
    /* inicia a parte de conteudo principal */
    let content = document.querySelector('.content');
    content.innerHTML = '<div class="quizz-content"></div>';

    /* colocar quizzes */
    let quizzContent = document.querySelector('.quizz-content');

    /* ativar levels */
    levels = quiz.levels;
    console.log(levels);

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
        let ans = checkLength(question.answers.length,question);
        quizzContent.innerHTML += ans; 
    });    
}

function sorter() { 
	return Math.random() - 0.5; 
}

function checkAnswer(element) {
    let divAnswer = element.parentNode;
    let divAnswerContainer = divAnswer.parentNode;
    let divQuizzContent = divAnswerContainer.parentNode;
    let answersToggle = divAnswerContainer.querySelectorAll(".answer");
    let lastChild = divAnswerContainer.querySelector(".answer:last-child")
    console.log(lastChild);

        if (divAnswer.classList.contains("true")) {
            rightAnswerCount++;
            divAnswer.querySelector("h3").classList.add("correct-answer");
            divAnswer.classList.add("selected");
            divAnswer.querySelector("img").removeAttribute("onclick");
            divAnswer.querySelector("h3").removeAttribute("onclick");
            for (let i = 0; i<answersToggle.length; i++){
                
                if (answersToggle[i].classList.contains("false")){
                    answersToggle[i].querySelector("h3").classList.add("wrong-answer");
                }
            }

            for (let i = 0; i<answersToggle.length; i++){
                if (answersToggle[i].classList.contains("selected")){
                } else {
                    answersToggle[i].classList.add("whitening");
                    answersToggle[i].querySelector("img").removeAttribute("onclick");
                    answersToggle[i].querySelector("h3").removeAttribute("onclick");
                }
            }

        } else {
            divAnswer.querySelector("h3").classList.add("wrong-answer");
            divAnswer.classList.add("selected");
            divAnswer.querySelector("img").removeAttribute("onclick");
            divAnswer.querySelector("h3").removeAttribute("onclick");
            for (let i = 0; i<answersToggle.length; i++){

                if (answersToggle[i].classList.contains("false")){
                    answersToggle[i].querySelector("h3").classList.add("wrong-answer");
                } else {
                    answersToggle[i].querySelector("h3").classList.add("correct-answer");
                }
            }
            for (let i = 0; i<answersToggle.length; i++){    
                if (answersToggle[i].classList.contains("selected")){
                } else {
                    answersToggle[i].classList.add("whitening");
                    answersToggle[i].querySelector("h3").removeAttribute("onclick");
                    answersToggle[i].querySelector("img").removeAttribute("onclick");
                }
            }
        }
        setTimeout(() => {
            divAnswerContainer.scrollIntoView(answersToggle[contador+1]);
            contador++;
        }, 2000);
        
}

function checkLength(length,question){
    switch (length) {
        case 4:
            return(
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
                
                <div class="result hidden">
                    <h1>${levels[0].title}</h1>
                    <img src="${levels[0].image}" alt="">
                    <h2>${levels[0].text}</h2>
                </div>
                `
            );
            break;
    
        case 3:
            return(
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
                </div>

                <div class="result hidden">
                    <h1>${levels[0].title}</h1>
                    <img src="${levels[0].image}" alt="">
                    <h2>${levels[0].text}</h2>
                </div>
                `
            );
            break;
            case 2:
                return(
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
                    </div>

                    <div class="result hidden">
                        <h1>${levels[0].title}</h1>
                        <img src="${levels[0].image}" alt="">
                        <h2>${levels[0].text}</h2>
                    </div>
                    `
                );
                break;
    }
}