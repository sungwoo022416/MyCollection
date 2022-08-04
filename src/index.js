const baseUrl = "http://localhost:3000";
const storiesUrl = baseUrl  + "/stories";
const toDoListUrl = baseUrl  + "/to_do_lists";
const passwordUrl = baseUrl + "/passwords";
const userUrl = baseUrl + "/users";
const weatherUrl = baseUrl + "/weathers";
const moodUrl = baseUrl + "/moods";
const locationUrl = baseUrl + "/locations";

const homePage = document.querySelector(".diary-collection");
const indivPage = document.querySelector(".single-container");
const newPage = document.querySelector(".create-story");

const forecastBtn = document.querySelector(".forecast_btn");
const searchBar = document.querySelector(".search");

const password_pop_up = document.querySelector(".password-pop-up");
const passwordForm = document.querySelector(".password-form");
const loginForm = document.querySelector(".login-form");
const loginClean = document.querySelector(".clean");


const title = document.querySelector(".title");
const weather = document.querySelector(".weather");
const mood = document.querySelector(".mood");

const toDo = document.querySelector(".to-do");
const newTask = document.querySelector(".new-task");

const story = document.querySelector(".story");
const paperDiv = document.querySelector(".paper-div");
const paperEdit = document.querySelector(".paper-edit");
const paperForm = document.querySelector(".paper-form");

const homeIcon = document.querySelector(".home-item");
const diaryIcon = document.querySelector(".diary-item");
const moodIcon = document.querySelector(".mood-item");
const cityIcon = document.querySelector(".city-item");
const dateIcon = document.querySelector(".date-item");

let correctPassword = [];

// fetch(userUrl)
// .then(res => res.json())
// .then(userArray => verifyUser(userArray));

// function verifyUser(userArray) {
//     loginForm.addEventListener("submit", event => {
//         event.preventDefault();

//         const name = event.target.name.value;
//         const password = event.target.password.value;
        
//         userArray.forEach(user => {
//             if(user.name == name && user.password == password){
                fetch(storiesUrl)
                .then(res => res.json())
                .then(storyArray => {
                        storyArray.forEach(story => {
                            renderStory(story);
                        })
                        activateNavBar();
                    })
                

//                 loginForm.style.display = "none";
//                 loginClean.innerHTML = "";
//             } 
//         })
//     })
// }
// function renderStories(storyArray, user) {
//     storyArray.forEach(storyObj => {
//         if(user.id == storyObj.user_id)
//         renderStory(storyObj)
//     });
// }
function activateNavBar(){
    homeIcon.addEventListener("click", event => {
        event.preventDefault();
    
        newPage.style.display = "none";
        indivPage.style.display = "none";
        homePage.style.display = "block";
        
    })

    diaryIcon.addEventListener("click", event => {
        event.preventDefault();

        homePage.style.display = "none";
        indivPage.style.display = "none";
        createStory();
    })

    cityIcon.addEventListener("click", event => {
        event.preventDefault();

        newPage.style.display = "none";
        indivPage.style.display = "none";
        homePage.innerHTML = "";
   
        fetch(storiesUrl)
        .then(res => res.json())
        .then(storyArray => {
        displayCityFilter(storyArray)});
    })
}

function displayCityFilter(storyArray){
    let entireSize = storyArray.length;
    let newArray = [];
 
    for(i = 0; i < entireSize - 1; i++){
        let filteredArray = storyArray.filter(story=> story.title == storyArray[i].title);

        entireSize -= filteredArray.length;

        newArray.push(filteredArray[0]);
    }
    let newSize = newArray.length

    for(count = 0; count < newSize - 1; count++){
        let duplicateArray = storyArray.filter(story => story.title == newArray[count].title);

        let divParent = document.createElement("div");
            divParent.classList.add("filtered-city");
        
        let titleNode = document.createElement("h2");
            titleNode.textContent = newArray[count].title;

        divParent.append(titleNode);
        duplicateArray.forEach(storyObj=> {
            divParent.append(renderStoryBeforeHomePage(storyObj));
        })

        homePage.append(divParent);
       
        // homePage.style.display= "block";
    }

    // homePage.append(divNode);

}

