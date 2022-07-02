    let inputs;
    let quizzInfo;
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
            URL : inputs[1].value,
            questionAmount: Number(inputs[2].value),
            levelsAmount: Number(inputs[3].value)
        }
        
        if(quizzInfo.title.length<20 || quizzInfo.title.length>65 || !isUrlValid(quizzInfo.URL) || quizzInfo.questionAmount<3 || quizzInfo.levelsAmount<2){
            alert('Verifique as suas configurações de quiz novamente...');
        } else {
            loadQuestions();
        }

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
                    <div class="question${i}"> Pergunta ${i}
                        <div><input type="text" placeholder="Texto da pergunta" ></div>
                        <div><input type="text" placeholder="Cor de fundo da pergunta" ></div>
                        <div><input type="text" placeholder="URL da imagem do nível" ></div>
                        <div><input type="text" placeholder="Descrição do nível"></textarea></div>
                    </div>    
                </div>
            `; 
        }

        document.querySelector('.quizz-questions').innerHTML += 
        `
            <button onclick="loadquestionLevels();">Continuar...</button>
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
                    <div class="level${i}"> Nível ${i}
                        <div><input type="text" placeholder="Título do nível" ></div>
                        <div><input type="text" placeholder="% de acerto mínima" ></div>
                        <div><input type="text" placeholder="URL da imagem do nível" ></div>
                        <div><textarea rows="5" placeholder="Descrição do nível"></textarea></div>
                    </div>    
                </div>
            `; 
        }
        document.querySelector('.quizz-levels').innerHTML += 
        `
            <button onclick="">FinalizarQuizz</button>
        `
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