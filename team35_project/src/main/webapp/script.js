async function addTranslation() {
    const responseFromServer = await fetch("/translation", {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }}
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
function createListElement(text) {
    const liElement = document.createElement('li');
    liElement.innerText = text;
    return liElement;
  } 