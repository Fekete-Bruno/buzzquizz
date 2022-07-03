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
    successScreen();
    console.log('alright');
    console.log(answer);
}

function successScreen(){
    let content = document.querySelector('.content');
    content.innerHTML = `
                        <div class="success-screen">
                        <h2>Seu quizz está pronto!</h2>
                        <div class="quizz">
                            <img src="./assets/simpsons.jpg" alt="">
                            <h1>Acerte os personagens corretos dos Simpsons e prove seu amor!</h1>
                        </div>
                        <div>
                            <button class="restart-quizz" onclick="">Acessar Quizz</button>
                            <button class="home" onclick="returnHome()">Voltar para home</button>
                        </div>
                        </div>
                        `;
}