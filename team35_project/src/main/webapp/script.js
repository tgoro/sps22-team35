var wordsHistory;

window.addEventListener('DOMContentLoaded', async function() {
    var suggestions = document.getElementById("suggestions");
    wordsHistory = await (await fetch("/history")).json();
    var tempList = [];

    for (var i in wordsHistory) {
        tempList.push(wordsHistory[i]);
    }
    var suggestionsList = getRandomSubarray(tempList, 3);

    if (suggestionsList) {
        document.getElementById("text").innerText = "Commonly used phrases: ";
    }

    for (var i in suggestionsList) {
        var phrase = suggestionsList[i];
        suggestions.appendChild(createSuggestions(phrase));
    }

 }, false);

// get random commonly used sentences function
function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}


// create suggestions
function createSuggestions(content) {
    const liElement = document.createElement("li");
    liElement.innerText = content;
    liElement.onclick = function () {
        const translations = document.getElementById('inputText');
        translations.value = content;
    }
    return liElement;
}


// get history
async function getHistory() {
    wordsHistory = await (await fetch("/history")).json();
    let list = document.getElementById("history_list");
    list.innerHTML = '';
    let ol = document.createElement("OL");
    if (history) {
        if(wordsHistory.length > 12) {  //print last 11 words
            for(let i=0; i < 10; i++) {
                let li = document.createElement("li");
                li.innerText = wordsHistory[i];
                ol.appendChild(li);
            }
        }
        else {
            wordsHistory.forEach((item) => {  //print everything if the words are less than 12
                let li = document.createElement("li");
                li.innerText = item;
                ol.appendChild(li);
            })
        }
        list.appendChild(ol);
    }
  }

document.getElementById("phrase_history_btn").addEventListener("click", function () {
    getHistory()
})

// translating function
function addWord(event) {

    // prevent form from reloading the page
    event.preventDefault();

    // get input value
    var input = document.getElementById('inputText').value;

    // using ajax to post data to the datastore
    var data = {
        input: input
    }

    $.ajax({
        url: "/history",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8"
    }
    );

    // processing the input and output to the right screen
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
    img.loading = "lazy";
    img.decoding = "async";
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