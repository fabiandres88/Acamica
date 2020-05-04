//CREATING VARIABLES
//GETING THEMES TO CHANGE IT
let changeTheme = document.getElementById("buttonTwo");
let themes = document.getElementById("menuThemes");
let selectThemeD = document.getElementsByClassName("day");
let selectThemeN = document.getElementsByClassName("night");
//GETTING INPUT SEARCH
let inputValue = document.getElementById("mySearch");
//GETTING BUTTON SEARCH
let listenSearch = document.querySelector("#buttonSearch")
//VARIABLR TO USE IN THE FETCH
var urlToFetch = "";
const requestDefault = "https://api.giphy.com/v1/gifs/";
const apiKey = "qf6ZWqRanwv9kIXXWpSxlQJmK2zf1UKA";

// LISTEN CLICK OVER THE CHOOSE GUIFOS TO SHOW ITS SUBMENU
changeTheme.addEventListener("click", function () {
	themes.style.display = isHidden(themes) ? "flex" : "none";
	changeTheme.style.height = "40px";
});

// LISTEN MOUSELEAVE OVER THE SUBMENU CHANGE THEME, TO HIDDEN IT
changeTheme.addEventListener("mouseleave", function () {
	themes.style.display = "none";
})

// LISTEN FOCUS OVER THE PLACEHOLDER IN THE INPUT SEARCH
// inputValue.addEventListener("focus", changeButtonSearch);
// inputValue.addEventListener("focusout", returnStyles);

// LISTEN FOCUS OVER THE PLACEHOLDER TO SHOW THE SUBMENU OF BUTTON SEARCH
inputValue.addEventListener("focus", subMenuSearch);
inputValue.addEventListener("focusout", () => {
	document.getElementById("subMenuSearch").style.display = "none";
});

// GETTING VALUE OF BUTTONS INTO THE SUBMENU SEARCH
let buttonSuggest1= document.getElementById("Result1");
let buttonSuggest2= document.getElementById("Result2");
let buttonSuggest3= document.getElementById("Result3");

// FUNCTION TO MANAGE THE SUBMENU IN THE FUNCTION SELECT THEME
function isHidden(element) {
	var style = window.getComputedStyle(element);
	return (style.display === 'none')
}
// FUNCTION TO CHANGES THE THEME TO DARK BY USERS
function darkThemeCall() {
	let divContainer=(document.getElementById('container'));
	if(divContainer.className == "light") {
		divContainer.className = "dark";
	}	
}
// FUNCTION TO CHANGES THE THEME TO LIGHT BY USERS
function lightThemeCall() {
	let divContainer =document.getElementById('container');
	if(divContainer.className == "dark") {
		divContainer.className = "light";
	}	
}
// FUNCTION TO CHANGE STYLES SEARCH BUTTON WHEN USER START THE SEARCH
function changeButtonSearch(e) {
	let hrefStyles = themeSelector.getAttribute("href");

	if (hrefStyles == "./Styles/LightStyles/Styles.css") {
		document.getElementById("mGlassImage").style.display = "none";
		document.getElementById("mGlass").style.display = "flex";
		document.getElementById("buttonContent").style.color = "#110038";
		document.getElementById("buttonSearch").style.backgroundColor = "#F7C9F3";
		document.getElementById("buttonSearch").style.border = "1px solid #110038";
		document.getElementById("buttonSearch").style.boxShadow = "-1px -1px 0 0 #997D97 inset";
		document.getElementById("buttonSearch").style.boxShadow = "1px 1px 0 0 #FFFFFF inset";
	}

	if (hrefStyles == "./Styles/DarkStyles/Styles2.css") {
		document.getElementById("mGlassImage").removeAttribute("src");
		document.getElementById("mGlassImage").setAttribute("src", "./Images/lupa.svg");
		document.getElementById("mGlassImageDark").style.display = "none";
		document.getElementById("mGlass").style.display = "none";
		document.getElementById("mGlassLight").style.display = "flex";
		document.getElementById("buttonContent").style.color = "#FFFFFF";
		document.getElementById("buttonSearch").style.backgroundColor = "#EE3EFE";
		document.getElementById("buttonSearch").style.border = "1px solid #110038";
		document.getElementById("buttonSearch").style.boxShadow = "-1px -1px 0 0 #A72CB3 inset";
		document.getElementById("buttonSearch").style.boxShadow = "1px 1px 0 0 #FFFFFF inset";
	}
	
}

