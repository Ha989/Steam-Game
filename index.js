const ALL_GAME_URL = `https://cs-steam-game-api.herokuapp.com/games?limit=30`;
const GENRES_URL = `https://cs-steam-game-api.herokuapp.com/genres?page=3`;


const searchBtn = document.querySelector("#search-button");
const displayMainPage = document.querySelector(".games-title");
const displaySingleCard = document.querySelector("#single-game-card");



// fetch API

async function getAllGame() {
    try {
        const response = await fetch(`${ALL_GAME_URL}`);
        gameListData = await response.json();
        return gameListData;
    } catch (error) {
        console.log("error", error.message);
        return[];
    }
};



const renderGetAllGame = async () =>{
    try {
    const listGameData = await getAllGame(); 
    const gameList = document.querySelector(".games-title");
    const listGame = gameList.children[1];
    listGame.innerHTML ="";
    listGameData.data.forEach(games => {
        const div = document.createElement("div");
        div.innerHTML = `<div class="game-items">
        <div class="game-img">
        <img src="${games.header_image}" data-id=${games._id}  onclick="displaySingleGame(${games.appid})">
        </div>
        <div class="game-content">
        <p>${games.name}</p>
        <p>$${games.price}</p>
        </div>
        </div>
    `;
    listGame.appendChild(div);       
    });
    } catch (error) {
        console.log("error", error.message)
    }
};
renderGetAllGame();

async function getGenres() {
    try {
        const response = await fetch(`${GENRES_URL}`);
        const genresData = await response.json();
        return genresData;
    } catch (error) {
        console.log("error", error.message)
        return[];
    }
};
 

const renderGenres = async() => {
    try{
  const dataGenres = await getGenres();

  const genresList = document.querySelector(".genres-items");

  genresList.innerHTML ="";

  dataGenres.data.forEach( genre => {
    const li = document.createElement("li");
    li.innerHTML = `<div class="filter-btn" data-id="${genre._id}" onclick="displayGenre ('${genre.name}')">${genre.name}</div>`;
   genresList.appendChild(li);
  });
} catch (error) {
    console.log("error",error.message);
}
};
renderGenres();


async function searchGameByAppName() {
    try {
        let searchInput = document.querySelector("#search-box-input").value.trim();

        if(searchInput.length !== 0) {
            let header = document.querySelector(".title");
            header.textContent = searchInput;
        }

        const APPNAME_URL = `https://cs-steam-game-api.herokuapp.com/games?q=${searchInput}`;
        const response = await fetch(`${APPNAME_URL}`);
        const data = response.json();
        return data;

    } catch (error) {
        console.log("error",error.message);
    }
};

const renderSearchGame = async () => {
  try {
    displayMainPage.style.display = "block";
    displaySingleCard.style.display = "none"; 
    const data = await searchGameByAppName();
    const game = document.querySelector(".games-title");
    const gameFilter = game.children[1];
    gameFilter.innerHTML ="";
    data.data.forEach(game => {
        const div = document.createElement("div");
        div.innerHTML = `<div class="game-items">
        <div class="game-img">
        <img src="${game.header_image}" data-id=${game._id}  onclick="displaySingleGame(${game.appid})">
        </div>
        <div class="game-content">
        <p>${game.name}</p>
        <p>$${game.price}</p>
        </div>
        </div>`;
        gameFilter.appendChild(div);
    });
}

  catch (error) {
    console.log("error",error.message);
  } 
};

searchBtn.addEventListener(`click`, renderSearchGame);

  async function genreByClick (value) {
    try {
       let queryString = "";
       if(value !== 0) {
        queryString = value;
       }

       if(queryString.length !== 0) {
        let header = document.querySelector(".title");
        header.textContent = queryString;
       }
        
        
        const GENRE_SG_URL = (`https://cs-steam-game-api.herokuapp.com/games?genres=${queryString}&limit=30`);
        const res = await fetch(`${GENRE_SG_URL}`);
        const data = await res.json();
        console.log(data);
        return data;
        
    
    }
    catch (error) {
    console.log(error.message);
   }
    };

    
     
    const displayGenre = async (value) => {
        try {
         const dataGames = await genreByClick(value);
                displayMainPage.style.display = "block";
                displaySingleCard.style.display = "none"; 

         const game = document.querySelector(".games-title");
         const gameFilter = game.children[1];
         gameFilter.innerHTML ="";
         dataGames.data.forEach(game => {
            const div = document.createElement("div");
            div.innerHTML = `
            <div class="game-items">
            <div class="game-img">
            <img src="${game.header_image}" data-id=${game._id} onclick="displaySingleGame(${game.appid})">
            </div>
            <div class="game-content">
            <p>${game.name}</p>
            <p>$${game.price}</p>
            </div>
            </div>`;
            gameFilter.appendChild(div);
        });

        } catch (error) {
         console.log("error", error.message);
        }
     };


     async function getSingleGameDetail(value) {
        try {
           let queryString = "";
           if(value !== 0) {
            queryString = value;
            console.log(queryString);
            const SINGLE_GAME_URL = (`https://cs-steam-game-api.herokuapp.com/games?appid=${queryString}`);
            console.log(SINGLE_GAME_URL);
            const res = await fetch(`${SINGLE_GAME_URL}`);
            const data = await res.json();
            console.log(data);
            return data;
           };   
           
        }
        catch (error) {
        console.log(error.message);
       }
        };


        const displaySingleGame = async (value) => {
            try {
             const dataGames = await getSingleGameDetail(value);
        
             if(displayMainPage.style.display !== "none") {
                displayMainPage.style.display = "none";
                displaySingleCard.style.display = "block"; 
                displaySingleCard.innerHTML="";
                dataGames.data.forEach((detail) => {
                   const div = document.createElement("div");
                   div.innerHTML = `
                   <div class="header-card">
                       <h2>${detail.name}</h2>
                       <p>$${detail.price}</p>
                   </div>
                   <div class="game-information">
                       <div class="game-img">
                           <img src=${detail.header_image} alt="">
                       </div>
                       <div class="game-des">
                       <p>Positive Ratings: ${detail.positive_ratings} </p>
                           <p>Developer: ${detail.developer}</p>
                               <p>Required Age: ${detail.required_age}</p>
                               <p> Platforms: ${detail.platforms}</p>
                            
                       </div> 
                   </div>
                   <div class="game-tag">
                       <h2>Grenes</h2>
                       <p>${detail.genres}</p>
                   </div>
                  `;
                  displaySingleCard.appendChild(div);
                    });

             }
            } catch (error) {
             console.log("error", error.message);
            }
         };   
 

        
