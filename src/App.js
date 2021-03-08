
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
comicApp.getDefault = () =>{

  const apiUrl = 'https://xkcd.com/info.0.json';

  fetch(apiUrl)
    .then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      comicApp.displayDefaultComic(data);
      comicApp.currentNumber = data.num;
    })
}

comicApp.changeComic = () => {
  //fetch the API at the new location of index
  fetch(`https://xkcd.com/${comicApp.currentNumber}/info.0.json`)
    .then((response) => {
      return response.json();
    }).then((data) => {


      console.log(data.num);
      comicApp.displayDefaultComic(data);
      comicApp.currentNumber = data.num;
    })


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

  // VVV Currently doesnt work, tells me that currNum.innerText is null after emptying the main elementnst currNum = document.querySelector("textarea");
    //Tried to switch the type of element to a div instead of a textarea

  // const currNum = document.querySelector("textarea");
  // if(currNum){
  //   console.log("Works!");
  // }
  // else{
  //   console.log("Nope!");
  // }

  // currNum.innerText = comicNum;

  // console.log(currNum);
  // mainEl.appendChild(currNum);


  mainEl.appendChild(currImg);
}

// EVENT HANDLERS
// the next and previous buttons need the data passed in or at the very least the comics current number
//The next button handler 
const handleNext = function () {
  //steps to run when event is "heard"
  comicApp.currentNumber = comicApp.currentNumber + 1;
  comicApp.changeComic();

}
//The previous button handler 
const handlePrevious = function () {
  //steps to run when event is "heard"
  //change the currentNumber value to be one lower than the previous call
  comicApp.currentNumber = comicApp.currentNumber -1;
  comicApp.changeComic();

 
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
      <h1>Comic Viewer</h1>
      <h2></h2>
      <main></main>

      {/* Area for the comic number to appear */}
      <section>
        <button onClick={handlePrevious}>Previous</button>
        <textarea></textarea>
        <button onClick={handleNext} >Next</button>
      </section>
      <footer>
        <a href="https://xkcd.com/license.html">Copyright Info </a>
        </footer>
    </div>
  );
}

comicApp.init();

export default App;