function returnStyles(e) {
	let hrefDocument = themeSelector.getAttribute("href");

	if (hrefDocument == "./Styles/LightStyles/Styles.css") {
		document.getElementById("mGlassImage").style.display = "flex";
		document.getElementById("mGlass").style.display = "none";
		document.getElementById("buttonContent").style.color = "#B4B4B4";
		document.getElementById("buttonSearch").style.backgroundColor = "#E6E6E6";
		document.getElementById("buttonSearch").style.border = "1px solid #808080";
		document.getElementById("buttonSearch").style.boxShadow = "-1px -1px 0 0 #B4B4B4 inset";
		document.getElementById("buttonSearch").style.boxShadow = "1px 1px 0 0 #FFFFFF inset";
	}

	if (hrefDocument == "./Styles/DarkStyles/Styles2.css") {
		document.getElementById("mGlassImage").removeAttribute("src");
		document.getElementById("mGlassImage").setAttribute("src", "./Images/lupa.svg");
		document.getElementById("mGlassImageDark").style.display = "none";
		document.getElementById("mGlass").style.display = "none";
		document.getElementById("mGlassLight").style.display = "flex";
		document.getElementById("buttonContent").style.color = "#FFFFFF";
		document.getElementById("buttonSearch").style.backgroundColor = "#EE3EFE";
		document.getElementById("buttonSearch").style.border = "1px solid #110038";
		document.getElementById("buttonSearch").style.boxShadow = "-1px -1px 0 0 #A72CB3 inset";
		document.getElementById("buttonSearch").style.boxShadow = "1px 1px 0 0 #FFFFFF inset";
	}
	
}

// FUNCTION TO SHOW SUBMENU SEARCH
function subMenuSearch(e) {
	document.getElementById("subMenuSearch").style.display = "flex";
	document.getElementById("subMenuSearch").style.zIndex = "5";	
}

//LISTEN BUTTONS INTO THE SUBMENU SEARCH
console.log(buttonSuggest1);
buttonSuggest1.addEventListener("click",function (){
	let suggest1 =(buttonSuggest1.innerHTML);		
	localStorage.setItem("#"+buttonSuggest1.innerHTML,"#"+ buttonSuggest1.innerHTML);	
	urlToFetch = `${requestDefault}search?api_key=${apiKey}&q=${suggest1}&limit=29&offset=0&rating=G&lang=en`
	getGifsBySearch (urlToFetch);
});
// function autocompleteSearch () {
		
// }
buttonSuggest2.addEventListener("click",autocompleteSearch2);
function autocompleteSearch2 () {
	alert("ok")	
	let suggest2 =(buttonSuggest2.innerHTML);
	localStorage.setItem("#"+ buttonSuggest2.innerHTML, "#"+ buttonSuggest2.innerHTML);
	urlToFetch = `${requestDefault}search?api_key=${apiKey}&q=${suggest2}&limit=29&offset=0&rating=G&lang=en`
	getGifsBySearch (urlToFetch);
}
buttonSuggest3.addEventListener("click",autocompleteSearch3);
function autocompleteSearch3 () {
	let suggest3 =(buttonSuggest3.innerHTML);	
	localStorage.setItem("#"+ buttonSuggest3.innerHTML,"#"+ buttonSuggest3.innerHTML);	
	urlToFetch = `${requestDefault}search?api_key=${apiKey}&q=${suggest3}&limit=29&offset=0&rating=G&lang=en`
	getGifsBySearch (urlToFetch)
}

//FUNCTION TO START THE SEARCH BY AUTOCOMPLETE REQUEST
inputValue.addEventListener("keypress", suggestSearch);

