function preparePost(){

    let postObject = {
        title: quizzInfo.title,
        image: quizzInfo.image,
        questions: questionsInfo,
        levels: levelsInfo
    }

    const promise = axios.post(apiUrl,postObject);
    promise.catch(errorLog);
    promise.then(postSuccess);
}

function postSuccess(answer) {
    userQuizzList.push(answer.data)
    successScreen();
}

function successScreen(){
    let content = document.querySelector('.content');
    content.innerHTML = `
                        <div class="success-screen">
                        <h2>Seu quizz está pronto!</h2>
                        <div class="quizz">
                            <img src="${userQuizzList[userQuizzList.lenght-1].image}" alt="">
                            <h1>${userQuizzList[userQuizzList.lenght-1].title}</h1>
                        </div>
                        <div>
                            <button class="restart-quizz" onclick="openUserQuizz(${userQuizzList.length-1});">Acessar Quizz</button>
                            <button class="home" onclick="returnHome();">Voltar para home</button>
                        </div>
                        </div>
                        `;
}
