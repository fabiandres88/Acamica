//CREATING VARIABLES
//GETING THEMES TO CHANGE IT
let changeTheme = document.getElementById("buttonTwo");
let themes = document.getElementById("menuThemes");
let selectThemeD = document.getElementsByClassName("day");
let selectThemeN = document.getElementsByClassName("night");
//GETTING INPUT SEARCH
let inputValue = document.getElementById("mySearch");
//GETTING BUTTON SEARCH
let listenSearch = document.querySelector("#buttonSearch");
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
});

// LISTEN FOCUS OVER THE PLACEHOLDER TO SHOW THE SUBMENU OF BUTTON SEARCH
inputValue.addEventListener("focus", subMenuSearch);
inputValue.addEventListener("focusout", () => {
	setTimeout(() => {
		document.getElementById("subMenuSearch").style.display = "none";
	}, 200);
});

// GETTING VALUE OF BUTTONS INTO THE SUBMENU SEARCH
let buttonSuggest1 = document.getElementById("Result1");
let buttonSuggest2 = document.getElementById("Result2");
let buttonSuggest3 = document.getElementById("Result3");

// FUNCTION TO MANAGE THE SUBMENU IN THE FUNCTION SELECT THEME
function isHidden(element) {
	var style = window.getComputedStyle(element);
	return (style.display === 'none');
}
// FUNCTION TO CHANGES THE THEME TO DARK BY USERS
function darkThemeCall() {
	let divContainer = (document.getElementById('container'));
	if (divContainer.className == "light") {
		divContainer.className = "dark";
	}
}
// FUNCTION TO CHANGES THE THEME TO LIGHT BY USERS
function lightThemeCall() {
	let divContainer = document.getElementById('container');
	if (divContainer.className == "dark") {
		divContainer.className = "light";
	}
}

// FUNCTION TO SHOW SUBMENU SEARCH
function subMenuSearch() {
	document.getElementById("subMenuSearch").style.display = "flex";
	document.getElementById("subMenuSearch").style.zIndex = "5";
}

function autocompleteSearch() {
	let suggest = (this.innerHTML);
	inputValue.value = suggest;
	localStorage.setItem('#' + suggest, '# ' + suggest);
	getGifsBySearch(suggest);
}

buttonSuggest1.onclick = autocompleteSearch;
buttonSuggest2.onclick = autocompleteSearch;
buttonSuggest3.onclick = autocompleteSearch;

//FUNCTION TO START THE SEARCH BY AUTOCOMPLETE REQUEST
inputValue.addEventListener("keypress", suggestSearch);

inputValue.addEventListener("search", gettingSearchValue);

function suggestSearch() {
	let valueSearch = document.getElementById("mySearch");
	let inputSearch = (valueSearch.value);
	urlToFetch = `${requestDefault}search/tags?api_key=${apiKey}&q=${inputSearch}&limit=3&offset=0&rating=G&lang=en`;
	getSuggestSearch(urlToFetch);
}

//GETTING SEARCH VALUE AN CALLING THE FETCH
listenSearch.addEventListener("click", gettingSearchValue);
function gettingSearchValue() {
	let stringSearch = document.querySelector("#mySearch");
	let valuesearch = (stringSearch.value);
	getGifsBySearch(valuesearch);
	scrollDown();
}

//CALLING THE API WHEN THE PAGE IS CHARGING
window.onload = getGifsBySearch(`${requestDefault}search?api_key=${apiKey}&q=colombia&limit=29&offset=0&rating=G&lang=en`);

