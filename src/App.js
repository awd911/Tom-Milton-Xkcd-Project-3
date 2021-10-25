
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

//Imports the components
import ComicButton from './ComicButton.js'
import DisplayComic from './DisplayComic.js'
// creating namespace
const comicApp = {};

// storing the API key and base URL
comicApp.baseUrl = 'http://localhost:8010/proxy/info.0.json';

//import the useEffect Hook from the React library
//import { useEffect, useState } from 'react';

comicApp.getDefault = () =>{

  const apiUrl = 'https://xkcd.com/info.0.json';
     axios({
         method:'GET',
         url: 'http://proxy.hackeryou.com',
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
        console.log(response.data);
        comicApp.displayDefaultComic(response.data);
        comicApp.currentNumber = response.data.num;
     })


//   fetch(apiUrl)
//     .then((response) => {
//       return response.json();
//     }).then((data) => {
//       console.log(data);
//       comicApp.displayDefaultComic(data);
//       comicApp.currentNumber = data.num;
//     })
}

function App() {
  //Initializes the States and their SetState functions that allows them to be modified
  const [comic, setComic] = useState([]);
  const [comicNumber, setComicNumber] = useState(Math.floor(Math.random() * 2445));

  //The use Effect function that calls the API and sets up the initial values
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://proxy.hackeryou.com',
      responseType: 'json',
      params: {
        //The API needs a proxy to not throw a CORS error
        //(Thanks Susan/Colin)
        reqUrl: `https://xkcd.com/${comicNumber}/info.0.json`,
        proxyHeaders: {
          header_params: 'value',
        },
        xmlToJSON: false,
      },
    }).then((data) => {
      setComic([data.data]);
      //setComicNumber(data.num);
    });
    //The variables that will re-call the useEffect function if called
  }, [comicNumber])

  //Functions that take the current page and use them to modify the state
  const handlePrev = (currentPage) => {
    if (currentPage > 1) {
      setComicNumber(currentPage - 1);
    }
    else {
      alert("Page cannot be less than 1")
    }
  };

  const handleNext = (currentPage) => {
    setComicNumber(currentPage + 1);
  };
  const handleRandom = (currentPage) => {
    const newNum = Math.floor(Math.random() * 2445)

    if (newNum === currentPage) {
      setComicNumber(500);
    }
    else {
      setComicNumber(newNum);
    }

  };
comicApp.changeComic = () => {
  //fetch the API at the new location of index
  console.log("not yet...");
//   fetch(`https://xkcd.com/${comicApp.currentNumber}/info.0.json`)

//     .then((response) => {
//       return response.json();
//     }).then((data) => {


  return (
    <div className="App">
      {/* Links for Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet"></link>

      {/* Importing Icons from Font-Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

      <h1>XKCD Comic Viewer</h1>
      {
        //Maps thru the API Comic state and passes it to the DisplayComic component
        comic.map((info) => {
          return (
            <DisplayComic
              title={info.title}
              image={info.img}
              altText={info.alt}
            />
          )
        })
      }


      <textarea disabled defaultValue={comicNumber}></textarea>
      <section>
//       console.log(data.num);
//       comicApp.displayDefaultComic(data);
//       comicApp.currentNumber = data.num;
//     })


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

        {/* Calls the component and passes the crutial info to build the icon */}
        <ComicButton
          direction="previous"
          index={comicNumber}
          changeComicFunction={() => handlePrev(comicNumber)}
        />
  // currNum.innerText = comicNum;

        <i className="fa fa-question" label="Random" onClick={() => handleRandom(comic[0].num)}></i>
  // console.log(currNum);
  // mainEl.appendChild(currNum);

        <ComicButton
          direction="next"
          index={comicNumber}
          changeComicFunction={() => handleNext(comicNumber)}
        />

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
        </footer>
    </div>
  );
}
export default App;
// create a Button component to be reused for both prev/next
// create a DisplayComic component to transfer the comic info into

comicApp.init();

export default App; 
