import React from 'react';

const Button = (props) =>{
    const buttonRef = React.createRef();
    const [active, setActive] = React.useState(false);
    const onClick = (e) =>{
        setActive(true);
        props.updateCurrentInput(props.buttonValue);
    }

    React.useEffect(()=>{
        if(active){
            buttonRef.current.style.borderRadius = "50px";
            setTimeout(()=>setActive(false), 100);
        }else{
            buttonRef.current.style.borderRadius = "0px";
        }
    }, [active, buttonRef]);

    return(
        <div 
        ref={buttonRef}
        className={"button " + props.buttonClassName}
        id={props.buttonId}
        style={props.buttonStyle}
        //value={props.buttonValue} - div doesn't have a value attribute
        onClick={onClick}
        updateCurrentInput={props.updateCurrentInput}>
            <p>{props.buttonValue}</p>
        </div>);
    
}

export default Button;