// FUNCTION TO GET API REQUEST BY TAG
function getSuggestSearch(url) {
	return fetch(url)
		.then(response => {
			return response.json();
		})
		.then(data => {
			if (data.data.length > 0) {
				for (let i = 0; i < 3; i++) {
					let suggestTag = (data.data[i].name);
					let resultButton = document.getElementById(`Result${i + 1}`);
					resultButton.innerHTML = suggestTag;
				}
			}
			return data;
		})
		.catch(error => {
			console.error("Fetch Failed", error);
		});
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function updateGifElement(gifGiphy, index) {
	let gifInsertIn = document.getElementById(`gifSuggest${index + 1}`);
	let seeMoreButton = gifInsertIn.getElementsByClassName("seeMoreButton");
	let gifImg = gifInsertIn.getElementsByTagName("img");

	if (gifImg.length === 0) {
		gifImg = document.createElement("img");
		gifImg.setAttribute("src", gifGiphy.images.original.url);
		gifInsertIn.append(gifImg);
	}
	else {
		gifImg[0].setAttribute("src", gifGiphy.images.original.url);
	}

	let gifTitle = gifGiphy.title;
	let hashTag = "#";
	let getLimit = gifTitle.search("GIF");
	let newTitle = gifTitle.slice(0, getLimit);
	let endTitle = hashTag.concat(newTitle);
	let gifTitleInsert = document.getElementById(`hashtagGif${index + 1}`);
	gifTitleInsert.innerHTML = endTitle;

	if (seeMoreButton.length > 0) {
		seeMoreButton[0].onclick = function () {
			getGifsBySearch(endTitle.substring(1));
		};
	}
}

function createGifElement(parentElement, index, gifGiphy, bigTrendsClass) {
	let divChargeSmall = document.createElement("div");
	divChargeSmall.id = "gifSuggest" + index;
	divChargeSmall.className = bigTrendsClass ? bigTrendsClass : "chargeSmall";

	let gifImg = document.createElement("img");
	gifImg.setAttribute("src", gifGiphy.images.original.url);
	divChargeSmall.append(gifImg);

	let gifTitle = gifGiphy.title;
	let hashTag = "#";
	let getLimit = gifTitle.search("GIF");
	let newTitle = gifTitle.slice(0, getLimit);
	let endTitle = hashTag.concat(newTitle);

	let paragraph = document.createElement("p");
	paragraph.id = "hashtagGif" + index;
	paragraph.innerHTML = endTitle;
	divChargeSmall.appendChild(paragraph);

	parentElement.appendChild(divChargeSmall);
	document.getElementById("trendsSection").appendChild(parentElement);
}

//FUNCTION TO GET REQUEST BY FETCH SEARCH
function getGifsBySearch(searchText) {
	let urlToFetch = `${requestDefault}search?api_key=${apiKey}&q=${searchText}&limit=29&offset=0&rating=G&lang=en`;

	return fetch(urlToFetch)
		.then(response => {
			return response.json();
		})
		.then(data => {
			let gifs = data.data;
			let groupedGifs = [gifs.splice(0, 4)];

			let trendsSection = document.getElementById("trendsSection");
			let trendsChildren = trendsSection.getElementsByClassName("trendsCharge");

			while (trendsChildren.length > 0) {
				trendsChildren[0].parentNode.removeChild(trendsChildren[0]);
			}

			while (gifs.length > 0) {
				let groupLength = getRandomInt(3, 5); // 3, 4
				let spliceLength = groupLength <= gifs.length ? groupLength : gifs.length;
				groupedGifs.push(gifs.splice(0, spliceLength));
			}

			// Create elements.
			if (groupedGifs.length > 0) {
				let group = groupedGifs[0];
				group.forEach((gifGiphy, i) => {
					updateGifElement(gifGiphy, i);
				});
			}

			let index = 5;
			for (let i = 1; i < groupedGifs.length; i++) {
				let group = groupedGifs[i];
				let divTrendsCharge = document.createElement("div");
				divTrendsCharge.className = "trendsCharge";

				if (group.length == 3) {
					// [1, 2, 3]
					// Add one element with column size of 2 (0, 1)
					let chosenElement = getRandomInt(0, 2) == 0 ? 0 : group.length - 1;
					let elementClass = chosenElement == 0 ? "bigLeftTrendsCharge" : "bigRightTrendsCharge";

					group.forEach((gifGiphy, i) => {
						createGifElement(divTrendsCharge, index, gifGiphy, i == chosenElement ? elementClass : "");
						index++;
					});
				}
				else {
					// One element by column
					group.forEach(gifGiphy => {
						createGifElement(divTrendsCharge, index, gifGiphy);
						index++;
					});
				}
			}

			return data
		}).catch(error => {
			console.error("fetch failed", error);
		})
}

// AFTER TO DO CLICK OVER THE LOGO GIFOS IN THE INDEX
document.getElementById("logotipe").addEventListener("click", function () {
	window.location.href = "../../Pages/pre_Catch.html";
});

// AFTER TO DO CLICK OVER THE LOGO GIFOS IN THE INDEX
document.getElementById("buttonOne").addEventListener("click", function () {
	window.location.href = "../../Pages/pre_Catch.html";
});

//FUNCTION TO DO SCROLL DOWN AFTER A SEARCH
function scrollDown() {
	setTimeout(function () {
		window.scrollBy(0, 760);
	}, 3000);
};