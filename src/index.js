const baseUrl = "http://localhost:3000";
const storiesUrl = baseUrl  + "/stories";
const toDoListUrl = baseUrl  + "/to_do_lists";
const passwordUrl = baseUrl + "/passwords";
const userUrl = baseUrl + "/users";
const weatherUrl = baseUrl + "/weathers";
const moodUrl = baseUrl + "/moods";
const locationUrl = baseUrl + "/locations";

const navigation = document.querySelector(".navigation");
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

const city = document.querySelector(".city");
const weather = document.querySelector(".weather");
const mood = document.querySelector(".mood");

const tempTask = document.querySelector(".cleaning-task");

const story = document.querySelector(".story");
const paperDiv = document.querySelector(".paper-div");
const paperEdit = document.querySelector(".paper-edit");
const paperForm = document.querySelector(".paper-form");

let cityFlag = 0;
let moodFlag = 0;
let dateFlag = 0;


helloPage()

function helloPage(){
    fetch(storiesUrl)
    .then(res => res.json())
    .then(storyArray => {
        homePage.innerHTML="";
        activateNavBar(storyArray);

        fetch(moodUrl)
        .then(res => res.json())
        .then(moodArray=> {
            storyArray.forEach(story => {
                pageIteration();
                renderStory(story, moodArray)})
            })
     })
}

let pageArray = [homePage, newPage, moodView, cityView, dateView, indivPage]

function pageIteration(){
    pageArray.forEach(page => {
        page.style.display = "none";
    })
}

function activateNavBar(storyArray){

    navigation.addEventListener("click", event => {
        event.preventDefault();
        pageIteration();

        let = prefixExtractor = [...event.target.classList][0].slice(0,4);
     
        if(prefixExtractor.includes("home")){
            pageArray[0].style.display = "block";
            helloPage();

        }
        else if(prefixExtractor.includes("diar")){
            pageArray[1].style.display = "flex";
            respondToCreate(storyArray);
        }
        else if(prefixExtractor.includes("mood")){
            pageArray[2].style.display = "block";

            fetch(moodUrl)
            .then(res => res.json())
            .then(moodArray => {
                (moodFlag != 1)? displayMoodFilter(moodArray,storyArray) : false });
        }
        else if(prefixExtractor.includes("city")){
            pageArray[3].style.display = "block";
            (cityFlag != 1)? displayCityFilter(storyArray) : false;
        }
        else if(prefixExtractor.includes("date")){
            pageArray[4].style.display = "block";
            (dateFlag != 1)? displayDateFilter(storyArray) : false;
        }
    })
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

function yearCompare( a, b ) {
    if ( a.year < b.year){
      return -1;
    }
    if ( a.year > b.year){
      return 1;
    }
    return 0;
} 

function displayDateFilter(storyArray){
    let sortedDates = storyArray.sort(yearCompare);
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

function respondToCreate(storyArray){
    let id = storyArray.length;
   storyForm.addEventListener("submit", event => {

        event.preventDefault();
        createStory(event, id);
   })
    // diaryFlag = 1;
   id++;
}

function createStory(event, id){
    const city = event.target.city.value;
    const date = event.target.date.value;
    const year = event.target.date.value.slice(0,4);
    const image = event.target.image.value;
    const content = event.target.content.value;

    const temperature = event.target[4].value;
    const task = event.target.task.value;
    const feeling = event.target.feeling.value;
    const oneLiner = event.target["one-liner"].value;

    let tempInt = parseInt(temperature);

    let iconArray= ["snow", "snow", "snow", "windy", "windy", 
    "mostly_cloudy","mostly_cloudy", "intermittent_clouds_day","sunny", "sunny", "hot"];
    
    let icon = iconArray[`${tempInt/10}`];

    const createNewStory = {
        city,
        date,
        year,
        image,
        content,
    }

    const createNewWeather = {
        temperature,
        icon,
        story_id: id
    }

    const createNewMood = {
        feeling,
        one_liner: oneLiner,
        story_id: id
    }


    const createNewTask = {
        task,
        story_id: id
    }

    let = objArray = [createNewStory,createNewWeather, createNewMood, createNewTask];

    configNewStory(objArray);
}

function configNewStory(objArray){

    let configStory = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objArray[0])
    }

    let configWeather = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objArray[1])
    }

    let configMood = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objArray[2])
    }

    let configTask = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objArray[3])
        }
        let configArray = [configStory, configWeather, configMood, configTask];
        
        fetchingNewDiary(configArray);
}

function fetchingNewDiary(configArray){
    fetch(storiesUrl, configArray[0])
    .then(res => res.json())
    .then(storyObj=> {
       fetch(weatherUrl, configArray[1])
       .then(res => res.json())
       .then(weatherObj => {
            fetch(moodUrl, configArray[2]) //extra-challenge 
            .then(res => res.json())
            .then(moodObj => {
                fetch(toDoListUrl, configArray[3])
                .then(res => res.json())
                .then(listObj => {
                    renderDiary(storyObj,listObj,weatherObj,moodObj)
                })
            })
       })
    })
}

