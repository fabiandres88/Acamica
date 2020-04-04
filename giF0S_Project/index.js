//GETTING THEME 2
/*let ThemesSelector = document.querySelector("#themes");
console.log(ThemesSelector);
let Theme2= ThemesSelector[2];
console.log(Theme2);*/

//Getting the search value

let StringSearch = document.querySelector("#mySearch");
let x=StringSearch.addEventListener=  () => {
	console.log(StringSearch.value);
	
	
	return (StringSearch.value)
	
}
GetGifsBySearch(x);
let MyGifBySearch= new Array ();

function GetGifsBySearch(Search) {
	return		fetch(`http://api.giphy.com/v1/gifs/search?q=${Search}&api_key=qf6ZWqRanwv9kIXXWpSxlQJmK2zf1UKA`)
			.then(response => {
				return response.json();
			})
				.then(data => {
					data
					console.log(data);
					console.log(data.data);
					console.log(data.data[0]);
					console.log(data.data[0].embed_url);
					let Divimg1=document.querySelector("#first");
					let Img1=Divimg1.firstElementChild;
					console.log(Img1);
					Img1.setAttribute("src" , data.data[0].bitly_gif_url);

					

					return data
				}).catch(error => {
					console.error("fetch failed", error);
				})
				
}
