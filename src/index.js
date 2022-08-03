const BASE_URL = "http://localhost:3000";
const stories_url = BASE_URL + "/stories";
const toDoListUrl = BASE_URL + "/to_do_lists";
const passwords_url = "http://localhost:3000/passwords";
const users_url = "http://localhost:3000/users";
const weather_url = "http://localhost:3000/weathers";
const mood_url = "http://localhost:3000/moods";
const location_url = "http://localhost:3000/locations";

const forecastBtn = document.querySelector(".forecast_btn");
const searchBar = document.querySelector(".search");
const homePage = document.querySelector(".diary-collection");
const password_pop_up = document.querySelector(".password-pop-up");
const passwordForm = document.querySelector(".password-form");
const loginForm = document.querySelector(".login-form");
const loginClean = document.querySelector(".clean");
const indivPage = document.querySelector(".single-container");
const newTask = document.querySelector(".new-task");

const title = document.querySelector(".title");
const story = document.querySelector(".story");
const weather = document.querySelector(".weather");
const toDo = document.querySelector(".toDo");
const mood = document.querySelector(".mood");
const paperDiv = document.querySelector(".paper-div");
const paperEdit = document.querySelector(".paper-edit");
const paperForm = document.querySelector(".paper-form");

let correctPassword = [];

// fetch(users_url)
// .then(res => res.json())
// .then(userArray => verifyUser(userArray));

// function verifyUser(userArray) {
//     loginForm.addEventListener("submit", event => {
//         event.preventDefault();

//         const name = event.target.name.value;
//         const password = event.target.password.value;
        
