    let inputs, quizzInfo, lastSelectedDiv, lastSelectedIcon;
    let questionsInfo = [];
    let levelsInfo = [];
    let checkIfAnyLevelIsZero = 0;

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

    function loadLevels(){
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
                <ion-icon name="create-outline" onclick="editInfo(this)"></ion-icon>
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

    function editInfo(ionIcon){
        if (lastSelectedIcon !== undefined){
            lastSelectedIcon.classList.remove("hidden");
        }

        if (lastSelectedDiv !== undefined){
            lastSelectedDiv.classList.add("hidden");
        }

        let Options = ionIcon.nextElementSibling;
        Options.classList.remove("hidden");
        ionIcon.classList.add("hidden");
        lastSelectedIcon = ionIcon;
        lastSelectedDiv = Options;
    }

    function checkLevels (){
        let minValueEqualsZeroCounter = 0;

        for (let i = 1; i <= quizzInfo.levelsAmount; i++){

            levelsInfo = document.querySelector(`.level${i}`);
            let levelInputs = levelsInfo.querySelectorAll('input');
            let levelTextarea = levelsInfo.querySelectorAll('textarea');
            
            levelsInfo[i-1] =
            {
                title: levelInputs[0].value,
                minValue: Number(levelInputs[1].value),
                image : levelInputs[2].value,
                text: levelTextarea[0].value
            },

            console.log (levelsInfo[i-1]);
            console.log (minValueEqualsZeroCounter);
            
            if (levelsInfo[i-1].minValue === 0){
                minValueEqualsZeroCounter++;
                console.log("entrou no if");
            }

            if(levelsInfo[i-1].title.length<10 || !isUrlValid(levelsInfo[i-1].image) || levelsInfo[i-1].text<30 || levelsInfo[i-1].minValue<0 || levelsInfo[i-1].minValue>100 || isNaN(levelsInfo[i-1].minValue || minValueEqualsZeroCounter === 0)){
                alert('Verifique as suas configurações de level novamente...');
            } else {
                console.log("deu bom");
            }
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

    function isHexColor(hex){
        let reg=/^#([0-9a-f]{3}){1,2}$/i;
        return reg.test(hex);
    }