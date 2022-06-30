    let inputs;
    let obj;
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
        obj = {
            title: inputs[0].value,
            URL : inputs[1].value,
            questionAmount: inputs[2].value,
            levelsAmount: inputs[3].value
        }

        if(obj.title.length<20 || obj.title.length>65 || !isUrlValid(obj.URL) || obj.questionAmount<3 || obj.levelsAmount<2){
            alert('Verifique as suas configurações de quiz novamente...');
        } else {
            /* Aqui deve ativar a próxima tela */
            console.log('true');
        }

    }

    /*
    function questionLog(){

    }
    */
   
    function isUrlValid(userInput) {
        let res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if(res == null){    
            return false;
        }
        else{
            return true;
        }
    }