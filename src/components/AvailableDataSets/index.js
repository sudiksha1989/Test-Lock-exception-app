import React from 'react';
import { Panel, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { getDataSets, availDataSetOption,selectAvailDS } from '../actions/dataReducerAction';
import './style.css'

class AvailableDataSets extends React.Component {

  constructor(props){
    super(props);
    this.state={
      isloadedAvailDSAdd:false,
      isloadedAvailDSRemove:false,
      isdatasetloaded:false,
      periodTypeVal:null,
      selectedOption:[],
      unselectedOption:[],
      
      }
  }
  componentDidMount() {
    this.props.getDataSets();
  }

  componentWillReceiveProps(props) {
    if(props.Period!==this.state.periodTypeVal)
    this.setState({periodTypeVal:props.Period,isdatasetloaded:false})

  }
  handleChange(e,param){
    var options = e.target.options;
    var allAvailOptions=[],selectedOption=[],unselectedOption=[];
    if(param=='ADD')  {
      for (var i = 0, l = options.length; i < l; i++) {
        (options[i].selected)? selectedOption.push({id:options[i].value,name:options[i].label}):unselectedOption.push({id:options[i].value,name:options[i].label})
       }
     this.setState({selectedOption:selectedOption,unselectedOption:unselectedOption});
    }
    if(param=='REMOVE')  {
      for (var i = 0, l = options.length; i < l; i++) {
        (options[i].selected)? selectedOption.push({id:options[i].value,name:options[i].label}):unselectedOption.push({id:options[i].value,name:options[i].label})
        allAvailOptions.push({id:options[i].value,name:options[i].label})
       }
       this.setState({selectedOption:selectedOption,unselectedOption:unselectedOption});
    }
    
  }
  
  dataSetsOption=(periodTypeVal)=>{
    this.setState({isdatasetloaded:true})
    var dataSet=(this.props.updatedata.dataSets.map((item) => 
        (item.periodType == periodTypeVal)?
                (<option value={item.id}>{item.name}</option>):false
            ))
    this.props.availDataSetOption(dataSet,[])
}
  
  availDSOptions=()=>{
    var unseldataSets,seldataSets=[],data=this.props.updatedata.selectedAvailDSOption
    unseldataSets=this.props.updatedata.unselectedAvailDSOption.map((item) => 
              <option value={item.id}>{item.name}</option>)
    seldataSets=this.props.updatedata.selectedAvailDSOption.map((item) => 
        <option value={item.id}>{item.name}</option>)
    
    this.props.availDataSetOption(unseldataSets,seldataSets)
    this.setState({isloadedAvailDSAdd:false})
    }
    
    removeavailDSOptions=()=>{
      var seldataSets,notseldataSets
    seldataSets=(this.props.updatedata.unselectedAvailDSOption.map((item) => 
            <option value={item.id}>{item.name}</option>))
    notseldataSets=(this.props.updatedata.selectedAvailDSOption.map((item) => 
            <option value={item.id}>{item.name}</option>))

     this.props.availDataSetOption(seldataSets,notseldataSets)
     this.setState({isloadedAvailDSRemove:false})
    }
    
    handleClick(param) {
      if(param=='ADD'){
        this.setState({isloadedAvailDSAdd:true})
        this.props.selectAvailDS(this.state.selectedOption,this.state.unselectedOption,false)
      }
      if(param=='REMOVE'){
      this.setState({isloadedAvailDSRemove:true})
      this.props.selectAvailDS(this.state.unselectedOption,this.state.selectedOption,true)
      }
      
    }


  render() {
    if(this.props.Period!=null && this.state.isdatasetloaded==false)
     this.dataSetsOption(this.props.Period)
    if(this.state.isloadedAvailDSAdd==true)
      this.availDSOptions()
    if(this.state.isloadedAvailDSRemove==true)
      this.removeavailDSOptions()
     
                    
    return (
      <div>
      <Panel className="leftPanel">
        <Panel.Heading >Available DataSets</Panel.Heading>
        <Button bsStyle="primary" className='button' onClick={this.handleClick.bind(this,'ADD')}>ADD</Button>
        <select multiple={true} className='form-control' onChange={(event)=>this.handleChange(event,'ADD')}>
          {this.props.updatedata.availdataSetsOption}
        </select>
      </Panel>

      <Panel className="rightPanel">
        <Panel.Heading >Selected DataSets</Panel.Heading>
        <Button bsStyle="primary" className='button' onClick={this.handleClick.bind(this,'REMOVE')}>REMOVE</Button>
              <select multiple className='form-control' onChange={(event)=>this.handleChange(event,'REMOVE')}>
                  {this.props.updatedata.selavaildataSetsOption}
              </select>
        </Panel>
</div>
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
    availDataSetOption:(seldataSets,unseldataSets)=>{
      dispatch(availDataSetOption(seldataSets,unseldataSets))
    },
    selectAvailDS:(selectedOption,unselectedOption,isdatasetloaded)=>{
      dispatch(selectAvailDS(selectedOption,unselectedOption,isdatasetloaded))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AvailableDataSets)


 
