const ComicButton = (props) =>{
     
    const direction = props.direction;

    const handleChange = () =>{
         console.log(props.index);
         props.changeComicFunction(props.index)
     }

    return(
        //Determines which way the button will go depending on the props.direction
        (direction=== "previous")?
        <i className="fa fa-arrow-left" label="Previous Arrow" onClick={() => handleChange()}></i>
        
        :
        <i className="fa fa-arrow-right" label="Next Arrow" onClick={() => handleChange()}></i>
    )
}

export default ComicButton;