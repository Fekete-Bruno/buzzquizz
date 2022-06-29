const quizzList = [];
const userQuizzList = [];
const userId = 8167; /* Apenas para testar */

function getQuizzes() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promise.catch(errorLog);
    promise.then(listQuizzes);
}

function listQuizzes(answer) {
    answer.data.forEach(quiz => {
        if (quiz.id === userId) {
            userQuizzList.push(quiz);
        } else {
            quizzList.push(quiz);
        }
    });
    showQuizzes();
}

function showQuizzes() {
    /* inicia a parte de conteudi principal */
    let content = document.querySelector('.content');
    content.innerHTML = '<div class="main-content"></div>';

    /* colocar quizzes do usuario */
    let mainContent = document.querySelector('.main-content');
    if (userQuizzList.length === 0) {
        mainContent.innerHTML += 
            `
            <div class="create-quizz">
            <p>Você não criou nenhum<br/>quizz ainda :(</p>
            <div onclick="createQuizz();">Criar Quizz</div>
            </div> 
            `;
    } else {

        mainContent.innerHTML += 
            `
            <div class="my-quizzes">SEUS QUIZZES
            <ion-icon name="add-circle"></ion-icon>
            </div>
            <div class="user-quizz-container"></div>
            `;
        let userQuizzContainer = document.querySelector('.user-quizz-container');
        for (let i = 0; i < userQuizzList.length; i++) {
            userQuizzContainer.innerHTML += 
            `
            <div class="quizz" onclick="openUserQuiz(${i});">
            <img src="${userQuizzList[i].image}" alt="">
            <h1>${userQuizzList[i].title}</h1>
            </div>
            `;

        }
    }

    /* Outros Quizzes */
    mainContent.innerHTML += 
        `
        <div class="all-quizzes">TODOS OS QUIZZES</div>
        <div class="quizz-container"></div>
        `;
    let quizzContainer = document.querySelector('.quizz-container');
    for (let i = 0; i < quizzList.length; i++) {
        quizzContainer.innerHTML += 
            `
            <div class="quizz" onclick="openQuizz(${i});">
            <img src="${quizzList[i].image}" alt="">
            <h1>${quizzList[i].title}</h1>
            </div>
            `
    }
};

function openUserQuiz(index){
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
    let questions = quiz.questions;
    console.log(questions[0].answers);
    questions.forEach(question => {
        question.answers.sort(sorter);
        quizzContent.innerHTML+=
        `
        <div class="question-title">
                    ${question.title}
                </div>

                <div class="answer-container">
                        <div class="answer">
                            <img src="${question.answers[0].image}" alt="">
                            <h3>${question.answers[0].text}</h3>
                        </div>

                        <div class="answer">
                            <img src="${question.answers[1].image}" alt="">
                            <h3>${question.answers[1].text}</h3>
                        </div>

                        <div class="answer">
                            <img src="${question.answers[2].image}" alt="">
                            <h3>${question.answers[2].text}</h3>
                        </div>

                        <div class="answer">
                            <img src="${question.answers[3].image}" alt="">
                            <h3>${question.answers[3].text}</h3>
                        </div>
                </div>
        `;
    });
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
    console.log(quiz);

}

function sorter() { 
	return Math.random() - 0.5; 
}

function errorLog(error) {
    console.log(error.data);
}

getQuizzes();
