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

// LISTEN CLICK OVER THE CREATE GUIFOS TO SHOW ITS SUBMENU
changeTheme.addEventListener("click", function () {
	themes.style.display = isHidden(themes) ? "flex" : "none";
	changeTheme.style.height = "40px";
});

// LISTEN MOUSELEAVE OVER THE SUBMENU CHANGE THEME, TO HIDDEN IT
changeTheme.addEventListener("mouseleave", function () {
	themes.style.display = "none";
})
let botones = document.getElementById("buttonSearch");

// LISTEN FOCUS OVER THE PLACEHOLDER IN THE INPUT SEARCH
inputValue.addEventListener("focus", changeButtonSearch);
inputValue.addEventListener("focusout", returStyles);

// LISTEN FOCUS OVER THE PLACEHOLDER TO SHOW THE SUBMENU OF BUTTON SEARCH
inputValue.addEventListener("focus", subMenuSearch);
inputValue.addEventListener("focusout", () => {
	document.getElementById("subMenuSearch").style.display = "none";
});

// FUNCTION TO MANAGE THE SUBMENU IN THE FUNCTION SELECT THEME
function isHidden(element) {
	var style = window.getComputedStyle(element);
	return (style.display === 'none')
}
// FUNCTION TO CHANGES THE THEME TO DARK BY USERS
function darkThemeCall() {
	document.getElementById('themeSelector').href = '../Styles/DarkStyles/Styles2.css';
	// e.stopPropagation();
}
// FUNCTION TO CHANGES THE THEME TO LIGHT BY USERS
function lightThemeCall() {
	document.getElementById('themeSelector').href = "../Styles/LightStyles/Styles.css";
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
	e.stopPropagation();
}

function returStyles(e) {
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
	e.stopPropagation();
}

// FUNCTION TO SHOW SUBMENU SEARCH
function subMenuSearch(e) {
	document.getElementById("subMenuSearch").style.display = "flex";
	document.getElementById("subMenuSearch").style.zIndex = "5";
	e.stopPropagation();
}

//GETTING SEARCH VALUE AN CALLING THE FETCH
listenSearch.addEventListener("click", gettingSearchValue);
function gettingSearchValue() {
	let stringSearch = document.querySelector("#mySearch");
	let valuesearch = (stringSearch.value);
	urlToFetch = `${requestDefault}search?api_key=${apiKey}&q=${valuesearch}&limit=25&offset=0&rating=G&lang=en`
	getGifsBySearch(urlToFetch);
}

//CALLING THE API WHEN THE PAGE IS CHARGING
window.onload = getGifsDefault(`${requestDefault}search?api_key=${apiKey}&q=colombia&limit=29&offset=0&rating=G&lang=en`);

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
				let gifTitleInsert = document.getElementById(`hashtagGif${i + 1}`);
				gifTitleInsert.innerHTML = gifTitle;
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
			console.log(data);
			console.log(data.data);
			console.log(data.data[0]);
			console.log(data.data[0].source);

			for (let i = 0; i <= 27; i++) {
				let gifGiphy = data.data[i];
				let gifInsertIn = document.getElementById(`gifSuggest${i+5}`);
				let gifTitle = data.data[i].title;
				let gifTitleChange = document.getElementById(`hashtagGif${i+5}`);
				gifTitleChange.innerHTML = gifTitle;
				let toRemove = (gifInsertIn.childNodes[3]);
				gifInsertIn.removeChild(toRemove);
				let gifInsertNew = document.getElementById(`gifSuggest${i+5}`);
				let gifImg2 = document.createElement("img");				
				gifImg2.setAttribute("src", gifGiphy.images.original.url);
				gifInsertNew.append(gifImg2);
								
			}
			return data
		}).catch(error => {
			console.error("fetch failed", error);
		})
}