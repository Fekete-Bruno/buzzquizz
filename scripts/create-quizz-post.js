function preparePost(){

    let postObject = {
        title: quizzInfo.title,
        image: quizzInfo.image,
        questions: questionsInfo,
        levels: levelsInfo
    }

    const promise = axios.post(apiUrl,postObject);
    promise.catch(errorLog);
    promise.then(postSuccess);
}

function postSuccess(answer) {
    console.log('alright');
    console.log(answer);
}