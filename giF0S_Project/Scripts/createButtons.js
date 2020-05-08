//FUNCTION TO CREATE THE BUTTONS AFTER THE SEARCH

for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i)[0] == "#") {
        let searchText = (localStorage.getItem(localStorage.key(i)));
        let saveButton = document.createElement("button");
        let container = document.getElementById("buttonsContainer");
        saveButton.innerHTML = searchText;
        saveButton.onclick = function () {
            let urlToFetch = `${requestDefault}search?api_key=${apiKey}&q=${searchText.substring(1)}&limit=29&offset=0&rating=G&lang=en`;
            getGifsBySearch(urlToFetch);
        };
        container.append(saveButton);
        container.style.display = "block";
    }
}