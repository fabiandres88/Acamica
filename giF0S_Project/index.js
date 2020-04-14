//CREATING VARIABLES

//GETING THEMES TO CHANGE IT
let changeTheme = document.getElementById("themes");
let selectThemeD = document.getElementsByClassName("day");
let selectThemeN = document.getElementsByClassName("night");

//GETTING BUTTON
let inputValue = document.getElementById("mySearch");

//GETTING BUTTON
let listenSearch = document.querySelector("#buttonSearch")

//VARIABLR TO USE IN THE FETCH
var urlToFetch = "";

//TODO: FR- CREATE CONST TO ORGANIZE THE URLS DEFINITION   

// LISTEN CLICK OVER THE CREATE GUIFOS TO SHOW ITS SUBMENU
changeTheme.addEventListener("click", function (event) {
	let themes = document.getElementById("menuThemes");
	themes.style.display = "flex";
});

// LISTEN FOCUS OVER THE PLACEHOLDER IN THE INPUT SEARCH
inputValue.addEventListener("focus", changeButtonSearch),

// LISTEN FOCUS OVER THE PLACEHOLDER TO SHOW THE SUBMENU OF BUTTON SEARCH
inputValue.addEventListener("focus", subMenuSearch);

// FUNCTION TO CHANGES THE THEME TO DARK BY USERS
function darkThemeCall() {
	document.getElementById('themeSelector').href = './Theme2/Styles2/Styles2.css';
}
// FUNCTION TO CHANGES THE THEME TO LIGHT BY USERS
function lightThemeCall() {
	document.getElementById('themeDarkSelect').href = "./Styles/Styles.css";
}

// FUNCTION TO CHANGE STYLES SEARCH BUTTON WHEN USER START THE SEARCH
function changeButtonSearch () {
	listenSearch.removeAttribute("id","buttonSearch");
	listenSearch.setAttribute("id","buttonSearchInput");
	document.getElementById("mGlassImage").removeAttribute("src");
	document.getElementById("mGlassImage").setAttribute("src", "./Images/lupa.svg");
}

// FUNCTION TO SHOW SUBMENU SEARCH
function subMenuSearch () {
	document.getElementById("subMenuSearch").style.display = "flex";
	document.getElementById("subMenuSearch").style.zIndex = "5";
}

//GETTING SEARCH VALUE AN CALLING THE FETCH
listenSearch.addEventListener("click", gettingSearchValue);
function gettingSearchValue() {
	let stringSearch = document.querySelector("#mySearch");
	let valuesearch = (stringSearch.value);
	urlToFetch = `https://api.giphy.com/v1/gifs/search?api_key=qf6ZWqRanwv9kIXXWpSxlQJmK2zf1UKA&q=${valuesearch}&limit=25&offset=0&rating=G&lang=en`
	getGifsBySearch(urlToFetch);
}

window.onload = getGifsBySearch("https://api.giphy.com/v1/gifs/search?api_key=qf6ZWqRanwv9kIXXWpSxlQJmK2zf1UKA&q=coding&limit=28&offset=0&rating=G&lang=en");

//FUNCTION TO GET REQUEST BY FETCH
// function getGifByRandomToPreview(url){
// 	return fetch(url)
// 	.then (response => {
// 		return response.json();
// 	})
// 	.then(data => {
// 		data;
// 		console.log(data);
// 	return data
// }).catch (error => {
// 	console.error("fetch failed", error);
// })	
// }

//FUNCTION TO GET REQUEST BY FETCH
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
				let gifInsertIn = document.getElementById(`gifSuggest${i + 1}`);
				let gifImg = document.createElement("img");
				gifImg.setAttribute("src", gifGiphy.images.original.url);
				gifInsertIn.append(gifImg);
				let gifTitle = data.data[i].title;
				let gifTitleInsert=document.getElementById(`hashtagGif${i+1}`);
				gifTitleInsert.innerHTML=gifTitle;
			}
			return data
		}).catch(error => {
			console.error("fetch failed", error);
		})
}