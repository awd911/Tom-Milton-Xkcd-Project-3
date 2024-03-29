import axios from 'axios';
import './App.css';

let mostRecentComic = 2500;

// creating namespace
const comicApp = {};

// storing the API key and base URL
comicApp.baseUrl = 'http://localhost:8010/proxy/info.0.json';

//import the useEffect Hook from the React library
//import { useEffect, useState } from 'react';

comicApp.getDefault = () =>{

 // const axios = require('axios').default;
  
  const apiUrl = 'https://xkcd.com/info.0.json';
  const url = "https://proxy.junocollege.com/https://xkcd.com/info.0.json";

     axios({
         method:'GET',
          url: url,
         responseType:'json',
         params:{
             reqUrl:apiUrl,
             proxyHeaders:{
                 'header_params':'value'
             },
             xmlToJson:false
         }
     })
     .then((response) => {
      mostRecentComic = response.data.num;
        console.log("!!!!! Axios Initial : ",response.data, "Last Comic ! ",mostRecentComic);
        // comicApp.displayDefaultComic(response.data);
        // comicApp.currentNumber = response.data.num;
     })


  fetch(url)
    .then((response) => {
     return response.json();
    }).then((data) => {
      comicApp.displayDefaultComic(data);
      comicApp.currentNumber = data.num;
    })
 }

comicApp.changeComic = () => {
  //fetch the API at the new location of index
  //console.log("not yet...");
  fetch(`https://proxy.junocollege.com/https://xkcd.com/${comicApp.comicNum}/info.0.json`)
  
    .then((response) => {
      return response.json();
    }).then((data) => {

      console.log("Current Num : ",comicApp.currNumber, " data.num: ",data.num);
      comicApp.displayDefaultComic(data);
      
      //currentNumber = data.num;
    })


}

//Takes the data from the API Call to populate the empty HTML elements in App
comicApp.displayDefaultComic = (data) => {

  const comicTitle = data.title;
  const currComic = data.img;
  const comicAlt = data.alt;
  const comicNum = data.num;
  const currentNumber = data.num;

  console.log("!! displayDefault Title",comicTitle," comicNum + currentNumber = ",comicNum, currentNumber);
  //currentNumber = data.num;

  

  //Title changer
  let currTitle = document.querySelector('h2');
  currTitle.innerText = comicTitle;
  
  //Quick way to empty the main contaier to "reset" the page
  const mainEmpty = document.querySelector('main');
  mainEmpty.innerHTML ="";
  
  const mainEl = document.querySelector('main');
  const numEl = document.createElement('div');

  const currImg = document.createElement('img');
  currImg.src = currComic;
  currImg.alt = comicAlt;



  // Fills the text area with the current Comic Number, if there isnt a text area, creates one first

  let currTextArea = document.querySelector("textarea");
  if(currTextArea){
    currTextArea.innerText = comicNum;
  }
  else{
    let newTextArea = document.createElement("textarea");
    newTextArea.id = "currentIssue";
    let textAreaNumber = document.createTextNode(comicNum);
    newTextArea.append(textAreaNumber);

    
    //currTextArea.innerHTML = ;
    numEl.appendChild(newTextArea)
    document.getElementById("currentIssue").disabled = true;
  
    console.log("Nope! Text area does not exist!");
  }

  mainEl.appendChild(numEl);
  mainEl.appendChild(currImg);
}

