import { resolve } from "url";
import { rejects } from "assert";

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

export function clearData(){
    return{
        type:"CLEAR-THINGS",
    }
}