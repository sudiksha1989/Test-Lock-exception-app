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
  dataSetsOption:[],
  availPeriodVal:null,
  availPeriodOption:[],
  selAvailPeriodOption:[],
  selectedAvailPeriodOption:[],
  notselAvailPeriodOption:[],
  PeriodOption:[]
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
       break;
       case "AVAILPERIODVAL":
        state={
          ...state,
          availPeriodVal:action.payload,
          };
        break;
      case "AVAILPERIOD-OPTIONS":
      state={
        ...state,
        availPeriodOption:action.payload.availPeriodOption,
        selAvailPeriodOption:action.payload.selAvailPeriodOption,
        isLoadedAvailDS:true,
       };
      break;
      case "SEL-AVAILPERIOD-OPTIONS":
      state={
        ...state,
        selectedAvailPeriodOption:[...state.selectedAvailPeriodOption,action.payload.selectedAvailPeriodOption],
        notselAvailPeriodOption:[...state.notselAvailPeriodOption,...action.payload.notselAvailPeriodOption],
        PeriodOption:[...state.PeriodOption,...action.payload.PeriodOption],
        };
       break;
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