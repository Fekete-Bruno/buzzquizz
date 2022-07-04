const apiUrl = 'https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes';
let quizzList = [];
let userQuizzList = [];
let userId = [];

function getQuizzes() {
    loadingScreen();
    quizzList = [];
    userQuizzList = [];
    const promise = axios.get(apiUrl);
    promise.catch(errorLog);
    promise.then(listQuizzes);
}

function listQuizzes(answer) {
    const userIdserialized = localStorage.getItem("listaIds");
    if (userIdserialized !== null){
        userId = JSON.parse(userIdserialized);
    }

    answer.data.forEach(quiz => {
        if (!isUserQuizz(quiz)) {
            quizzList.push(quiz);
        }
    });
    saveUserQuizzList();
}

function saveUserQuizzList() {
    userId.forEach(idNumber => {
        const promise = axios.get(`${apiUrl}/${idNumber}`);
        promise.catch(errorLog)
        promise.then(pushUserQuizz)
    });
    
}

function pushUserQuizz(answer){
    userQuizzList.push(answer.data);
    showQuizzes();
}

function isUserQuizz(quiz){
    let condition = false;
    userId.forEach(element => {
        if (quiz.id === element){
            condition = true
        }
    });
    return condition;
}

function showQuizzes() {
    /* inicia a parte de conteudo principal */
    window.scrollTo(0,0);
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
            <ion-icon name="add-circle" onclick="createQuizz()"></ion-icon>
            </div>
            <div class="user-quizz-container"></div>
            `;
        let userQuizzContainer = document.querySelector('.user-quizz-container');
        for (let i = 0; i < userQuizzList.length; i++) {
            userQuizzContainer.innerHTML += 
            `
            <div class="quizz" onclick="openUserQuizz(${i});">
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

function errorLog(error) {

    alert(error.data);
}

function loadingScreen() {
    let content = document.querySelector('.content');
    content.innerHTML = `
                        <div class="success-screen">
                        <h2>CARREGANDO...</h2>
                        <img class="loading" src="./assets/loading.gif" alt="">
                        </div>
                        `;
}

getQuizzes();