function fetchForecast(){
    searchBar.addEventListener("submit", event => {
        event.preventDefault();
        const city = event.target.city.value;
        fetch(locationUrl)
        .then(res => res.json())
        .then(locationArray => {

            locationArray.forEach(location => {
                if(city == location.name){
                    let key = location.key;
                }
            })

            const forecast_api = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=mHao3dolGFzNOMEdyryEEuArLplKidCL`;
            fetch(forecast_api)
            .then(res => res.json)
            .then(daysArray => renderForecast(daysArray));
        })
    })
}

function renderForecast(daysArray){
    daysArray.forEach(day => {

    })
}
function renderStory(storyObj) {
    indivPage.style.display = "none";

    
    homePage.append(renderStoryBeforeHomePage(storyObj));

}

function renderStoryBeforeHomePage(storyObj) {
    let divNode = document.createElement("div");
    divNode.classList.add("card");
    divNode.dataset.id = storyObj.id;

    let storyImg = storyObj.image;

    divNode.style.backgroundImage = `url(${storyImg})`;

    let titleNode = document.createElement("h2");
    titleNode.textContent = storyObj.title;


    let moraleNode = document.createElement("p");
    moraleNode.textContent = `One-liner: ${storyObj.content}`;

    divNode.append(titleNode,moraleNode);


    divNode.addEventListener("click", event => { 
        event.preventDefault();
        homePage.style.display = "none";

        fetchingData(storyObj);
    })

    return divNode;
}

function fetchingData(storyObj) {
    fetch(toDoListUrl)
    .then(res => res.json())
            .then(listArray => {
                fetch(weatherUrl)
                .then(res => res.json())
                .then(weatherArray => {
                    fetch(moodUrl)
                    .then(res => res.json())
                    .then(moodArray => renderDiary(storyObj,
                        listArray, weatherArray,moodArray))})});

}

function renderDiary(storyObj,listArray,weatherArray,moodArray) {
    indivPage.style.display = "grid";
    
    let storyImg = storyObj.image;

    indivPage.style.backgroundImage = `url(${storyImg})`;
    
    let today = new Date().toLocaleDateString();

    indivPage.dataset.id = storyObj.id;


    let titleNode = indivPage.querySelector("h2");
        titleNode.textContent = storyObj.title;

    let dateNode = indivPage.querySelector(".date-display");
    dateNode.textContent = ` ${storyObj.date}`;

    storyChange(storyObj,listArray,weatherArray,moodArray); //editing the story

    let weatherDiv = indivPage.querySelector(".weather-div");
    let temperature = weatherDiv.querySelector(".temperature");
    let weatherIcon = weatherDiv.querySelector("img");
    weatherArray.forEach(weather => {
    if(weather.story_id == storyObj.id){
        temperature.innerHTML = `min: ${weather.min} F <br>
        max: ${weather.max} F <br>
        weather: ${weather.icon_day}`;
        weatherIcon.src= `src/image/${weather.icon_day}.png`;
    }})

    weatherDiv.append(temperature, weatherIcon, weather);

    let listing = renderToDo(storyObj,listArray);

    newTask.append(listing);
    listing.style.display ="block";

    let newListForm = document.querySelector(".task-form");

    newListForm.addEventListener("submit", event => {
        event.preventDefault();

        const taskInput = event.target[0].value;
        addingNewTask(storyObj, taskInput, listing);
    })
    
    let moodDiv = indivPage.querySelector(".mood-div");
    let moodContent = moodDiv.querySelector(".mood-content");
    let moodState = moodDiv.querySelector("strong");
    moodArray.forEach(mood => {
        if(mood.story_id == storyObj.id){
            moodContent.textContent = `One-liner: ${mood.one_liner}`;
            moodState.textContent = `${mood.feeling}`;
        }})

    moodDiv.append(moodState, moodContent, mood);
}

function storyChange(storyObj, listArray, weatherArray, moodArray){
    let contentNode = indivPage.querySelector(".paper-div");
    contentNode.value= `${storyObj.content}`;

    paperForm.addEventListener("click", event => {
        event.preventDefault();

        const contentChange = contentNode.value;
       

        const updateStory = {
            content: contentChange
        }

        const configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateStory)
        }

        fetch(storiesUrl + `/${storyObj.id}`, configObj)
        .then(res => res.json())
        .then(newStoryObj => {
            renderDiary(newStoryObj, listArray, weatherArray, moodArray);
        })})
}
function createStory(){
 
}
function addingNewTask(storyObj, inputTask, listing){
    const task = inputTask;
    const story_id = storyObj.id;

    const creatingTask = {
        task,
        story_id
    }
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(creatingTask)
    }
  
    fetch(toDoListUrl, configObj)
    .then(res => res.json())
    .then(taskObj => {
        let doList = document.createElement("div");
        doList.classList.add("task-list");
        doList.dataset.id = taskObj.id;
        doList.textContent = `${taskObj.task}`;
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBtn");
        doList.append(deleteBtn);
       listing.append(doList);
    });
}
function renderToDo(storyObj, listArray) {
    let matchingList = [];
    listArray.forEach(list => {
        if (list.story_id === storyObj.id) {
            matchingList.push(list);
        }
    });
    let ul = document.createElement("ul");
    matchingList.forEach(list => {
        let doList = document.createElement("div");
        doList.classList.add("task-list");
        doList.dataset.id = list.id;
        doList.textContent = `${list.task}`;

        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBtn");
        doList.append(deleteBtn);
        ul.append(doList); 

        deleteBtn.addEventListener("click", event => {
            event.preventDefault();

            fetch(toDoListUrl + `/${doList.dataset.id}`, {
                method: "DELETE"})
            .then(res => res.json())
            .then(() => doList.remove());
            })
        })

    return ul;
}


