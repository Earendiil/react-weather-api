import { useState } from "react";


export default function Calculate () {

    const [firstNumber, setFirstNumber] = useState ();
    const [secondNumber, setSecondNumber] = useState ();
    const [result, setResult] = useState (0);

    const increment = () =>{
       setResult(firstNumber + secondNumber);
    }

    const decrement = () => {
        setResult (firstNumber - secondNumber);
    }

    const multiply = () => {
        setResult (firstNumber * secondNumber);
    }

    const divide = () => {
        setResult (firstNumber / secondNumber);
    }


    return (
        <div>
        
      <input type="number" value={firstNumber} placeholder="Give a first number"
            onChange={(e) => setFirstNumber(Number(e.target.value))}
            ></input>
      
      <input type="number" value={secondNumber} placeholder="Give the second number"
             onChange={(e) => setSecondNumber(Number (e.target.value))}></input>

      <div className="calculations">
      <h2>Choose a calculation </h2>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <button onClick={multiply}>*</button>
            <button onClick={divide}>/</button>
      </div>

      <h2>The result is: {result}</h2>
      

    </div>
    )




}