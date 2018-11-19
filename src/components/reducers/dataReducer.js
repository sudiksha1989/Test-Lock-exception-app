const initialstate={
  periodType:null,
  dataSets:[],
  availdataSetsOption:[],
  isLoadedAvailDS:false,
  lastValue:[],
  selAvaildataSets:[],
  periodSelect:null,
  periodtitle:null,
  isLoadedPeriod:false,
  allAvaildataSets:[],
  selectedAvailDSOption:[],
  unselectedAvailDSOption:[],
  dataSetsOption:[]


}

const dataReducer=(state=initialstate,action)=>{
    switch(action.type){
      case "PERIOD-TYPE":
      state={
        ...state,
        periodSelect:action.payload,
        lastValue:[...state.lastValue,action.payload],
        };
      break;
      case "GET_PERIODS":
      state={
        ...state,
        periodType:action.payload,
        isLoadedPeriod:true,
        periodtitle:"Select PeriodType"
       }
      case "GET_DATASETS":
      state={
        ...state,
        dataSets:action.payload,
        };
      break;
      case "AVAILDATASETS-OPTIONS":
      state={
        ...state,
        availdataSetsOption:action.payload.seldataSets,
        selavaildataSetsOption:action.payload.unseldataSets,
        isLoadedAvailDS:true,
       };
      break;
      case "SEL-AVAILDATASETS-OPTIONS":
      state={
        ...state,
        selectedAvailDSOption:[...state.selectedAvailDSOption,action.payload.selectedOption],
        unselectedAvailDSOption:[...state.unselectedAvailDSOption,...action.payload.unselectedOption],
        dataSetsOption:[...state.dataSetsOption,...action.payload.dataSetsOption],
        };
       break;
    }
    return state;
  }

export default dataReducer