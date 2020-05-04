//LOGOTIPE ACTION DOWN SCROLL TO MY GUIFOS ZONE
document.getElementById("logotipe").addEventListener("click", function () {
    window.scrollBy(0, 660);
});

//FUNCTION TO SHOW THE UPLOADE GIFS
window.onload = (paintingMyGuifos);
function paintingMyGuifos(){
for (let i = 0; i < localStorage.length; i++) {
    let urlfetch = "https://api.giphy.com/v1/gifs/";
    let apiKey = "?api_key=qf6ZWqRanwv9kIXXWpSxlQJmK2zf1UKA";
    if (localStorage.key(i)[0] == "i") {
        id = localStorage.getItem(localStorage.key(i));
        let url = urlfetch + id + apiKey;
        console.log(url);
        getById(url);
    };
};
}
function getById(url) {
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            data;            
            let urlTocreate = (data.data.images.downsized_large.url);
            let container = document.createElement("div");
            let gif = document.createElement("img");
            gif.setAttribute("src", urlTocreate);
            document.getElementById("containerGifs").appendChild(container);
            container.appendChild(gif)
            return data
        }).catch(error => {
            console.error("fetch failed", error);
        })
}