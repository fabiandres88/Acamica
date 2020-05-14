document.getElementById("cancel").addEventListener("click",function(){
    window.location.href = "../../index.html";
});
document.getElementById("start").addEventListener("click",function(){
    window.location.href = "../../Pages/Catch.html";
});
//LOGOTIPE ACTION DOWN SCROLL TO MY GUIFOS ZONE
document.getElementById("logotipe").addEventListener("click", function () {
    window.scrollBy(0, 660);
});

//FUNCTION TO SHOW THE UPLOADE GIFS
window.onload = (paintingMyGuifos);
function paintingMyGuifos(){
for (let i = 0; i < localStorage.length; i++) {    
    if (localStorage.key(i)[0] == "i") {
       let id = localStorage.getItem(localStorage.key(i));
        getById(id);
    }
}
}

function getById(gifid) {
    
    let url = `https://api.giphy.com/v1/gifs/${gifid}?api_key=qf6ZWqRanwv9kIXXWpSxlQJmK2zf1UKA`;
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            data;
            let gifUrl = data.data.images.downsized_large ? data.data.images.downsized_large.url : data.data.images.orignal.url;                        
            let container = document.createElement("div");
            let gif = document.createElement("img");
            gif.setAttribute("src", gifUrl);
            document.getElementById("containerGifs").appendChild(container);
            container.appendChild(gif);
            return data;
        }).catch(error => {
            console.error("fetch failed", error);
        });
}