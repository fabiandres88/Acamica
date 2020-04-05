//GETTING THEME 2
/*let ThemesSelector = document.querySelector("#themes");
console.log(ThemesSelector);
let Theme2= ThemesSelector[2];
console.log(Theme2);*/

//CREATING VARIABLES
//GETTING FIRST ITEM IN SECTION GIFS
var FirstGif = document.querySelector("#first");
var Gif1 = FirstGif.firstElementChild;
console.log(Gif1)
//GETTING BUTTON
let ListenSearch = document.querySelector("#ButtonSearch")
//VARIABLR TO USE IN THE FETCH
var UrlToFetch = "";

//GETTING SEARCH VALUE AN CALLING THE FETCH
ListenSearch.addEventListener("click", function () {
	let StringSearch = document.querySelector("#mySearch");
	let Valuesearch = (StringSearch.value);
	console.log(Valuesearch)
	UrlToFetch = `https://api.giphy.com/v1/gifs/search?api_key=qf6ZWqRanwv9kIXXWpSxlQJmK2zf1UKA&q=${Valuesearch}&limit=25&offset=0&rating=G&lang=en`
	GetGifsBySearch(UrlToFetch);
});

//FUNCTION TO GET REQUEST BY FETCH
function GetGifsBySearch(url) {
	return fetch(url)
		.then(response => {
			return response.json();
		})
		.then(data => {
			data;
			console.log(data);
			console.log(data.data);
			console.log(data.data[0]);
			console.log(data.data[0].embed_url);
			Gif1.setAttribute("src", data.data[0].embed_url);
			Gif1.setAttribute("style", "width: 280px");
			Gif1.setAttribute("style", "height: 280px");
			return data
		}).catch(error => {
			console.error("fetch failed", error);
		})
}