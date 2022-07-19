function addWord() {
    const translations = document.getElementById('results');
    if (translations) translations.innerHTML = '';

    var input = document.getElementById('inputText').value;

    input = input.trim().toLowerCase();
    input = input.replaceAll("\n", " ");
    input = input.split(" ");

    var words = [];

    for (var i = 0; i < input.length; i++) {
        var word = input[i].replace(/[^a-z]/gi, '');
        if (word == "") continue;
        words.push(word);
    }

    for (var i = 0; i < words.length; i++) {
        for (var j = 0; j < words[i].length; j++) {
            translations.appendChild(createListElement("./resources/images/" + words[i][j] + ".png"));
        }
        translations.appendChild(createListElement("empty"));
    }
}
async function addTranslation() {
    const responseFromServer = await fetch("/translation", {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    );
    const results = await responseFromServer.json();
    const translations = document.getElementById('results');
    translations.innerHTML = '';

    for (var i = 0; i < results.length; i++) {
        translations.appendChild(
            createListElement(results[i].result));
    }
}

/** Creates an <li> element containing text. */
function createListElement(source) {
    const liElement = document.createElement('li');
    if (source === "empty") {
        const ele = document.createElement("br");
        liElement.appendChild(ele);
        liElement.appendChild(ele);
        return liElement;
    }
    const img = document.createElement("img");
    img.src = source;
    liElement.appendChild(img);
    return liElement;
}

/**Quiz Results Function For Special Page */
function quizResults() {
    var quizLength = 5;
    var quizScore = 0;

    if (document.getElementById('correct1').checked) {
        quizScore++;
    }
    if (document.getElementById('correct2').checked) {
        quizScore++;
    }
    if (document.getElementById('correct3').checked) {
        quizScore++;
    }
    if (document.getElementById('correct4').checked) {
        quizScore++;
    }
    if (document.getElementById('correct5').checked) {
        quizScore++;
    }

    if (quizScore === 0) {
        alert("Your Score For This Quiz Is: " + quizScore + " out of " + quizLength + ". A Zero? Ouch...");
    }
    else if (quizScore === 1) {
        alert("Your Score For This Quiz Is: " + quizScore + " out of " + quizLength + ". Not a zero, but should hit the books...");
    }
    else if (quizScore === 2) {
        alert("Your Score For This Quiz Is: " + quizScore + " out of " + quizLength + ". Better than nothing...");
    }
    else if (quizScore === 3) {
        alert("Your Score For This Quiz Is: " + quizScore + " out of " + quizLength + ". 60% isn't too bad.");
    }
    else if (quizScore === 4) {
        alert("Your Score For This Quiz Is: " + quizScore + " out of " + quizLength + ". Not too shabby!");
    }
    else if (quizScore === 5) {
        alert("Your Score For This Quiz Is: " + quizScore + " out of " + quizLength + ". You really know your stuff!");
    }
    window.location.reload();

}