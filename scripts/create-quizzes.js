    let inputs;
    let quizzInfo;
    let lastSelectedLevelIcon;
    let lastSelectedLevelDiv;

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
            loadquestionLevels();
        }

    }

    
    /*function loadQuestions(){

    }*/
    

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
        <button onclick="">FinalizarQuizz</button>
        `
    }

    function editLevelInfo(ionIcon){
        if (lastSelected !== undefined){
            lastSelected.classList.remove("hidden");
        }

        if (lastSelected2 !== undefined){
            lastSelected2.classList.add("hidden");
        }

        let levelOptions = ionIcon.nextElementSibling;
        console.log(levelOptions);
        levelOptions.classList.remove("hidden");
        ionIcon.classList.add("hidden");
        lastSelectedLevelIcon = ionIcon;
        lastSelectedLevelDiv = levelOptions;
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