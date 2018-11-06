import React from 'react';
import {Panel,LisoupItem}  from 'react-bootstrap'
import './style.css'

class SelectedPeriod extends React.Component{
    constructor(props){
        super(props);
         this.state={
          option:[],
          event:null
            }
          }
          componentWillReceiveProps(props){
            if(props.SelectedPeriod!=null)
            this.getPeriods(props.SelectedPeriod);
            if(props.PeriodType!=null)
            {
              var array = [...this.state.option];
              array=[]
              this.setState({option:array})
            }
           }
           getPeriods(periods){
            this.state.option.push(periods)
        }
        getcontent(event){
            var eventval=[]
            let array = [...this.state.option],
            period=parseInt(event.target.value);;
            array.forEach((val,index)=>{
                if(period===parseInt(val.value)){
                    eventval.push(val)
                    array.splice(index,1);
                  }})
                this.setState({option:array,event:eventval},()=>{
                  this.props.callback(this.state.event[0])
                });
        }



   
      render(){
      // if(this.props.SelectedPeiod!=null)
        // this.state.option.push(this.props.SelectedPeiod)
        
         var optionItems=this.state.option.map((arr)=>
          <option value={arr.value}>{arr.month}</option>)       
         
           return(
            <Panel >
                <Panel.Heading >Selected Periods</Panel.Heading>
                     <select multiple className='form-control' onDoubleClick={this.getcontent.bind(this)}>
                         {optionItems}
                     </select>
               </Panel>
          )
      }
}

export default SelectedPeriod;