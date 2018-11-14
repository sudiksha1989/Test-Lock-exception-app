import { resolve } from "url";
import { rejects } from "assert";
import axios from "axios"

export function setPeriodType(period){
    return{
        type:"PERIOD-TYPE",
        payload:period
    }
}

export function availDataSetOption(DataSets){
    return{
        type:"AVAILDATASETS-OPTIONS",
        payload:DataSets
    }
}

export function selectAvailDS(allOptions,selectedOption,unselectedOption){
    return{
        type:"SEL-AVAILDATASETS-OPTIONS",
        payload:{
            allOptions:allOptions,
            selectedOption:selectedOption,
            unselectedOption:unselectedOption
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