//         userArray.forEach(user => {
//             if(user.name == name && user.password == password){
                fetch(stories_url)
                .then(res => res.json())
                .then(storyArray => {
                    storyArray.forEach(storyObj => {
                        renderStory(storyObj)
                    })
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

function headerFunctions(){
    forecastBtn.addEventListener("click", event => {
        event.preventDefault();

        fetchForecast();
    })
}

function fetchForecast(){
    searchBar.addEventListener("submit", event => {
        event.preventDefault();
        const city = event.target.city.value;
        fetch(location_url)
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
    homePage.style.display = "block";

    let divNode = document.createElement("div");
    divNode.classList.add("card");
    divNode.dataset.id = storyObj.id;

    let storyImg = storyObj.image;

    divNode.style.backgroundImage = `url(${storyImg})`;

    let titleNode = document.createElement("h2");
    titleNode.textContent = storyObj.title;


    let moraleNode = document.createElement("p");
    moraleNode.textContent = `One-liner: ${storyObj.content}`;

    homePage.append(divNode);
    divNode.append(titleNode,moraleNode);

    titleNode.style.visibility = "hidden";
    moraleNode.style.visibility= "hidden";

    divNode.addEventListener("mouseover", event => {
        event.preventDefault();
    
        titleNode.style.visibility= "visible";
        moraleNode.style.visibility = "visible";

    })

    divNode.addEventListener("mouseout", event => {
        event.preventDefault();
    
        titleNode.style.visibility= "hidden";
    moraleNode.style.visibility = "hidden";

    })

    divNode.addEventListener("click", event => { 
        event.preventDefault();
        

        setTimeout(function(){
            divNode.style.visibility = "hidden";
        }, 100);

        // setTimeout(function(){
            // password_pop_up.style.display = "flex";
        // }, 400);
        fetchingData(storyObj);
     
    })

    passwordForm.addEventListener("submit", event => {
        event.preventDefault();

        matchPassword(storyObj, event);
    })

    divNode.style.visibility = "visible";
}

function matchPassword(storyObj, event){

    const inputPassword = event.target.password.value;

    fetch(passwords_url)
    .then(res => res.json())
    .then(passwordArray => {
        
        passwordArray.forEach(password =>{
            if(password.story_id == storyObj.id){
                correctPassword.push(password.code);
            }
        })
        if(correctPassword == inputPassword){
            fetchingData(storyObj);
        }else{
            password_pop_up.style.display = "none";
            console.log("failed login");
        }

    })
}

function fetchingData(storyObj) {
    fetch(toDoListUrl)
    .then(res => res.json())
            .then(listArray => {
                fetch(weather_url)
                .then(res => res.json())
                .then(weatherArray => {
                    fetch(mood_url)
                    .then(res => res.json())
                    .then(moodArray => renderDiary(storyObj,
                        listArray, weatherArray,moodArray))})});

}

function renderDiary(storyObj,listArray,weatherArray,moodArray) {
    homePage.style.display = "none";
    indivPage.style.display = "grid";
    
    let storyImg = storyObj.image;

    indivPage.style.backgroundImage = `url(${storyImg})`;
    
    let today = new Date().toLocaleDateString();

    indivPage.dataset.id = storyObj.id;

    let titleNode = indivPage.querySelector("h2");
        titleNode.textContent = storyObj.title;

    title.parentElement.addEventListener("mouseover", event => {
        event.preventDefault();

        let dateNode = indivPage.querySelector(".date-display");
        dateNode.textContent = ` ${today}`;

    })

    title.parentElement.addEventListener("mouseout", event => {
        event.preventDefault();
   
        title.nextElementSibling.innerHTML="";
    })

    storyChange(storyObj,listArray,weatherArray,moodArray);

    story.parentElement.addEventListener("mouseover", event => {
        event.preventDefault();

        story.style.display= "none";
        paperDiv.style.visibility = "visible";
        paperEdit.style.visibility = "visible";

    })

    story.parentElement.addEventListener("mouseout", event => {
        event.preventDefault();
        
        story.style.display= "flex";
        paperDiv.style.visibility = "hidden";
        paperEdit.style.visibility = "hidden";

    })

    weather.parentElement.addEventListener("mouseover", event => {
        event.preventDefault();
        weather.style.display= "none";

        let weatherDiv = indivPage.querySelector(".weather-div");
        let temperature = weatherDiv.querySelector(".temperature");
        let weatherIcon = weatherDiv.querySelector("img");
        weatherArray.forEach(weather => {
        if(weather.story_id == storyObj.id){
            temperature.textContent = `min: ${weather.min} F max: ${weather.max} F weather: ${weather.icon_day}`;
            weatherIcon.src= `src/image/${weather.icon_day}.png`;
        }
        weatherDiv.append(temperature, weatherIcon);
    })})

    weather.parentElement.addEventListener("mouseout", event => {
        event.preventDefault();
        
        weather.style.display= "flex";
        weather.nextElementSibling.innerHTML="";
        weather.nextElementSibling.nextElementSibling.src="";
    })

    let listing = renderToDo(storyObj,listArray);

    toDo.parentElement.addEventListener("mouseover", event => {
        event.preventDefault();

        toDo.style.display= "none";
        newTask.style.display="flex";
        newTask.append(listing);
        listing.style.display ="block";
    
    })

    toDo.parentElement.addEventListener("mouseout", event => {
        event.preventDefault();
        toDo.style.display= "flex";
        newTask.style.display ="none";
        
    })

    let newListForm = document.querySelector(".task-form");

    newListForm.addEventListener("submit", event => {
        event.preventDefault();

        const taskInput = event.target[0].value;
        addingNewTask(storyObj, taskInput, listing);
    })

    
    mood.parentElement.addEventListener("mouseover", event => {
        event.preventDefault();
        mood.style.display= "none";
        let moodDiv = indivPage.querySelector(".mood-div");
        let moodContent = moodDiv.querySelector(".mood-content");
        let moodState = moodDiv.querySelector("strong");
        moodArray.forEach(mood => {
            if(mood.story_id == storyObj.id){
                moodContent.textContent = `One-liner: ${mood.one_liner}`;
                moodState.textContent = `${mood.feeling}`;
            }

        moodDiv.append(moodState, moodContent);
    })})

    mood.parentElement.addEventListener("mouseout", event => {
        event.preventDefault();
        
        mood.style.display= "flex";
        mood.nextElementSibling.innerHTML="";
        mood.nextElementSibling.nextElementSibling.innerHTML="";
    })

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

        fetch(stories_url + `/${storyObj.id}`, configObj)
        .then(res => res.json())
        .then(newStoryObj => {
            renderDiary(newStoryObj, listArray, weatherArray, moodArray);
        })})
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


