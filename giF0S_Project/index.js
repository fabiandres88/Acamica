//GETTING THEME 2
/*let ThemesSelector = document.querySelector("#themes");
console.log(ThemesSelector);
let Theme2= ThemesSelector[2];
console.log(Theme2);*/

//CREATING VARIABLES
//GETTING FIRST ITEM IN SECTION GIFS
// var FirstGif = document.querySelector("#first");
// var Gif1 = FirstGif.firstElementChild;
// console.log(Gif1)
//GETING THEMES TO CHANGE IT
let changeTheme= document.getElementById("themes");

//GETTING BUTTON
let ListenSearch = document.querySelector("#buttonSearch")
//VARIABLR TO USE IN THE FETCH
var UrlToFetch = "";
//TODO: FR- CREATE CONST TO ORGANIZE THE URLS DEFINITION   

changeTheme.addEventListener("change", changeThemes);
// FUNCTION TO CHANGES THE THEME BY USERS
function changeThemes (){
	if (changeTheme.value == "Theme2"){
		document.getElementById('themeDarkSelect').href = './Theme2/Styles2/Styles2.css';		
	}
	if (changeTheme.value == "Theme1"){
		document.getElementById('themeDarkSelect').href = "./Styles/Styles.css";		
	}		
}

//GETTING SEARCH VALUE AN CALLING THE FETCH
ListenSearch.addEventListener("click", gettingSearchValue);

function gettingSearchValue (){
	let StringSearch = document.querySelector("#mySearch");
	let Valuesearch = (StringSearch.value);
	UrlToFetch = `https://api.giphy.com/v1/gifs/search?api_key=qf6ZWqRanwv9kIXXWpSxlQJmK2zf1UKA&q=${Valuesearch}&limit=25&offset=0&rating=G&lang=en`
	getGifsBySearch(UrlToFetch);
}

window.onload=getGifsBySearch("https://api.giphy.com/v1/gifs/search?api_key=qf6ZWqRanwv9kIXXWpSxlQJmK2zf1UKA&q=coding&limit=28&offset=0&rating=G&lang=en");

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
						
			for (let i=0; i<=27; i ++ ){
				let gifGiphy=data.data[i];
				let gifInsertIn=document.getElementById(`gifSuggest${i+1}`);
				let gifImg=document.createElement("img");
				gifImg.setAttribute("src", gifGiphy.images.original.url);
				gifInsertIn.append(gifImg);
				let gifTitle= data.data[i].title;
				// let gifTitleInsert=document.getElementById(`hashtagGif${i+1}`);
				// gifTitleInsert.innerHTML=gifTitle;
			}
			return data
		}).catch(error => {
			console.error("fetch failed", error);
		})
}