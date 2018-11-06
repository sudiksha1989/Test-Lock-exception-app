import React from 'react';
import {DropdownButton,MenuItem,ButtonToolbar}  from 'react-bootstrap'



class SelectedDropdown extends React.Component{
    constructor(props){
        super(props);
        this.state={
            options:[],
            button:"Select year",
            month:null
            }
         //this.updateDropdown=this.updateDropdown.bind(this)
         this.handleUpdate=this.handleUpdate.bind(this)
        }

        handleUpdate(event)
        {
            this.setState({button:event,month:event},()=>{
                this.props.callback(this.state.month)
            })}

        componentWillMount(){
            let date= new Date(),
            dropdownValues=[],
            periodType=this.props.PeriodType,
            year=date.getFullYear();
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
            
            this.setState({options: dropdownValues})
            
        }
        
        render(){
            let listItems=this.state.options.map((value)=>
                <MenuItem eventKey={value}>{value}</MenuItem>
            )
        return(
            <ButtonToolbar >
                <DropdownButton onSelect={this.handleUpdate}
                    title={this.state.button}>
                    {listItems}
                </DropdownButton>
            </ButtonToolbar>
        )
    }
}

export default SelectedDropdown;