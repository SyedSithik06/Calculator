import {useReducer} from "react"
import './App.css';
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";


{/*obj Of Actions */}
 export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

{/*Type---We have Different types of Action
payload--actions are going to  pass along some paramaters */}

function reducer(state, { type, payload }){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          curValue: payload.digit,
          overwrite:false,
        }
      }
      if(payload.digit ==="0" && state.curValue ==="0"){
        return state
      } 
      if(payload.digit ==="." &&  state.curValue.includes(".")){
        return state 
      } 
      return {
        ...state,
        curValue: `${state.curValue || ""}${payload.digit}` //Digit -Something were going to pass our reducer
         
      } 
      case ACTIONS.CHOOSE_OPERATION:
        if(state.curValue == null && state.preValue == null){
          return state
        }
        if(state.curValue == null){
          return{
            ...state,
            operation: payload.operation,
          }
        }

        if(state.preValue == null){
          return{
            ...state,
            operation: payload.operation,
            preValue: state.curValue,
            curValue: null
          }
        }
       return{
        ...state,
        preValue: evaluate(state),
        operation:payload.operation,
        curValue: null
       }

      case ACTIONS.CLEAR:
        return{}
       
       case ACTIONS.EVALUATE:
        if(state.operation ==null || 
         state.curValue == null || 
         state.preValue == null){
          return state
        } 

        return{
          ...state,
          overwrite: true,
          preValue: null,
          operation: null,
          curValue: evaluate(state)
        }
        case ACTIONS.DELETE_DIGIT:
          if(state.overwrite) {
            return {
              ...state,
              curValue: null,
              overwrite: false
            }
        }
        if(state.curValue == null) return state
        if(state.curValue.length == 1){
          return {
            ...state,
            curValue: null  
          }
        }
        return{
          ...state,
          curValue: state.curValue.slice(0, -1) 
        }
  }

}

function evaluate({curValue, preValue, operation}){
  const prev = parseFloat(preValue)   // here converting string into numbers
  const current = parseFloat(curValue)
  if(isNaN(prev) || isNaN(current)) return ""
  let calculation= ""
  switch(operation){
    case "+":
     calculation = prev + current
     break
    case "-":
      calculation = prev - current
      break
    case "*":
        calculation = prev * current
        break
       case "÷":
          calculation = prev / current
          break
  }

  return calculation.toString()
}

function App() {
  const [{ curValue, preValue, operation }, dispatch] = useReducer(reducer, {})

  
  return (
    <div className="calculator-grid">
       <div className="output">
        <div className="previous-operand">{preValue}  {operation}</div>
        <div className="current-operand">{curValue}</div>
       </div>
       <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
       <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
       
       <OperationButton operation="÷" dispatch={dispatch} />
       <DigitButton digit="1" dispatch={dispatch} />
       <DigitButton digit="2" dispatch={dispatch} />
       <DigitButton digit="3" dispatch={dispatch} />
       <OperationButton operation="*" dispatch={dispatch} />
       <DigitButton digit="4" dispatch={dispatch} />
       <DigitButton digit="5" dispatch={dispatch} />
       <DigitButton digit="6" dispatch={dispatch} />
       <OperationButton operation="+" dispatch={dispatch} />
       <DigitButton digit="7" dispatch={dispatch} />
       <DigitButton digit="8" dispatch={dispatch} />
       <DigitButton digit="9" dispatch={dispatch} />
       <OperationButton operation="-" dispatch={dispatch} />
       <DigitButton digit="." dispatch={dispatch} />
       <DigitButton digit="0" dispatch={dispatch} />
       <button className="span-two" 
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>

    </div>
  )
}

export default App;
