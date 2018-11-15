import React from 'react';
import { Panel, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { getDataSets, availDataSetOption,selectAvailDS } from '../actions/dataReducerAction';
import './style.css'

var isdatasetloaded=false

class AvailDataSets extends React.Component {

  constructor(props){
    super(props);
    this.state={
      isloadedAvaildataSets:false,
      }
  }
  componentDidMount() {
    this.props.getDataSets();
  }

  handleChange(e){
    var options = e.target.options;
    var allAvailOptions=[],selectedOption=[],unselectedOption=[];
    for (var i = 0, l = options.length; i < l; i++) {
       (options[i].selected)? selectedOption.push({id:options[i].value,name:options[i].label}):unselectedOption.push({id:options[i].value,name:options[i].label})
       allAvailOptions.push({id:options[i].value,name:options[i].label})
      }
    this.props.selectAvailDS(allAvailOptions,selectedOption,unselectedOption);
  }
  
  getContent(event) {
    var array = [...this.state.option];
    var eventval = []
    array.forEach((val, index) => {
      if (event.target.value === val.id) {
        eventval.push(val)
        array.splice(index, 1);
      }
    })
    this.setState({ option: array, event: eventval },
      function () {
        console.log(this.state.event)
        this.props.callback(this.state.event)
      });
}

  dataSetsOption=(periodTypeVal,isdatasetloaded)=>{
    isdatasetloaded=false
   return  (this.props.updatedata.dataSets.map((item) => 
        (item.periodType == periodTypeVal)?
                (<option value={item.id}>{item.name}</option>):false
            ))
  }
  
  availDSOptions=()=>{
    var dataSets;


    var array = [...this.state.option];
    var eventval = []
    array.forEach((val, index) => {
      if (event.target.value === val.id) {
        eventval.push(val)
        array.splice(index, 1);
      }
    })
      dataSets=(this.props.updatedata.unselectedAvailDSOption.map((item) => 
            <option value={item.id}>{item.name}</option>))
     return dataSets
    }
    
    handleClick() {
     this.setState({isloadedAvaildataSets:true})
    }


  render() {
    var optionItems;
     if(this.props.Period!=null && isdatasetloaded==false)
     optionItems=this.dataSetsOption(this.props.Period,isdatasetloaded)
     if(this.state.isloadedAvaildataSets==true)
     optionItems=this.availDSOptions()
                    
    return (
      <Panel>
        <Panel.Heading >Available DataSets</Panel.Heading>
        <Button bsStyle="primary" className='button' onClick={this.handleClick.bind(this)}>ADD</Button>
        <select multiple={true} className='form-control' onChange={(event)=>this.handleChange(event)}>
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
    getDataSets: () => {
      dispatch(getDataSets())
    },
    availDataSetOption:(dataSet)=>{
      dispatch(availDataSetOption(dataSet))
    },
    selectAvailDS:(allOptions,selectedOption,unselectedOption)=>{
      dispatch(selectAvailDS(allOptions,selectedOption,unselectedOption))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AvailDataSets)


 