function renderStory(storyObj, moodArray){
    homePage.style.display = "block";

    homePage.append(returnStoryDiv(storyObj, moodArray));

}

function returnStoryDiv(storyObj, moodArray) {
    let divNode = document.createElement("div");
    divNode.classList.add("card");
    divNode.dataset.id = storyObj.id;

    let storyImg = storyObj.image;

    divNode.style.backgroundImage = `url(${storyImg})`;

    let cityNode = document.createElement("h2");
    cityNode.textContent = storyObj.city;
   
    let moraleNode = document.createElement("p");
  
    if(!Array.isArray(moodArray)){
        moraleNode.textContent = `One-liner: ${mood.one_liner}`;
    }else{
    moodArray.find(mood =>{
        if(mood.story_id == storyObj.id){
            moraleNode.textContent = `One-liner: ${mood.one_liner}`;
        }
    })};

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
    tempTask.innerHTML = "";
    pageIteration();
    indivPage.style.display = "grid";
    
    let storyImg = storyObj.image;
    indivPage.style.backgroundImage = `url(${storyImg})`;

    indivPage.dataset.id = storyObj.id;

    let cityNode = indivPage.querySelector("h2");
        cityNode.textContent = storyObj.city;

    let dateNode = indivPage.querySelector(".date-display");
        dateNode.textContent = `${storyObj.date}`;

    storyChange(storyObj,listArray,weatherArray,moodArray); //editing the story

    weatherAppend(weatherArray, storyObj);

    let listing = renderToDo(storyObj,listArray);
    
    tempTask.appendChild(listing);

    let newListForm = document.querySelector(".task-form");

    newListForm.addEventListener("submit", event => {
        event.preventDefault();

        const taskInput = event.target[0].value;
        addingNewTask(storyObj, taskInput, listing);
    })

    moodAppend(moodArray, storyObj);

    if(!Array.isArray(listArray)){
        newPage.style.display = "none";
        indivPage.style.display = "grid";
    }

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

function weatherAppend(weatherArray, storyObj){
  
    let weatherDiv = indivPage.querySelector(".weather-div");
    let temperature = weatherDiv.querySelector(".temperature");
    let weatherIcon = weatherDiv.querySelector("img");

    if(Array.isArray(weatherArray)){
        weatherArray.forEach(weather => {
    if(weather.story_id == storyObj.id){
        temperature.textContent = `${weather.temperature} F`
        weatherIcon.src= `src/image/${weather.icon}.png`;
    }})}
    else{
        temperature.textContent = `${weatherArray.temperature} F`
        weatherIcon.src= `src/image/${weatherArray.icon}.png`;
    }

    weatherDiv.append(temperature, weatherIcon, weather);
}

function moodAppend(moodArray, storyObj){
    let moodDiv = indivPage.querySelector(".mood-div");
    let moodContent = moodDiv.querySelector(".mood-content");
    let moodState = moodDiv.querySelector("strong");

    if(Array.isArray(moodArray)){
        moodArray.forEach(mood => {
            if(mood.story_id == storyObj.id){
                moodContent.textContent = `One-liner: ${mood.one_liner}`;
                moodState.textContent = `${mood.feeling}`;
            }})
    }else{
        moodContent.textContent = `One-liner: ${moodArray.one_liner}`;
        moodState.textContent = `${moodArray.feeling}`;
    }

    moodDiv.append(moodState, moodContent, mood);
}


function addingNewTask(storyObj, inputTask,listing){
    const task = inputTask;
    const story_id = storyObj.id;

    const creatingTask = {
        task,
        story_id
    }
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(creatingTask)
    }
  
    fetch(toDoListUrl, configObj)
    .then(res => res.json())
    .then(taskObj => {
            taskHelper(taskObj, listing)
    
    });

}

function taskHelper(taskObj, listing){
    let doList = document.createElement("div");
    doList.classList.add("task-list");
    doList.dataset.id = taskObj.id;
    doList.textContent = `${taskObj.task}`;
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    doList.append(deleteBtn);
   listing.append(doList);
   deleteBtn.addEventListener("click", event => {
        event.preventDefault()
        doList.remove()});
}

function renderToDo(storyObj, listArray) {
    
    if(Array.isArray(listArray)){
        let matchingList = [];
        listArray.forEach(list => {
            if (list.story_id === storyObj.id) {
                matchingList.push(list);
            }});

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
                })})
                return ul;
    }else{
        let ul = document.createElement("ul");
        let doList = document.createElement("div");
        doList.classList.add("task-list");
        doList.dataset.id = listArray.id;
        doList.textContent = `${listArray.task}`;

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
        return ul;
    }
}


