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
            questionAmount: Number(inputs[2].value),
            levelsAmount: Number(inputs[3].value)
        }

        if(obj.title.length<20 || obj.title.length>65 || !isUrlValid(obj.URL) || obj.questionAmount<3 || obj.levelsAmount<2){
            alert('Verifique as suas configurações de quiz novamente...');
        } else {
            loadquestionLevels();
        }

    }

    /*
    function loadQuestions(){

    }
    */

    function loadquestionLevels(){
        document.querySelector('.content').innerHTML =
            `
            <div class="quizz-levels">
                <h2>Agora, decida os níveis!</h2>

                <div class="level-options">
                    <div class="level1"> Nível 1
                        <div><input type="text" placeholder="Título do nível" ></div>
                        <div><input type="text" placeholder="% de acerto mínima" ></div>
                        <div><input type="text" placeholder="URL da imagem do nível" ></div>
                        <div><textarea rows="5" placeholder="Descrição do nível"></textarea></div>
                    </div>    
                </div>

                <button onclick="">FinalizarQuizz</button>
            </div>
            `; 
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