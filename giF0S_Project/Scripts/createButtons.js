//FUNCTION TO CREATE THE BUTTONS AFTER THE SEARCH

for (let i=0; i<localStorage.length; i++){
    if (localStorage.key(i)[0] == "#"){        
    let saveButton = document.createElement("button");
	let container = document.getElementById("buttonsContainer");
    container.append(saveButton);
    container.firstElementChild.innerHTML=(localStorage.getItem(localStorage.key(i)));
    container.style.display = "flex";
	// saveButton.style.width = "100px";			
	// saveButton.style.height = "36px";
    // saveButton.style.color = "#110038";
    // saveButton.style.backgroundColor = "#4180F6";	
    }
}

//FUNCTION TO DO A SEARCHBY TAG AFTER THE USER PUSH THE SEE MORE BUTTON

document.getElementsByTagName("button")[7].addEventListener("click",function(){    
    urlToFetch = `${requestDefault}search?api_key=${apiKey}&q=${document.getElementsByTagName("p")[1].innerHTML}&limit=29&offset=0&rating=G&lang=en`
	getGifsBySearch (urlToFetch)
});
document.getElementsByTagName("button")[9].addEventListener("click", function (){    
    urlToFetch = `${requestDefault}search?api_key=${apiKey}&q=${document.getElementsByTagName("p")[2].innerHTML}&limit=29&offset=0&rating=G&lang=en`
	getGifsBySearch (urlToFetch)
})
document.getElementsByTagName("button")[11].addEventListener("click", function (){    
    urlToFetch = `${requestDefault}search?api_key=${apiKey}&q=${document.getElementsByTagName("p")[3].innerHTML}&limit=29&offset=0&rating=G&lang=en`
	getGifsBySearch (urlToFetch)
})
document.getElementsByTagName("button")[13].addEventListener("click", function (){
    document.getElementsByTagName("p")[4];
})