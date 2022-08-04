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
const newPage = document.querySelector(".story-form");
const moodView = document.querySelector(".mood-view");
const cityView = document.querySelector(".city-view");
const dateView = document.querySelector(".date-view");

const storyForm = document.querySelector(".story-form");
const excitedParent = document.querySelector(".excited");
const humbledParent = document.querySelector(".humbled");
const fraustratedParent = document.querySelector(".fraustrated");
const sickParent = document.querySelector(".sick");

const forecastBtn = document.querySelector(".forecast_btn");
const searchBar = document.querySelector(".search");

const city = document.querySelector(".city");
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

let cityFlag = 0;
let moodFlag = 0;
let dateFlag = 0;

helloPage()

function helloPage(){
    fetch(storiesUrl)
    .then(res => res.json())
    .then(storyArray => {
            activateNavBar(storyArray);

            storyArray.forEach(story => {
                renderStory(story);
            })
     })
}

function activateNavBar(storyArray){

    homeIcon.addEventListener("click", event => {
        event.preventDefault();

        homePage.style.display = "block";
        indivPage.style.display = "none";
        newPage.style.display = "none";
        moodView.style.display = "none";
        cityView.style.display = "none";
        dateView.style.display = "none";
  
    })

    diaryIcon.addEventListener("click", event => {
        event.preventDefault();

        homePage.style.display = "none";
        indivPage.style.display = "none";
        newPage.style.display = "block";
        moodView.style.display = "none";
        cityView.style.display = "none";
        dateView.style.display = "none";

        respondToCreate(storyArray);

    })

    moodIcon.addEventListener("click", event => {
        event.preventDefault();

        homePage.style.display = "none";
        indivPage.style.display = "none";
        newPage.style.display = "none";
        moodView.style.display = "block";
        cityView.style.display = "none";
        dateView.style.display = "none";

        fetch(moodUrl)
        .then(res => res.json())
        .then(moodArray => {
            (moodFlag != 1)? displayMoodFilter(moodArray,storyArray) : false});
    })

    cityIcon.addEventListener("click", event => {
        event.preventDefault();
      
        homePage.style.display = "none";
        indivPage.style.display = "none";
        newPage.style.display = "none";
        moodView.style.display = "none";
        cityView.style.display = "block";
        dateView.style.display = "none";
        
        (cityFlag != 1)? displayCityFilter(storyArray) : false;
    })

    dateIcon.addEventListener("click", event => {
        event.preventDefault();
      
        homePage.style.display = "none";
        indivPage.style.display = "none";
        newPage.style.display = "none";
        moodView.style.display = "none";
        cityView.style.display = "none";
        dateView.style.display = "block";
   
        (dateFlag != 1)? displayDateFilter(storyArray) : false;
    });
}

function displayMoodFilter(moodArray, storyArray){
    let excitedArray = [];
    let humbledArray = [];
    let fraustratedArray = [];
    let sickArray = [];

    moodArray.forEach(mood => {
        if(mood.feeling.includes("excited")){
        excitedArray.push(mood);
        }else if(mood.feeling.includes("humbled")){
            humbledArray.push(mood);
        }else if(mood.feeling.includes("fraustrated")){
            fraustratedArray.push(mood);
        }else if(mood.feeling.includes("sick")){
            sickArray.push(mood);
        }});

    searchIteration(excitedArray, storyArray, excitedParent);
    searchIteration(humbledArray, storyArray, humbledParent);
    searchIteration(fraustratedArray, storyArray, fraustratedParent);
    searchIteration(sickArray, storyArray, sickParent);

    moodFlag = 1;
}

function searchIteration(moodArray, storyArray, moodParent){
    moodArray.forEach(mood => {
        storyArray.forEach(story => {
        if (mood.story_id == story.id){

        let returnDiv = returnStoryDiv(story);
        moodParent.append(returnDiv);
        }})});
}

function displayCityFilter(storyArray){
    let entireSize = storyArray.length;
    let sortedByObjects = [];
    let oneTypeArray = [];
    let sanitizedArray = [];
    let sortedBycity = storyArray.sort(letterCompare);

    for(i = 0; i < entireSize; i++){
        let filteredArray = sortedBycity.filter(story=> story.city == storyArray[i].city);

        sortedByObjects.push(filteredArray); 

        i+= (filteredArray.length - 1);
    }
    sortedByObjects.sort(lengthCompare);
    let reverseObjects = sortedByObjects.reverse();

    reverseObjects.forEach(array => {
        array.forEach(element => sanitizedArray.push(element))});

    let newSize = reverseObjects.length; 

    for(count = 0; count < newSize; count++){
        oneTypeArray.push(reverseObjects[count][0]);
        let duplicateArray = sanitizedArray.filter(eachObj => eachObj.city == oneTypeArray[count].city);
            
        let divParent = document.createElement("div");
            divParent.classList.add("filtered-page");
        
        let cityNode = document.createElement("h2");
            cityNode.textContent = oneTypeArray[count].city;
      
        divParent.append(cityNode);
        duplicateArray.forEach(storyObj=> { 
            divParent.append(returnStoryDiv(storyObj));
        })

        cityView.append(divParent);
    }

    cityFlag = 1;
}

