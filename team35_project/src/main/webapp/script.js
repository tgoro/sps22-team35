function addWord() {
    const translations = document.getElementById('results');
    if (translations) translations.innerHTML = '';

    var results = document.getElementById('inputText').value;

    results = results.trim();
    results = results.split(" ");

    for (var i = 0; i < results.length; i++) {
        
        var word = results[i].replace(/[^a-z]/gi, '').toLowerCase();
        if (word == "") continue;
        console.log(word);
    }
}

/** Creates an <li> element containing text. */
function createListElement(text) {
    const liElement = document.createElement('li');
    liElement.innerText = text;
    return liElement;
  }

