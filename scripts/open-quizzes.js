let questions = [];
let answers = [];
let levels = [];
let minValue = [];
let rightAnswerCount = 0;
let contador = 0;
let valueCheck = 0;

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

    /*ativar minValue*/
    for(let i = 0; i<levels.length; i++){
        minValue[i] = levels[i].minValue;
        console.log(minValue[i]);
    }

    /* Titulo */
    quizzContent.innerHTML+=
        `
        <div class="quizz-title">
            <img src="${quiz.image}" alt="">
            <h1>${quiz.title}</h1>
        </div>
        `
        ;

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
    let lastQuestion = divQuizzContent.querySelector(".answer-container:last-child");

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
            addResult(divQuizzContent, lastQuestion, divAnswerContainer);
        }, 2000);    
        
        let rightAnswersPercentage;
        rightAnswersPercentage =  Math.round((rightAnswerCount*100)/answersToggle.length);       
        
        if (rightAnswersPercentage>minValue[levels.length-1]){
            valueCheck = levels.length-1;
        } else if (rightAnswersPercentage>minValue[levels.length-2]){
            valueCheck = levels.length-2;
        } else if (rightAnswersPercentage>minValue[levels.length-3]){
            valueCheck = levels.length-3;
        } else if (rightAnswersPercentage>minValue[levels.length-4]){
            valueCheck = levels.length-4;
        }
        
}

function addResult(divQuizzContent, lastQuestion, divAnswerContainer){

    if (lastQuestion === divAnswerContainer){
        divQuizzContent.innerHTML+= 
        `
        <div class="result">
            <h1>${levels[valueCheck].title}</h1>
            <img src="${levels[valueCheck].image}" alt="">
            <h2>${levels[valueCheck].text}</h2>
        </div>
        `;
        showResult(divQuizzContent);
        }
}

function showResult(divQuizzContent){
    let lastChild = divQuizzContent.querySelector(".result");
    let resultH2 = lastChild.querySelector("h2");

    setTimeout(() => {
        lastChild.scrollIntoView(resultH2);
    }, 500); 
}

function checkLength(length,question){
    switch (length) {
        case 4:
            return(
                `
                <div class="answer-container">
                    <div class="question-title">
                        ${question.title}
                    </div>

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
                `
            );
    
        case 3:
            return(
                `
                <div class="answer-container">
                    <div class="question-title">
                        ${question.title}
                    </div>

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
                `
            );

            case 2:
                return(
                    `
                    <div class="answer-container">
                        <div class="question-title">
                            ${question.title}
                        </div>

                        <div class="answer ${question.answers[0].isCorrectAnswer.toString()}">
                            <img src="${question.answers[0].image}" alt="" onclick="checkAnswer(this)">
                            <h3 onclick="checkAnswer(this)">${question.answers[0].text}</h3>
                        </div>

                        <div class="answer ${question.answers[1].isCorrectAnswer.toString()}">
                            <img src="${question.answers[1].image}" alt="" onclick="checkAnswer(this)">
                            <h3 onclick="checkAnswer(this)">${question.answers[1].text}</h3>
                        </div>
                    </div>
                    `
                );
    }
}