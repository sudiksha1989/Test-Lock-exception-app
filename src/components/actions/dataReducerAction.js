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
        type:"DATASETS-OPTIONS",
        payload:DataSets
    }
}

//get post
export const getDataSets = (url) => dispatch => {
    axios
      .get(url)
      .then(res =>
        dispatch({
          type: "GET_POST",
          payload:res.data.dataSets
        })
      )
      .catch(err =>
        dispatch({
          type: "GET_POST",
          payload: null
        })
      );
  };
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

export function clearData(){
    return{
        type:"CLEAR-THINGS",
    }
}