import React from 'react';
import {MenuItem}  from 'react-bootstrap'

export const SelectedDropdown=(props)=>{
    let date= new Date(),
    dropdownValues=[],
    periodType=props.Period,
    year=date.getFullYear();
    if(props.Period!=null){
        if(periodType=="Monthly")
            {
                while(year>=2000){
                    dropdownValues.push(year)
                    year--;
                }
            }
            if(periodType=="FinancialApril")
            {
                while(year>=2000){
                    dropdownValues.push(year)
                    year--;
                }
            }
        }

    let listItems=dropdownValues.map((value)=><MenuItem eventKey={value}>{value}</MenuItem>)

    return listItems
    }
