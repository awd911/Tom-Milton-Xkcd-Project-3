const DisplayComic = (props) => {

    const comic =props;
    
    //Populates the comicContainer with all of the API info
    return (
            <div className="ComicContainer" key={comic.title}>
                <h2>{comic.title}</h2>
                <img src={comic.image} alt={comic.alt} />
            </div>
    )
}

export default DisplayComic;