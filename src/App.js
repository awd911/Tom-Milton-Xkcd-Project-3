
import './App.css';

// creating namespace
const comicApp = {};

// storing the API key and base URL
comicApp.baseUrl = 'https://xkcd.com/info.0.json';

//import the useEffect Hook from the React library
//import { useEffect, useState } from 'react';

//HELP QUE NUMBER 1
//CORS error on fetch
  // 1. tried to add a proxy to get the right header info
  // 2. tried a plugin on chrome (Which works but idk if thats okay)

//HELP QUE NUM 2
//targeting the text area using query selector returns NULL after the inital load
  // not the query selector but 
comicApp.getDefault = () =>{

  //Proxied the API to avoid a CORS error from crashing the site (Thanks Susan!)
  const proxiedURL = 'https://xkcd.com/info.0.json';
 
  const url = new URL('http://proxy.hackeryou.com');
  url.search = new URLSearchParams({
    reqUrl: proxiedURL,
  });

  fetch(url)
    .then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      comicApp.displayDefaultComic(data);
      comicApp.currentNumber = data.num;
      comicApp.newestComic = data.num;

    })
}

comicApp.changeComic = () => {
  //fetch the API at the new location of index

  const proxiedURL = `https://xkcd.com/${comicApp.currentNumber}/info.0.json`;

  const url = new URL('http://proxy.hackeryou.com');
  url.search = new URLSearchParams({
    reqUrl: proxiedURL,
  });

  //TRY/Catch Does not work!! 
  try {

    fetch(url)
      .then((response) => {
        return response.json();
      }).then((data) => {
  
  
        console.log(data.num);
        comicApp.displayDefaultComic(data);
        comicApp.currentNumber = data.num;
      })
  }
  catch(err){
    alert("The page does not exsist!");
  }

}

//Takes the data from the API Call to populate the empty HTML elements in App
comicApp.displayDefaultComic = (data) => {

  const comicTitle = data.title;
  const currComic = data.img;
  const comicAlt = data.alt;
  const comicNum = data.num;

  

  //Title changer
  let currTitle = document.querySelector('h2');
  currTitle.innerText = comicTitle;
  
  //Quick way to empty the main contaier to "reset" the page
  const mainEmpty = document.querySelector('main');
  mainEmpty.innerHTML ="";
  
  const mainEl = document.querySelector('main');
  //Image element (Currently duplicating unwanted times)
  const currImg = document.createElement('img');
  currImg.src = currComic;
  currImg.alt = comicAlt;

  mainEl.appendChild(currImg);
  // VVV Currently doesnt work, tells me that currNum.innerText is null after emptying the main elementnst currNum = document.querySelector("textarea");
    //Tried to switch the type of element to a div instead of a textarea

  const currNum = document.querySelector("textarea");
  if(currNum){
    console.log("Works!");
    currNum.innerText = comicNum;
    mainEl.appendChild(currNum);
  }
  else{
    console.log("Nope!");
  }
}

// EVENT HANDLERS
//change the global variable up or down 1 depending on the button pushed 
//The previous button handler 
const handlePrevious = function () {
  //change the currentNumber value to be one lower than the previous call
  comicApp.currentNumber = comicApp.currentNumber -1;
  comicApp.changeComic();

  
}

//The next button handler 
const handleNext = function () {
  comicApp.currentNumber = comicApp.currentNumber + 1;
  comicApp.changeComic();

}
//the random button handler
  //Uses a simple Math library call to get a random comic from the API
const handleRandom = function () {
  comicApp.currentNumber = Math.floor(Math.random() * comicApp.newestComic);
  comicApp.changeComic();
}

//Will call a firebase API to add the current comic to  Firebase
const handleFavourite = function () {
  console.log("Fav has been click");  
}

// initialize the comicApp
comicApp.init = () => {
  //current number initialized to be replaced with the first API call (Maybe not needed)
  comicApp.currentNumber = 0;
  comicApp.getDefault();
}


function App() {
  return (
    <div className="App">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

      <h1>Comic Viewer</h1>
      <h2></h2>
      <main></main>

      {/* Area for the comic number to appear */}
      <section>
        <i className="fa fa-arrow-left" onClick={handlePrevious}></i>
        <i className="fa fa-question" onClick={handleRandom}></i>
        <textarea></textarea>
        <i className="fa fa-star" onClick={handleFavourite}></i>
        <i className="fa fa-arrow-right" onClick={handleNext}></i>
      </section>
      <footer>
        <a href="https://xkcd.com/license.html">Copyright Info </a>
        </footer>
    </div>
  );
}

comicApp.init();

export default App;
