import React from 'react';
import {Panel}  from 'react-bootstrap'
import './style.css'

class AvailDataSets extends React.Component{

  constructor(props){
    super(props);
    this.state={
      isLoaded:null,
      option:[],
      dataSets:[],
      event:null
     }
   }
   componentDidMount(){
      fetch('../../../api/dataSets.json?fields=id,name,uid,periodType&paging=False')
      .then(res=>res.json())
      .then((result)=>{
        
        result.dataSets.map((item)=>{
          this.state.dataSets.push(item)
        })
        this.setState({isLoaded:true})
      })
    }
    componentWillReceiveProps(props){
      if(props.PeriodType!=null)
      this.getDataSets(props.PeriodType);
      if(props.AvailDataSets!=null)
      this.state.option.push(props.AvailDataSets[0])
    }
        getContent(event){
          var array = [...this.state.option];
          var eventval=[]
          array.forEach((val,index)=>{
            if(event.target.value===val.id){
                  eventval.push(val)
                  array.splice(index,1);
            }})
          this.setState({option:array,event:eventval},
            function(){
            console.log(this.state.event)
            this.props.callback(this.state.event)
          });
          
      }

      
      getDataSets(value){
           var array = [...this.state.option];
           array=[]
           this.setState({option:array})
           var dataSets=[]
            this.state.dataSets.map((item)=>{
              if(item.periodType==value)
              dataSets.push({name:item.name,id:item.id})
            })
           this.setState({option:dataSets})  
    }
     
    render(){
       var optionItems=this.state.option.map((arr)=>
      <option value={arr.id}>{arr.name}</option>)
      return(
            <Panel>
                <Panel.Heading >Available DataSets</Panel.Heading>
                <select multiple className='form-control' onDoubleClick={this.getContent.bind(this)}>
                        {optionItems}
                     </select>
               </Panel>
          )
      }
}

export default AvailDataSets;


