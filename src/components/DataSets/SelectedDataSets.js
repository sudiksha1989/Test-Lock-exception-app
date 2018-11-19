import React from 'react';
import {Panel}  from 'react-bootstrap'
import { connect } from 'react-redux';
import './style.css'

class SelectedDataSets extends React.Component{
    constructor(props){
        super(props);
         this.state={option:[]}
          }

          componentWillReceiveProps(props){
              if(props.SelectedDataSets!=null)
              this.getDataSets(props.SelectedDataSets);
              if(props.PeriodType!=null)
              {
                var array = [...this.state.option];
                array=[]
                this.setState({option:array})
              }
             }
            getcontent(event){
            var array = [...this.state.option];
            var eventval=[]
            array.forEach((val,index)=>{
              if(event.target.value===val.id)
              {
                eventval.push(val)
                array.splice(index,1);
                }})
            this.setState({option:array,event:eventval},function(){
                this.props.callback(this.state.event)
            });
            
        }

        getDataSets(dataSets){
            this.state.option.push(dataSets[0])
        }

   
      render(){
         var optionItems= this.state.option.map((arr)=>
         <option value={arr.id}>{arr.name}</option>)         
         
           return(
            <Panel >
                <Panel.Heading >Selected DataSets</Panel.Heading>
                     <select multiple className='form-control' onDoubleClick={this.getcontent.bind(this)}>
                         {optionItems}
                     </select>
               </Panel>
          )
      }
}

const mapStateToProps = (state) => {
    return {
      updatedata: state.updatedata,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
     
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(SelectedDataSets)
  
  