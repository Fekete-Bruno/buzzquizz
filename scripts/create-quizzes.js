    let inputs, quizzInfo, levelInfo, lastSelectedLevelDiv, lastSelectedLevelIcon;
    let questionsInfo = [];

    function createQuizz(){
        console.log('Criando Quiz...');
        loadQuizzCreation();
    }

    function loadQuizzCreation(){
        document.querySelector('.content').innerHTML=
            `<div class="quizz-create">
                <h2>Começe pelo começo</h2>

                <div class="quizz-options">
                <div><input type="text" placeholder="Título do seu quiz" ></div>
                <div><input type="text" placeholder="URL da imagem do seu quiz" ></div>
                <div><input type="text" placeholder="Quantidade de perguntas do quizz" ></div>
                <div><input type="text" placeholder="Quantidade de níveis do quizz" ></div>
                </div>

                <button onclick="checkStart()">Prosseguir para criar perguntas</button>
            </div>  
            `; 
    }

    function checkStart(){
        inputs = document.querySelectorAll('input');
        quizzInfo = {
            title: inputs[0].value,
            image : inputs[1].value,
            questionAmount: Number(inputs[2].value),
            levelsAmount: Number(inputs[3].value)
        }
        
        if(quizzInfo.title.length<20 || quizzInfo.title.length>65 || !isUrlValid(quizzInfo.image) || quizzInfo.questionAmount<3 || quizzInfo.levelsAmount<2){
            alert('Verifique as suas configurações de quiz novamente...');
        } else {
            loadQuestions();
        }

    }

    function checkQuestions(){

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

    }

    
    function loadQuestions(){
        document.querySelector('.content').innerHTML = 
        `
        <div class="quizz-questions"> 
            <h2>Agora, decida os níveis!</h2>
        </div>
        `;

        for (let i = 1; i<=quizzInfo.questionAmount; i++){
            document.querySelector('.quizz-questions').innerHTML +=
            `
                <div class="question-options">
                
                    <div class="question${i}">
                    
                        <h2>Pergunta ${i}</h2>  
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
            <button onclick="checkQuestions();">Continuar...</button>
        `
    }
    

    function loadquestionLevels(){
        document.querySelector('.content').innerHTML = 
        `
        <div class="quizz-levels"> 
            <h2>Agora, decida os níveis!</h2>
        </div>
        `;

        for (let i = 1; i<=quizzInfo.levelsAmount; i++){
            document.querySelector('.quizz-levels').innerHTML +=
            `
            <div class="level-options">
                <h2>Nível ${i}</h2>
                <ion-icon name="create-outline" onclick="editLevelInfo(this)"></ion-icon>
                <div class="level${i} hidden" > 
                    <div><input type="text" placeholder="Título do nível" ></div>
                    <div><input type="text" placeholder="% de acerto mínima" ></div>
                    <div><input type="text" placeholder="URL da imagem do nível" ></div>
                    <div><textarea rows="6" placeholder="Descrição do nível"></textarea></div>
                </div>    
            </div>
            `;
        }

        document.querySelector('.quizz-levels').innerHTML += 
        `
        <button onclick="checkLevels()">FinalizarQuizz</button>
        `
    }

    function editLevelInfo(ionIcon){
        if (lastSelectedLevelIcon !== undefined){
            lastSelectedLevelIcon.classList.remove("hidden");
        }

        if (lastSelectedLevelDiv !== undefined){
            lastSelectedLevelDiv.classList.add("hidden");
        }

        let levelOptions = ionIcon.nextElementSibling;
        console.log(levelOptions);
        levelOptions.classList.remove("hidden");
        ionIcon.classList.add("hidden");
        lastSelectedLevelIcon = ionIcon;
        lastSelectedLevelDiv = levelOptions;
    }

    function checkLevels (){

        for (let i = 1; i < quizzInfo.levelsAmount; i++){

            levelInfo = document.querySelector(`.level${i}`);
            let levelInputs = levelInfo.querySelectorAll('input');
            let levelTextarea = levelInfo.querySelectorAll('textarea');
            
            levelInfo = {
                title: levelInputs[0].value,
                levelPercentage: Number(levelInputs[1].value),
                image : levelInputs[2].value,
                levelDescription: Number(levelTextarea[0].value)
            }
        }

        if(levelInfo.title.length<10 || !isUrlValid(levelInfo.image) || levelInfo.levelDescription<30 || levelInfo.levelPercentage<0 || levelInfo.levelPercentage>100){
            alert('Verifique as suas configurações de level novamente...');
        } else {
            console.log("deu bom");
        }
    }

    function isUrlValid(userInput) {
        let res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if(res == null){    
            return false;
        }
        else{
            return true;
        }
    }