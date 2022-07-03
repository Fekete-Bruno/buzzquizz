function saveQuestions(){
    questionsInfo = [];
    for (let index = 1; index <= quizzInfo.questionAmount; index++) {

        let questionN = document.querySelector(`.question${index}`);
        inputs = questionN.querySelectorAll('input');
        

        questionsInfo.push({
            title: inputs[0].value,
            color : inputs[1].value,
            answers:[
                {
                    text: inputs[2].value,
                    image: inputs[3].value,
                    isCorrectAnswer: true
                },
                {
                    text: inputs[4].value,
                    image: inputs[5].value,
                    isCorrectAnswer: false
                },
                {
                    text: inputs[6].value,
                    image: inputs[7].value,
                    isCorrectAnswer: false
                },
                {
                    text: inputs[8].value,
                    image: inputs[9].value,
                    isCorrectAnswer: false
                }
            ]
        });
        
    }

    
    console.log(questionsInfo);
    checkQuestions();
}

function checkQuestions() {
    let condition = true;
    questionsInfo.forEach(element => {
            if (element.title.length<20){
                condition = false;
            }
            if (!isHexColor(element.color)){
                condition = false;
            }
    });
    console.log(condition);
    loadLevels();
}
    
function loadQuestions(){
    document.querySelector('.content').innerHTML = 
    `
    <div class="quizz-questions"> 
        <h2>Agora, escreva suas perguntas!</h2>
    </div>
    `;

    for (let i = 1; i<=quizzInfo.questionAmount; i++){
        document.querySelector('.quizz-questions').innerHTML +=
        `
            <div class="question-options">
                <h2>Pergunta ${i}</h2>  
                <ion-icon name="create-outline" onclick="editInfo(this)"></ion-icon> 
                
                <div class="question${i} hidden">

                    <div><input type="text" placeholder="Texto da pergunta" ></div>
                    <div><input type="text" placeholder="Cor de fundo da pergunta" ></div>

                    <h2>Resposta correta</h2>
                    <div><input type="text" placeholder="Resposta correta" ></div>
                    <div><input type="text" placeholder="URL da imagem" ></div>

                    <h2>Resposta incorretas</h2>
                    <div><input type="text" placeholder="Resposta incorreta 1" ></div>
                    <div><input type="text" placeholder="URL da imagem 1" ></div>

                    <div><input type="text" placeholder="Resposta incorreta 2" ></div>
                    <div><input type="text" placeholder="URL da imagem 2" ></div>

                    <div><input type="text" placeholder="Resposta incorreta 3" ></div>
                    <div><input type="text" placeholder="URL da imagem 3" ></div>

                </div>

            </div>
        `; 
    }

    document.querySelector('.quizz-questions').innerHTML += 
    `
        <button onclick="saveQuestions();">Continuar...</button>
    `
}
