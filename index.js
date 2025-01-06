/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

import GAMES_DATA from './games.js';
const GAMES_JSON = JSON.parse(GAMES_DATA)

function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/
const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const game = games[i]; 
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Backers: ${game.backers}</p>
        `;
        gamesContainer.appendChild(gameCard);
    }
}
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

const contributionsCard = document.getElementById("num-contributions");

const totalBackers = GAMES_JSON.reduce((total, game) => {
    return total + game.backers;
}, 0);

if (contributionsCard) {
    contributionsCard.textContent = `${totalBackers.toLocaleString()}`;
}

const raisedCard = document.getElementById("total-raised");
const gamesCard = document.getElementById("num-games");

const totalPledged = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged;
}, 0)

if (raisedCard) {
    raisedCard.textContent = `$${totalPledged.toLocaleString()}`;
}

const numberOfGames = GAMES_JSON.reduce((count) => {
    return count + 1;
}, 0);

if (gamesCard) {
    gamesCard.textContent = `${numberOfGames.toLocaleString()}`;
}

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    let listOfUnfunded = GAMES_JSON.filter ((game)=> {
        return game.pledged < game.goal
    })
    addGamesToPage(listOfUnfunded)
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    let listOfFunded = GAMES_JSON.filter ((game)=> {
        return game.pledged >= game.goal
    })
    addGamesToPage(listOfFunded)
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON)
    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener("click", filterUnfundedOnly);
const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener("click", filterFundedOnly);
const allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedNum = GAMES_JSON.filter((game) => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator

const displayStr = `A total of $${totalPledged.toLocaleString()} has been raised for ${numberOfGames.toLocaleString()} games. Currently, ${unfundedNum} ${unfundedNum > 1 ? "games" : "game"} remain unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const stringForDom = document.createElement("p");
stringForDom.textContent = displayStr; 
descriptionContainer.appendChild(stringForDom);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

const [firstGame, secondGame, ...rest] = sortedGames;
const firstGameText = document.createTextNode(firstGame.name);
const secondGameText = document.createTextNode(secondGame.name);

firstGameContainer.appendChild(firstGameText);
secondGameContainer.appendChild(secondGameText);