function suggestSearch() {
	let valueSearch = document.getElementById("mySearch");
	let inputSearch = (valueSearch.value);
	urlToFetch = `${requestDefault}search/tags?api_key=${apiKey}&q=${inputSearch}&limit=3&offset=0&rating=G&lang=en`
	getSuggestSearch(urlToFetch);	
}

//GETTING SEARCH VALUE AN CALLING THE FETCH
listenSearch.addEventListener("click", gettingSearchValue);
function gettingSearchValue() {
	let stringSearch = document.querySelector("#mySearch");
	let valuesearch = (stringSearch.value);
	urlToFetch = `${requestDefault}search?api_key=${apiKey}&q=${valuesearch}&limit=25&offset=0&rating=G&lang=en`
	getGifsBySearch(urlToFetch);
	scrollDown();
}

//CALLING THE API WHEN THE PAGE IS CHARGING
window.onload = getGifsDefault(`${requestDefault}search?api_key=${apiKey}&q=colombia&limit=29&offset=0&rating=G&lang=en`);

// FUNCTION TO GET API REQUEST BY TAG
function getSuggestSearch(url) {
	return fetch(url)
		.then(response => {
			return response.json();
		})
		.then(data => {
			if (data.data.length > 0){
				for (let i=0; i<3; i++){
					let suggestTag = (data.data[i].name);			
					let Result1 = document.getElementById(`Result${i+1}`);
					Result1.innerHTML=suggestTag;						
				}
			}
			
			return data
		})
		.catch(error => {
			console.error("Fetch Failed", error);
		})
}

//FUNCTION TO GET REQUEST BY FETCH DEFAULT
function getGifsDefault(url) {
	return fetch(url)
		.then(response => {
			return response.json();
		})
		.then(data => {
			data;
			for (let i = 0; i <= 27; i++) {
				let gifGiphy = data.data[i];
				let gifInsertIn = document.getElementById(`gifSuggest${i + 1}`);
				let gifImg = document.createElement("img");
				gifImg.setAttribute("src", gifGiphy.images.original.url);
				gifInsertIn.append(gifImg);
				let gifTitle = data.data[i].title;
				let hashTag = "#";
				let getLimit = gifTitle.search("GIF");
				let newTitle = gifTitle.slice(0, getLimit);
				let endTitle = hashTag.concat(newTitle);
				let gifTitleInsert = document.getElementById(`hashtagGif${i + 1}`);
				gifTitleInsert.innerHTML = endTitle;
			}
			return data
		}).catch(error => {
			console.error("fetch failed", error);
		})
}
//FUNCTION TO GET REQUEST BY FETCH SEARCH
function getGifsBySearch(url) {
	return fetch(url)
		.then(response => {
			return response.json();
		})
		.then(data => {
			data;			

			for (let i = 5; i < 29; i++) {
				let gifGiphy = data.data[i];
				let gifInsertIn = document.getElementById(`gifSuggest${i}`);
				let gifTitle = data.data[i].title;
				let hashTag = "#";
				let getLimit = gifTitle.search("GIF");
				let newTitle = gifTitle.slice(0, getLimit);
				let endTitle = hashTag.concat(newTitle);
				let gifTitleInsert = document.getElementById(`hashtagGif${i}`);
				gifTitleInsert.innerHTML = endTitle;
				let toRemove = (gifInsertIn.childNodes[3]);
				gifInsertIn.removeChild(toRemove);
				let gifInsertNew = document.getElementById(`gifSuggest${i}`);
				let gifImg2 = document.createElement("img");
				gifImg2.setAttribute("src", gifGiphy.images.original.url);
				gifInsertNew.append(gifImg2);

			}
			return data
		}).catch(error => {
			console.error("fetch failed", error);
		})
}
//AFTER TO DO CLICK OVER THE LOGO GIFOS IN THE INDEX
document.getElementById("logotipe").addEventListener("click", function(){
	window.location.href = "../../Pages/Pre_Catch.html";	
});

//FUNCTION TO DO SCROLL DOWN AFTER A SEARCH
function scrollDown(){
	setTimeout(function (){
		window.scrollBy(0, 760);
	},3000);	
};