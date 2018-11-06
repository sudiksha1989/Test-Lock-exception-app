const reducer2=(state={
  periodType:null,
  lastValue:[]
},action)=>{
  switch(action.type){
    case "PERIOD":
    state={
      ...state,
      periodType:state.payload,
      lastValue:[...state.lastValue,action.payload]
    };
    break;
    case "BULB":
    state={
      ...state,
      result:action.payload,
      lastValue:[...state.lastValue,action.payload]
    };
    break;
  }
  return state;
}
export default reducer2
  
  