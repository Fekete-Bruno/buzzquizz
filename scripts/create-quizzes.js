    function createQuizz(){
        console.log('Criando Quiz...');
        loadQuizzCreation();
    }

    function loadQuizzCreation(){
        document.querySelector('.content').innerHTML=
            `<div class="quizz-create">
                <h2>Começe pelo começo</h2>

                <div class="quizz-options">
                <div><input type="text" placeholder="Título do seu quiz"></div>
                <div><input type="text" placeholder="URL da imagem do seu quiz"></div>
                <div><input type="text" placeholder="Quantidade de perguntas do quizz"></div>
                <div><input type="text" placeholder="Quantidade de níveis do quizz"></div>
                </div>

                <button>Prosseguir para criar perguntas</button>
            </div>
            `; 


    }