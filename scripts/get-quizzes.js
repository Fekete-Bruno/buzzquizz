const quizzList = [];
const userQuizzList = [];
const userId = 8184; /* Apenas para testar */

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
        userQuizzList.forEach(quiz => {
            userQuizzContainer.innerHTML += 
            `
            <div class="quizz">
            <img src="${quiz.image}" alt="">
            <h1>${quiz.title}</h1>
            </div>
            `
        });

    }


    mainContent.innerHTML += 
        `
        <div class="all-quizzes">TODOS OS QUIZZES</div>
        <div class="quizz-container"></div>
        `;
    let quizzContainer = document.querySelector('.quizz-container');
    quizzList.forEach(quiz => {
        quizzContainer.innerHTML += 
            `
            <div class="quizz">
            <img src="${quiz.image}" alt="">
            <h1>${quiz.title}</h1>
            </div>
            `
    });
}

function errorLog(error) {
    console.log(error.data);
}

getQuizzes();
