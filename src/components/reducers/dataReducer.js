const dataReducer=(state={
    periodType:null,
    lastValue:[]
  },action)=>{
    switch(action.type){
      case "PERIOD-TYPE":
      state={
        ...state,
        periodType:action.payload,
        lastValue:[...state.lastValue,action.payload],
        testvalue:this.state.lastValue.filter((x,i) => i != index )
      };
      break;
      case "SUBTRACT":
      state={
        ...state,
        result:action.payload,
        lastValue:[...state.lastValue,action.payload]
      };
      break;
    }
    return state;
  }

export default dataReducer