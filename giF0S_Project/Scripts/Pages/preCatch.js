//FUNCTION TO SHOW
window.onload = (paintingMyGuifos);
function paintingMyGuifos() {
    var element = [];
    for (let i = 0; i < localStorage.length; i++) {
        element.push(localStorage.getItem(localStorage.key(i)));
    };
    for (let i=0; i<element.length; i++){
        let container = document.createElement("div");
        let gif =document.createElement("img");
        gif.setAttribute("src", element[i]);
        document.getElementById("containerGifs").appendChild(container);
        container.appendChild(gif)
    }
}; 