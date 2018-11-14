import React from 'react';
import { Panel, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { getDataSets, availDataSetOption,selectAvailDS } from '../actions/dataReducerAction';
import './style.css'


let periodTypeVal=null
class AvailDataSets extends React.Component {

  constructor(props){
    super(props);
    this.state={
      isloadedAvaildataSets:false,
      isdatasetloaded:false,
      periodTypeVal:null
    }
  }
  componentDidMount() {
    this.props.getDataSets();
  }

  handleChange(e){
    this.setState({periodTypeVal:null})
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
   static getDerivedStateFromProps(nextProps, prevState){
      if(nextProps.Period!==prevState.periodTypeVal){
        return { periodTypeVal: nextProps.Period};
      }
      else return null;
        }

    componentDidUpdate(prevProps) {
      if(prevProps.Period!==this.props.Period){
        this.setState({periodTypeVal: this.props.Period});
        }
    }
    
 
  dataSetsOption=()=>{
    return (this.props.updatedata.dataSets.map((item) => 
      (item.periodType == this.state.periodTypeVal)?
              (<option value={item.id}>{item.name}</option>):false
          ))         
     }
    selectedDataSetsOption=()=>{
      this.setState({isloadedAvaildataSets:false})
      return (this.props.updatedata.unselectedAvailDSOption.map((item) => 
              <option value={item.id}>{item.name}</option>))
      }
    handleClick() {
      this.setState({isloadedAvaildataSets:true})
      }


  render() {
    let optionItems=(this.state.periodTypeVal!=null)?
                    (this.dataSetsOption())
                    :(this.state.isloadedAvaildataSets==true)?
                    this.selectedDataSetsOption():[]
                    
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



