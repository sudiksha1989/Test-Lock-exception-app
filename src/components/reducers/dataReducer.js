const dataReducer=(state={
    periodType:null,
    dataSets:[],
    dataSetsOption:[],
    lastValue:[]
  },action)=>{
    switch(action.type){
      case "PERIOD-TYPE":
      state={
        ...state,
        periodType:action.payload,
        lastValue:[...state.lastValue,action.payload],
        };
      break;
      case "GET_POST":
      state={
        ...state,
        dataSets:action.payload,
        };
      break;
      case "DATASETS-OPTIONS":
      state={
        ...state,
        dataSetsOption:action.payload,
       };
      break;
      case "CLEAR-THINGS":
        return [];
    }
    return state;
  }

export default dataReducer