    let inputs, quizzInfo, lastSelectedDiv, lastSelectedIcon;
    let questionsInfo = [];
    let levelsInfo = [];
    let checkIfAnyLevelIsZero = 0;
    let minValueEqualsZeroCounter = 0;

    function createQuizz(){
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