function letterCompare( a, b ) {
    if ( a.city < b.city){
      return -1;
    }
    if ( a.city > b.city ){
      return 1;
    }
    return 0;
}

function lengthCompare( a, b ) {
    if ( a.length < b.length){
      return -1;
    }
    if ( a.length > b.length ){
      return 1;
    }
    return 0;
} 

function dateCompare( a, b ) {
    if ( a.year < b.year){
      return -1;
    }
    if ( a.year > b.year){
      return 1;
    }
    return 0;
} 

function displayDateFilter(storyArray){
    let sortedDates = storyArray.sort(dateCompare);
    let entireSize = sortedDates.length;
    let matchedObjects = [];
    let sanitizedArray = [];
    let oneTypeArray = [];

    for(i = 0; i < entireSize; i++){
        let filteredArray = sortedDates.filter(story=> story.year == storyArray[i].year);


        matchedObjects.push(filteredArray); 

        i+= (filteredArray.length - 1);
    }
    let reverseObjects = matchedObjects.reverse();
  
    reverseObjects.forEach(array => {
        array.forEach(element => sanitizedArray.push(element))});

    let newSize = reverseObjects.length; 

    for(count = 0; count < newSize; count++){
        oneTypeArray.push(reverseObjects[count][0]);
        let duplicateArray = sanitizedArray.filter(eachObj => eachObj.year == oneTypeArray[count].year);
            
        let divParent = document.createElement("div");
            divParent.classList.add("filtered-page");
        
        let cityNode = document.createElement("h2");
            cityNode.textContent = oneTypeArray[count].year;
      
        divParent.append(cityNode);
        duplicateArray.forEach(storyObj=> { 
            divParent.append(returnStoryDiv(storyObj));
        })

        dateView.append(divParent);
    }

    dateFlag = 1;
    
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

function respondToCreate(storyArray){
    const id = storyArray.length;
   storyForm.addEventListener("submit", event => {
        event.preventDefault();
        createStory(event, id);

   })

   id++;
}

function createStory(event, id){
    const city = event.target.city.value;
    const month = event.target.month.value;
    const day = event.target.day.value;
    const year = event.target.year.value;
    const image = event.target.image.value;
    const content = event.target.content.value;
    const min = event.target["min-temperature"].value;
    const max = event.target["max-temperature"].value;
    const feeling = event.target.feeling.value;
    const one_liner = event.target["one-liner"].value;

    const task1 = event.target[10].value;
    const task2 = event.target[11].value;
    const task3 = event.target[12].value;

    debugger;
    const createNewStory = {
        city,
        month,
        day,
        year,
        image,
        content,
        user_id: 1
    }

    const createNewWeather = {
        min,
        max,
        icon_day: "sunny",
        icon_night: "foggy",
        story_id: id
    }

    const createNewMood = {
        feeling,
        one_liner,
        story_id: id
    }


    const createNewTask = {
        task: task1,
        story_id: id
    }


    configObj(createNewStory, createNewWeather, createNewMood, createNewTask);

}

function cofigObj(createNewStory, createNewWeather, createNewMood, createNewTask){

}

function renderStory(storyObj){
    homePage.style.display = "block";
    indivPage.style.display = "none";
    newPage.style.display = "none";
    moodView.style.display = "none";
    cityView.style.display = "none";
    dateView.style.display = "none";

    homePage.append(returnStoryDiv(storyObj));

}

function returnStoryDiv(storyObj) {
    let divNode = document.createElement("div");
    divNode.classList.add("card");
    divNode.dataset.id = storyObj.id;

    let storyImg = storyObj.image;

    divNode.style.backgroundImage = `url(${storyImg})`;

    let cityNode = document.createElement("h2");
    cityNode.textContent = storyObj.city;


    let moraleNode = document.createElement("p");
    moraleNode.textContent = `One-liner: ${storyObj.content}`;

    divNode.append(cityNode,moraleNode);

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
                .then(res => res.json()) //async function
                .then(weatherArray => {
                    fetch(moodUrl)
                    .then(res => res.json())
                    .then(moodArray => renderDiary(storyObj,
                        listArray, weatherArray,moodArray))})});
}

function renderDiary(storyObj,listArray,weatherArray,moodArray) {
    indivPage.style.display = "grid";
    moodView.style.display = "none";
    cityView.style.display = "none";
    dateView.style.display = "none";
    
    let storyImg = storyObj.image;

    indivPage.style.backgroundImage = `url(${storyImg})`;
    
    let today = new Date().toLocaleDateString();

    indivPage.dataset.id = storyObj.id;


    let cityNode = indivPage.querySelector("h2");
        cityNode.textContent = storyObj.city;

    let dateNode = indivPage.querySelector(".date-display");
        dateNode.textContent = `${storyObj.month}-${storyObj.day}-${storyObj.year}`;

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


