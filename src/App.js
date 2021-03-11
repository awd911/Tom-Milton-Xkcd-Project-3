import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

//Imports the components
import ComicButton from './ComicButton.js'
import DisplayComic from './DisplayComic.js'

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

        {/* Calls the component and passes the crutial info to build the icon */}
        <ComicButton
          direction="previous"
          index={comicNumber}
          changeComicFunction={() => handlePrev(comicNumber)}
        />

        <i className="fa fa-question" label="Random" onClick={() => handleRandom(comic[0].num)}></i>

        <ComicButton
          direction="next"
          index={comicNumber}
          changeComicFunction={() => handleNext(comicNumber)}
        />

      </section>
      <footer>
        <a href="https://xkcd.com/license.html">Copyright Info </a>
      </footer>
    </div>
  );
}
export default App;
// create a Button component to be reused for both prev/next
// create a DisplayComic component to transfer the comic info into
