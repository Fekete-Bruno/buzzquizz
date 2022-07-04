let questions = [];
let answers = [];
let levels = [];
let minValue = [];
let rightAnswerCount = 0;
let answersCount = 0;
let contador = 2;
let valueCheck = 0;
let restartIndex;
let restartUserIndex;

function openUserQuizz(index){
    restartUserIndex = index;
    restartIndex = -1;
    const quiz = userQuizzList[index];
    /* inicia a parte de conteudo principal */
    let content = document.querySelector('.content');
    content.innerHTML = '<div class="quizz-content"></div>';

    /* colocar quizzes do usuario */
    let quizzContent = document.querySelector('.quizz-content');

    activateLevels(quiz);

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

    document.querySelector('.answer-container').classList.remove('hidden')
    window.scrollTo(0,0);

}


function openQuizz (index){
    restartIndex = index;
    restartUserIndex = -1;
    const quiz = quizzList[index];
    /* inicia a parte de conteudo principal */
    let content = document.querySelector('.content');
    content.innerHTML = '<div class="quizz-content"></div>';

    /* colocar quizzes */
    let quizzContent = document.querySelector('.quizz-content');

    activateLevels(quiz);

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

    document.querySelector('.answer-container').classList.remove('hidden')   

    window.scrollTo(0,0);
}

function sorter() { 
	return Math.random() - 0.5; 
}

function activateLevels(quiz){
    /* ativar levels */
    levels = quiz.levels;

    /*ativar minValue*/
    for(let i = 0; i<levels.length; i++){
        minValue[i] = levels[i].minValue;
    }
}

function checkAnswer(element) {
    //esta variável pega a div pai do elemento clicado (.answer)
    let divAnswer = element.parentNode;

    //esta variável pega a div pai da .answer (.answer-container) referente à div do elemento clicado
    let divAnswerContainer = divAnswer.parentNode;

    //esta variável pega a div pai da .answer-container (.quizz-content) referente à div do elemento clicado
    let divQuizzContent = divAnswerContainer.parentNode;

    let answersArray = divAnswerContainer.querySelectorAll(".answer");

    let answerContainerArray = divQuizzContent.querySelectorAll(".answer-container");

    let lastQuestion = divQuizzContent.querySelector(".answer-container:last-child");

        // se a resposta clicada for certa
        if (divAnswer.classList.contains("true")) {
            rightAnswerCount++;
            answersCount ++;
            divAnswer.querySelector("h3").classList.add("correct-answer");
            divAnswer.classList.add("selected");
            divAnswer.querySelector("img").removeAttribute("onclick");
            divAnswer.querySelector("h3").removeAttribute("onclick");
            
            //loop for para adicionar a classe false nos incorretos caso o elemento inicial seja correto
            for (let i = 0; i<answersArray.length; i++){
                
                if (answersArray[i].classList.contains("false")){
                    answersArray[i].querySelector("h3").classList.add("wrong-answer");
                }
            }

            //loop for para esbranquiçar os outros elementos e remove o onclick de todos
            for (let i = 0; i<answersArray.length; i++){
                if (answersArray[i].classList.contains("selected")){
                } else {
                    answersArray[i].classList.add("whitening");
                    answersArray[i].querySelector("img").removeAttribute("onclick");
                    answersArray[i].querySelector("h3").removeAttribute("onclick");
                }
            }

        // se a resposta clicada for errada (os loops for tem a mesma função dos anteriores)
        } else {
            answersCount ++;
            divAnswer.querySelector("h3").classList.add("wrong-answer");
            divAnswer.classList.add("selected");
            divAnswer.querySelector("img").removeAttribute("onclick");
            divAnswer.querySelector("h3").removeAttribute("onclick");
            
            for (let i = 0; i<answersArray.length; i++){

                if (answersArray[i].classList.contains("false")){
                    answersArray[i].querySelector("h3").classList.add("wrong-answer");
                } else {
                    answersArray[i].querySelector("h3").classList.add("correct-answer");
                }
            }
            
            for (let i = 0; i<answersArray.length; i++){    
                if (answersArray[i].classList.contains("selected")){
                } else {
                    answersArray[i].classList.add("whitening");
                    answersArray[i].querySelector("h3").removeAttribute("onclick");
                    answersArray[i].querySelector("img").removeAttribute("onclick");
                }
            }
        }
        setTimeout(() => {
            let nextAnswerContainer = divQuizzContent.querySelector(`.answer-container:nth-child(${contador+1})`);
            contador++;
            if (nextAnswerContainer !== null){
                nextAnswerContainer.classList.remove('hidden');
                nextAnswerContainer.scrollIntoView(nextAnswerContainer);
            }
            addResult(divQuizzContent, answerContainerArray);
        }, 2000);    
        
        let rightAnswersPercentage;
        rightAnswersPercentage = Math.round((rightAnswerCount*100)/answersArray.length);       
        
        if (rightAnswersPercentage>minValue[levels.length-1]){
            valueCheck = levels.length-1;
        } else if (rightAnswersPercentage>minValue[levels.length-2]){
            valueCheck = levels.length-2;
        } else if (rightAnswersPercentage>minValue[levels.length-3]){
            valueCheck = levels.length-3;
        } else if (rightAnswersPercentage>minValue[levels.length-4]){
            valueCheck = levels.length-4;
        } else if (rightAnswersPercentage>minValue[levels.length-5]){
            valueCheck = levels.length-5;
        }
        
}

function addResult(divQuizzContent, answerContainerArray){
    

    if (answersCount === answerContainerArray.length){
        divQuizzContent.innerHTML+= 
        `
        <div class="result">
            <h1>${levels[valueCheck].title}</h1>
            <img src="${levels[valueCheck].image}" alt="">
            <h2>${levels[valueCheck].text}</h2>
        </div>

        <div>
            <button class="restart-quizz" onclick="restartQuizz()">Reiniciar Quizz</button>
            <button class="home" onclick="returnHome()">Voltar para home</button>
        </div>
        `;
        showResult(divQuizzContent);
        }
}

function showResult(divQuizzContent){
    let lastElement = divQuizzContent.querySelector(".home")
    setTimeout(() => {
        lastElement.scrollIntoView(lastElement);
    }, 500); 
    rightAnswerCount = 0;
    answersCount = 0;
    valueCheck = 0;
    contador = 2;
}

function restartQuizz(){
    if (restartIndex >= 0){
        openQuizz(restartIndex);
    } else {
        openUserQuizz(restartUserIndex)
    }
}

function returnHome() {
    getQuizzes();
}

function checkLength(length,question){
    switch (length) {
        case 4:
            return(
                `
                <div class="answer-container hidden">
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
                <div class="answer-container hidden">
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
                    <div class="answer-container hidden">
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