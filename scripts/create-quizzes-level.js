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
    <button onclick="saveLevels()">FinalizarQuizz</button>
    `
}

function saveLevels (){
    minValueEqualsZeroCounter = 0;
    levelsInfo = [];

    for (let i = 1; i <= quizzInfo.levelsAmount; i++){

        let levelsNumber = document.querySelector(`.level${i}`);
        let levelInputs = levelsNumber.querySelectorAll('input');
        let levelTextarea = levelsNumber.querySelectorAll('textarea');
        
        levelsInfo.push(
            {
            title: levelInputs[0].value,
            minValue: Number(levelInputs[1].value),
            image : levelInputs[2].value,
            text: levelTextarea[0].value
            }
        );
        
        if (levelsInfo[i-1].minValue === 0){
            minValueEqualsZeroCounter++;
        }

    }
    checkLevels();
    
}
    
function checkLevels() {
    let condition = true;

    levelsInfo.forEach(element => {
        
        if (element.title.length<10){
            condition = false;
        }
        if (!isUrlValid(element.image)){
            condition = false;
        }
        if (element.text<30){
            condition = false;
        }
        if (element.minValue<0){
            condition = false;
        }
        if (element.minValue>100){
            condition = false;
        }
        if (isNaN(element.minValue)){
            condition = false;
        }
        if (minValueEqualsZeroCounter === 0){
            condition = false;
        }

    });

    if (condition) {
        console.log("vai pra 3.4")
    } else {
        alert('Verifique os campos novamente...')
    }

}