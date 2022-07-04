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
    userId.push(answer.data.id)
    const str = JSON.stringify(userId)
    localStorage.setItem("listaIds",str)
    successScreen();
}

function successScreen(){
    let content = document.querySelector('.content');
    content.innerHTML = `
                        <div class="success-screen">
                        <h2>Seu quizz está pronto!</h2>
                        <div class="quizz">
                            <img src="${userQuizzList[userQuizzList.length-1].image}" alt="">
                            <h1>${userQuizzList[userQuizzList.length-1].title}</h1>
                        </div>
                        <div class="endOfPageButtons">
                            <button class="restart-quizz" onclick="openUserQuizz(${userQuizzList.length-1});">Acessar Quizz</button>
                            <button class="home" onclick="returnHome();">Voltar para home</button>
                        </div>
                        </div>
                        `;
}
