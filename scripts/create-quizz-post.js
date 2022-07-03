function preparePost(){
    
    let postObject = {
        title: quizzInfo.title,
        image: quizzInfo.image,
        questions: questionsInfo,
        levels: levelsInfo
    }
    console.log(postObject);
}