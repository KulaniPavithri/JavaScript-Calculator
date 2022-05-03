import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/JavaScriptCalculator.scss';
import Button from './Button';

//Here, for each type of input we have to write seperate function to execute current input and
// its related operations. because parent is rerendering from chich component's input, if 
// write a single function for whole logic, parent component state is updating sequentialy with child component input changes.

const Calculator = () =>{
  const clearStyle = { background: '#37c1ae' },
  operatorStyle = { background: '#00d0f9' },//0094b2
  equalsStyle = {
    background: '#2fa695',//004047, 1d5b71
    
  };
  const operators = /[*+‑/]/;

  // '*' in /[+-/*]/ will be confusing so we have to change it to x and then convert again.
  const endsWithOperator = /[*+-/]$/;
  //const endsWithNegativeSign = /\d[*/+‑]{1}‑$/;
  
  const [currentInput, setCurrentInput] = React.useState("0");
  const [formula, setFormula] = React.useState('');
  const [prevValue, setPrevValue] = React.useState('0');
  const [evaluated, setEvaluated] = React.useState(false);

  const updateNumbers = (currentValue) => {
    if(evaluated){
      setCurrentInput(currentValue);
      setFormula(currentValue !=='0' ? currentValue : '');
      setEvaluated(false);
    } else{
      setCurrentInput((currentInput ==='0' || operators.test(currentInput)) ? currentValue : 
      currentInput + currentValue);

      if(currentValue ==='0' && currentInput === '0'){
        if(formula === ''){
          setFormula(currentValue);
        } else {
          setFormula(formula);
        }
      } else{
        if(endsWithOperator.test(formula)){
          setFormula(formula + currentValue);
          setPrevValue(currentValue);
        } else if (prevValue === '0'){
          setFormula(formula.slice(0, -1) + currentValue);
          setPrevValue(currentValue);
        } else{
          setFormula(formula+currentValue);
        }
        
        
      }

    }
   
  }

  const updateDecimal = (currentValue) => {
    if (evaluated) {
      setCurrentInput('0.');
      setFormula('0.');
      setEvaluated(false);
    } else {
      if (currentInput ==='0' || operators.test(currentInput)) {
        setCurrentInput('0.');
        if (formula.endsWith('0')) {
          setFormula(formula.slice(0, -1) + '0.'); 
        } else {
          setFormula(formula + '0.');
        }
        
      } else if (!currentInput.includes('.')) {
        setCurrentInput(currentInput + '.');
        setFormula(formula + '.');
      }
    }
  
  }

  const updateOperators = (currentValue) =>{
    
    setCurrentInput(currentValue);
    
    let isOperator = false;
    const endsWith = formula[formula.length-1];
    if (endsWith === '*' || endsWith === '+' || endsWith === '-' ||
     endsWith === '/') {
      isOperator = true;
    }
  //console.log(formula+ "operators " + ("dfggfx.").match(/[+-/*]/));
  
    if (evaluated){
      //console.log("inside evaluated");
      setFormula(prevValue + currentValue);
      setEvaluated(false);
    } else if (!isOperator){
      //console.log("inside !endsWithOperator");
      setPrevValue(formula);
      setFormula(formula + currentValue);
      //console.log(formula);
    } else if (!formula.endsWith("-")) {
      setFormula(((formula + currentValue).endsWith("-") ? formula : prevValue) + 
      currentValue);
    }
    // /\d[*+/-]{1}‑$/ regex was not working couldn't find why. So, as above it used endswith()
    /*else if (!endsWithNegativeSign.test(formula)){
      console.log("inside !endsWithNegativeSign");
      console.log(formula + currentValue + " " + /\d[*+/-]{1}‑$/.test(formula + currentValue));
      setFormula((endsWithNegativeSign.test(formula + currentValue) ? formula : prevValue) +
      currentValue);*/
    else if (currentValue !== '-'){
      setFormula(prevValue + currentValue);
    }
    //console.log("formula " + formula + " PV " + prevValue);
    
  }

  const updateEqualOperator = (currentValue) =>{
    setCurrentInput(currentValue);
    setPrevValue(currentValue);
    calculate();
  }

  const updateClear = (currentValue) => {
    setCurrentInput('0');
    setPrevValue('0');
    setFormula('');   
    setEvaluated(false);
    
  }
  
  const calculate = () =>{
    let expression = formula.slice();
    let endsWith = expression[expression.length-1];
    
    while (endsWith === '*' || endsWith === '+' || endsWith === '-' ||
      endsWith === '/') {
        expression = expression.slice(0, -1);
        endsWith = expression[expression.length-1];
    }

    /*while(endsWithOperator.test(expression)){
      expression = expression.slice(0, -1);
    }*/
    //console.log("expression " + expression);
    
    let finalResult=Math.round(1000000000000 * eval(expression)) / 1000000000000;
    setFormula(expression + "=" + finalResult);
    setCurrentInput(finalResult);
    setPrevValue(finalResult);
    setEvaluated(true);
    //console.log("calculated " + formula);
  }

  
  return(
    <div className="calculator">
      <div className="formulaScreen">{formula}</div>
      <div className="outputScreen" id="display">{currentInput}</div>
      <div className="buttonPad">
        <Button
          buttonClassName="jumbo"
          buttonId="clear"
          buttonStyle={clearStyle}
          buttonValue="AC"
          updateCurrentInput={updateClear}
        />
        <Button
          buttonClassName=""
          buttonId="divide"
          buttonStyle={operatorStyle}
          buttonValue="/"
          updateCurrentInput={updateOperators}
        />
        <Button
          buttonClassName=""
          buttonId="multiply"
          buttonStyle={operatorStyle}
          buttonValue="*"
          updateCurrentInput={updateOperators}
        />
        <Button 
        buttonClassName=""
        buttonId="seven"   
        buttonValue="7"
        updateCurrentInput={updateNumbers}
        />
        <Button 
        buttonClassName=""
        buttonId="eight"  
        buttonValue="8"
        updateCurrentInput={updateNumbers}
        />
        <Button 
        buttonClassName=""
        buttonId="nine" 
        buttonValue="9"
        updateCurrentInput={updateNumbers}
        />
        <Button 
        buttonClassName=""
        buttonId="subtract"
        buttonStyle={operatorStyle}
        buttonValue="-"
        updateCurrentInput={updateOperators}
        />
        <Button 
        buttonClassName=""
        buttonId="four"  
        buttonValue="4"
        updateCurrentInput={updateNumbers}
        />
        <Button 
        buttonClassName=""
        buttonId="five"  
        buttonValue="5"
        updateCurrentInput={updateNumbers}
        />
        <Button 
        buttonClassName=""
        buttonId="six"  
        buttonValue="6"
        updateCurrentInput={updateNumbers}
        />
        <Button 
        buttonClassName=""
        buttonId="add"
        buttonStyle={operatorStyle}
        buttonValue="+"
        updateCurrentInput={updateOperators}
        />
        <Button 
        buttonClassName=""
        buttonId="one"  
        buttonValue="1"
        updateCurrentInput={updateNumbers}
        />
        <Button 
        buttonClassName=""
        buttonId="two"  
        buttonValue="2"
        updateCurrentInput={updateNumbers}
        />
        <Button 
        buttonClassName=""
        buttonId="three"  
        buttonValue="3"
        updateCurrentInput={updateNumbers}
        />
        <Button
        buttonClassName="jumbo"
        buttonId="zero"   
        buttonValue="0"
        updateCurrentInput={updateNumbers}
        />
        <Button 
        buttonClassName=""
        buttonId="decimal" 
        buttonValue="."
        updateCurrentInput={updateDecimal}
        />
        <Button 
        buttonClassName="equalButton"
        buttonId="equals"
        buttonStyle={equalsStyle}
        buttonValue="="
        updateCurrentInput={updateEqualOperator}
        />
        
        </div>
      
    </div>
  );
}

export default Calculator;


/*
        
        */