// EVENT HANDLERS
// the next and previous buttons need the data passed in or at the very least the comics current number
//The next button handler 
const handleNext = function () {
  //steps to run when event is "heard"
  comicApp.comicNum = comicApp.currentNumber + 1;
  document.getElementById("PreviousButton").disabled = false;

  if (comicApp.comicNum> mostRecentComic){
    document.getElementById("NextButton").disabled = true;
    console.log("~~~~~~~~~~~~~~~~ Max level reached ! ! ! ~~~~~~~~~~~~~~~");
  }
  else{
    comicApp.currentNumber++;
    console.log("ComicApp MAX: ", mostRecentComic, " ComicNum : ",comicApp.comicNum);
    comicApp.changeComic();
  }

  

}
//The previous button handler 
const handlePrevious = function () {
  //steps to run when event is "heard"
  //change the currentNumber value to be one lower than the previous call
  
  if (comicApp.comicNum >= mostRecentComic){
    document.getElementById("NextButton").disabled = false;
    console.log("~~~~~~~~~~~~~~~~ Descending from max level ~~~~~~~~~~~~~~~");
  }

  //Makes sure the comic cant go below 1
  if (comicApp.comicNum === 1){
    document.getElementById("PreviousButton").disabled = true;
  }
  else{
    comicApp.comicNum = comicApp.currentNumber -1;
    comicApp.currentNumber--;
    console.log("ComicApp Current number DOWN: ", comicApp.currentNumber, " ComicNum : ",comicApp.comicNum);
    comicApp.changeComic();

  }

 
}
//Sends the user to the End of the API
const handleLast = function () {
  //steps to run when event is "heard"
  //change the currentNumber value to be one
  comicApp.currentNumber = mostRecentComic;
  comicApp.comicNum = comicApp.currentNumber;
  
  document.getElementById("NextButton").disabled = true;
  document.getElementById("PreviousButton").disabled = false;
  console.log("ComicApp Current number DOWN: ", comicApp.currentNumber, " ComicNum : ",comicApp.comicNum);
  comicApp.changeComic();

 
}

//Sends the user to the beginning of the API
const handleFirst = function () {
  //steps to run when event is "heard"
  //change the currentNumber value to be one
  comicApp.currentNumber = 1;
  comicApp.comicNum = comicApp.currentNumber;
  
  if (comicApp.comicNum === 1){
    document.getElementById("PreviousButton").disabled = true;
    document.getElementById("NextButton").disabled = false;
  }
  
  console.log("ComicApp Current number DOWN: ", comicApp.currentNumber, " ComicNum : ",comicApp.comicNum);
  comicApp.changeComic();

 
}

//Sends the user to a random comic in the API
const handleRandom = function () {
  //steps to run when event is "heard"
  //change the currentNumber value to be one
  comicApp.currentNumber = Math.floor(Math.random() * (mostRecentComic - 1 + 1) + 1);
  comicApp.comicNum = comicApp.currentNumber;
  

  if (comicApp.currentNumber === mostRecentComic){
    document.getElementById("PreviousButton").disabled = false;
    document.getElementById("NextButton").disabled = true;
  }
  if (comicApp.currentNumber === 1){
    document.getElementById("PreviousButton").disabled = true;
    document.getElementById("NextButton").disabled = false;
  }
  
  console.log("ComicApp Current number RANDO: ", comicApp.currentNumber, " ComicNum : ",comicApp.comicNum);
  comicApp.changeComic();

 
}
// initialize the comicApp

comicApp.init = () => {
  //current number initialized to be replaced with the first API call (Maybe not needed)
  //comicApp.currentNumber = 0;
  comicApp.getDefault();
}

function App() {
  return (
    <div className="App">
      <h1>Comic Viewer</h1>
      <h2>XKCD : </h2>
      <textarea disabled></textarea>
      <main></main>

      {/* Area for the comic number to appear */}
      <section>
        <button id = "FirstButton" onClick={handleFirst}>First</button>
        <button id ="PreviousButton" onClick={handlePrevious}>Previous</button>
        <button id ="RandomButton" onClick={handleRandom}>Random</button>
        <button id ="NextButton" onClick={handleNext} >Next</button>
        <button id ="LastButton" onClick={handleLast} >Last</button>
      </section>
      <footer>
        <a href="https://xkcd.com/license.html">Copyright Info </a>
        </footer>
    </div>
  );
}

comicApp.init();

export default App;
