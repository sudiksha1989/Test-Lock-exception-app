import React from 'react';
import { Panel, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { getDataSets, availDataSetOption,selectAvailDS } from '../actions/dataReducerAction';


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
      yes:null,
      mo:null
      
      }
  }
  componentDidMount() {
    this.props.getDataSets();
  }

  componentWillReceiveProps(props) {
    if(props.Period!==this.state.periodTypeVal)
    this.setState({periodTypeVal:props.Period,isdatasetloaded:false})
  }
  
  handleChange(e){
    var options = e.target.options;
    var selectedOption=[],unselectedOption=[];
      for (var i = 0, l = options.length; i < l; i++) {
        (options[i].selected)? selectedOption.push({value:options[i].value,name:options[i].label,key:options[i].id}):unselectedOption.push({value:options[i].value,name:options[i].label,key:options[i].id})
       }
     this.setState({selectedOption:selectedOption,unselectedOption:unselectedOption});
    }
  
  dataSetsOption=(periodTypeVal)=>{
    this.setState({isdatasetloaded:true})
    var dataSet=(this.props.updatedata.dataSets.map((item,index) => 
        (item.periodType == periodTypeVal)?
                (<option value={item.value} id={index}>{item.name}</option>):false
            ))
    this.props.availDataSetOption(dataSet,[])
}
  
  addAvailDSOptions=()=>{
    var unseldataSets,seldataSets=[];
    seldataSets=this.props.updatedata.selectedAvailDSOption.sort((a,b) => parseInt(a.key)-parseInt(b.key)) 
    .map((item) => <option value={item.value} id={item.key} >{item.name}</option>)
    unseldataSets=this.props.updatedata.unselectedAvailDSOption.sort((a,b) => parseInt(a.key)-parseInt(b.key))
    .map((item) => <option value={item.value} id={item.key}>{item.name}</option>)
    
    this.props.availDataSetOption(unseldataSets,seldataSets)
    this.setState({isloadedAvailDSAdd:false,yes:this.props.updatedata.selectedAvailDSOption,no:this.props.updatedata.unselectedAvailDSOption})
    }
    
    removeavailDSOptions=()=>{
      var seldataSets,notseldataSets
      seldataSets=this.props.updatedata.unselectedAvailDSOption.sort((a,b) => parseInt(a.key)-parseInt(b.key))
      .map((item) => <option value={item.value} id={item.key}>{item.name}</option>)
      notseldataSets=this.props.updatedata.selectedAvailDSOption.sort((a,b) => parseInt(a.key)-parseInt(b.key))
      .map((item) =>  <option value={item.value} id={item.key}>{item.name}</option>)
    
     this.props.availDataSetOption(seldataSets,notseldataSets)
     this.setState({isloadedAvailDSRemove:false,yes:this.props.updatedata.selectedAvailDSOption,no:this.props.updatedata.unselectedAvailDSOption})
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
    filterFunction(param,e) {
      var  filter, option,i;
      filter = e.target.value.toUpperCase();
      option = document.getElementById(param).options;
      for (i = 0; i < option.length; i++) {
          if (option[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            option[i].style.display = "";
          } else {
            option[i].style.display = "none";
          }
      }
  }

  render() {
    if(this.props.Period!=null && this.state.isdatasetloaded==false)
     this.dataSetsOption(this.props.Period)
    if(this.state.isloadedAvailDSAdd==true)
      this.addAvailDSOptions()
    if(this.state.isloadedAvailDSRemove==true)
      this.removeavailDSOptions()
     
                    
    return (
      <div>
      <Panel className="leftPanel" >
        <Panel.Heading >Available DataSets</Panel.Heading>
        {(this.props.Period!=null)?<input type="text" placeholder="Search.." id="input-box" onKeyUp={this.filterFunction.bind(this,'availDSDropdown')}></input>:false}
        <Button bsStyle="primary" className='button'   onClick={this.handleClick.bind(this,'ADD')}>ADD</Button>
        <select multiple={true} className='form-control' id="availDSDropdown" onChange={(event)=>this.handleChange(event)}>
          {this.props.updatedata.availdataSetsOption}
        </select>
      </Panel>

      <Panel className="rightPanel">
        <Panel.Heading >Selected DataSets</Panel.Heading>
        {(this.props.Period!=null)?<input type="text" placeholder="Search.." id="input-box" onKeyUp={this.filterFunction.bind(this,'selDSDropdown')}></input>:false}
        <Button bsStyle="primary" className='button' onClick={this.handleClick.bind(this,'REMOVE')}>REMOVE</Button>
              <select multiple className='form-control' id="selDSDropdown" onChange={(event)=>this.handleChange(event)}>
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


 



// WEBPACK FOOTER //
// ./src/components/AvailableDataSets/index.js