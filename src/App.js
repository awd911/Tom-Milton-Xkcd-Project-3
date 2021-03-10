

import './App.css';
import { useState } from 'react';

//import ChangeComic from './ChangeComic';

// creating namespace
const comicApp = {};

// storing the API key and base URL
comicApp.Url = 'https://xkcd.com/info.0.json';


//HELP QUE NUM 2
//targeting the text area using query selector returns NULL after the inital load
// Tried changing it from a textArea to a div

//First call to the API and sets the default comic up for vieweing
  // CALLS: displayDefaultComic(data) To display the API 
  // RETURNS: N/A

comicApp.getDefault = () => {
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
      console.log(data.num);
      comicApp.currentNumber = data.num;
      comicApp.newestComic = data.num;

      comicApp.displayDefaultComic(data);
    })


  //     // VVV Currently doesnt work, tells me that currNum.innerText is null after emptying the main elementnst currNum = document.querySelector("textarea");
  //     //Tried to switch the type of element to a div instead of a textarea

  //     const currNum = document.querySelector("textarea");
  //     if (currNum) {
  //       console.log("Works!");
  //       currNum.innerText = comicNum;
  //       mainEl.appendChild(currNum);
  //     }
  //     else {
  //       console.log("Nope!");
  //     }


}

comicApp.changeComic = () => {
  //fetch the API at the new location of index
  console.log(comicApp.currentNumber);
  const proxiedURL = `https://xkcd.com/${comicApp.currentNumber}/info.0.json`;

  const url = new URL('http://proxy.hackeryou.com');
  url.search = new URLSearchParams({
    reqUrl: proxiedURL,
  });

  fetch(url)
    .then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data.num);
      comicApp.currentNumber = data.num;

      //call to display the new comic
      comicApp.displayDefaultComic(data);
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
  mainEmpty.innerHTML = "";

  const mainEl = document.querySelector('main');
  //Image element (Currently duplicating unwanted times)
  const currImg = document.createElement('img');
  currImg.src = currComic;
  currImg.alt = comicAlt;

  mainEl.appendChild(currImg);

}

// EVENT HANDLERS
//change the global variable up or down 1 depending on the button pushed 
//The previous button handler 
const handlePrevious = function () {
  //change the currentNumber value to be one lower than the previous call
  comicApp.currentNumber = comicApp.currentNumber - 1;
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
  console.log("RANDO!!!! " + comicApp.newestComic)
  comicApp.changeComic();
}

// initialize the comicApp
comicApp.init = () => {
  //current number initialized to be replaced with the first API call (Maybe not needed)
  comicApp.currentNumber = 0;
  comicApp.getDefault();
}


function App() {

  let [currentURL] = useState(comicApp.Url);

  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet"></link>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

      <div className="wrapper">


        <h1>XKCD Comic Viewer</h1>

        <div className="comicPanel">
          <h2></h2>
          <main></main>
        </div>



        {/* Area for the comic number to appear */}
        <section>
          <i className="fa fa-arrow-left" onClick={handlePrevious}></i>
          <i className="fa fa-question" onClick={handleRandom}></i>
          <i className="fa fa-arrow-right" onClick={handleNext}></i>
        </section>
      </div>
        <footer>
          <a href="https://xkcd.com/license.html">Copyright Info </a>
        </footer>
    </div>
  );
}

comicApp.init();

export default App;
