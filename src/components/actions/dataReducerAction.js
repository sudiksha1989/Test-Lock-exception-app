import { resolve } from "url";
import { rejects } from "assert";
import axios from "axios";


export function setPeriodType(period){
    return{
        type:"PERIOD-TYPE",
        payload:period
    }
}

export function setAvailPeriodVal(availPeriodVal){
    return{
        type:"AVAILPERIODVAL",
        payload:{
            availPeriodVal:availPeriodVal,
           }
    }
}

export function availPeriodOption(selPeriods,unselPeriods){
    return{
        type:"AVAILPERIOD-OPTIONS",
        payload:{
            availPeriodOption:selPeriods,
            selAvailPeriodOption:unselPeriods
        }
    }
}

export function selectAvailPeriod(selectedOption,unselectedOption,isperiodloaded){
    return{
        type:"SEL-AVAILPERIOD-OPTIONS",
        payload:{
            selectedAvailPeriodOption:selectedOption,
            notselAvailPeriodOption:unselectedOption,
            isperiodloaded:isperiodloaded
        },

    }
}

export function availDataSetOption(seldataSets,unseldataSets){
    return{
        type:"AVAILDATASETS-OPTIONS",
        payload:{
            seldataSets:seldataSets,
            unseldataSets:unseldataSets
        }
    }
}

export function selectAvailDS(selectedOption,unselectedOption,isdatasetloaded){
    return{
        type:"SEL-AVAILDATASETS-OPTIONS",
        payload:{
            selectedOption:selectedOption,
            unselectedOption:unselectedOption,
            isdatasetloaded:isdatasetloaded
        },

    }
}

//get post
export const getDataSets = () => dispatch => {
    axios
      .get('../../dataSets.json?fields=id,name,uid,periodType&paging=False')
      .then(res =>
        dispatch({
          type: "GET_DATASETS",
          payload:res.data.dataSets
        })
      )
      .catch(err =>
        dispatch({
          type: "GET_DATASETS",
          payload: null
        })
      );
  };

  //get post
export const getPeriods=()=>dispatch=>{
    axios
    .get('../../periodTypes.json')
    .then(res=>
        dispatch({
            type:'GET_PERIODS',
            payload:res.data.periodTypes
        }))
        .catch(err=>
            dispatch({
                type:'GET_PERIODS',
                payload:null
            }))
}


// export function getDataSets(url){
//     return dispatch=>{
//         fetch(url)
//         .then(res=>res.json())
//         .then((result)=>{
//              dispatch({
//                 type:"GET_POST",
//                 payload:result.dataSets
//             })
//         }).catch(error=>
//                 dispatch({
//                     type:"GET_POST",
//                     payload:null
//                 })
//                 )
//     }
    
// }