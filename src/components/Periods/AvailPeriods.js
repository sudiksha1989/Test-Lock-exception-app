import React from 'react';
import {Panel}  from 'react-bootstrap'
import './style.css'
import PropTypes from 'prop-types';
import SelectedDropdown from './SelectedDropdown'

class AvailPeriods extends React.Component{

  constructor(props){
    super(props);
    this.state={
            option:[],
            periodType:null,
            year:null,
            event:null,
            month:['January','February','March','April','May','June','July','August','September','October','November','December']
            }
            this.handleUpdate=this.handleUpdate.bind(this)
      }
      handleUpdate=(event)=>{
        let empty=[];
        this.setState({option:empty,year:event},()=>{
          let date= new Date(),
          currentYear=date.getFullYear(),
          optionValue=[],
          index=0,
          month=((currentYear==event)?date.getMonth():11);

          while(index!=month+1){
            optionValue.push({value:this.state.year.toString()+index.toString(),month:this.state.month[index]+" "+this.state.year})
            index++;
          }
          this.setState({option:optionValue})
        })
      }
      componentWillReceiveProps(props){
        let emptyArr=[]
        if(props.PeriodType!=null)
        this.setState({periodType:props.PeriodType,option:emptyArr})
        if(props.AvailPeriods!=null)
        this.state.option.push(props.AvailPeriods)
        }
        getContent(event){
              var eventval=[]
              let array = [...this.state.option],
              period=parseInt(event.target.value);
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
          var optionItems=this.state.option.map((arr)=>
          <option value={arr.value}>{arr.month}</option>)
          return(
                <Panel>
                    <Panel.Heading >Organisation Unit Selection</Panel.Heading>
                        {(this.state.periodType=='Monthly')?<SelectedDropdown PeriodType={this.state.periodType} callback={this.handleUpdate}/>:false}
                        <select multiple className='form-control' onDoubleClick={this.getContent.bind(this)}>
                            {optionItems}
                        </select>
                  </Panel>
              )
          }
        }

AvailPeriods.protoTypes = {
  callback : PropTypes.func
  } 

export default AvailPeriods;