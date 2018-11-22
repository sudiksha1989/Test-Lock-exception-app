import React from 'react';
import {Panel,Button,DropdownButton,ButtonToolbar}  from 'react-bootstrap'
import './style.css'
import { connect } from 'react-redux';
import { availPeriodOption,selectAvailPeriod ,setAvailPeriodVal} from '../actions/dataReducerAction';
import {SelectedDropdown} from './SelectedDropdown'

class AvailablePeriods extends React.Component{

  constructor(props){
    super(props);
    this.state={
      isloadedAvailPeriodAdd:false,
      isloadedAvailPeriodRemove:false,
      isPeriodloaded:false,
      availPeriodVal:null,
      selectedOption:[],
      unselectedOption:[],
      month:['January','February','March','April','May','June','July','August','September','October','November','December']
     }
  }
  componentWillReceiveProps(props) {
    if(props.updatedata.availPeriodVal!==this.state.availPeriodVal)
    this.setState({availPeriodVal:props.updatedata.availPeriodVal,isPeriodloaded:false})

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
  
  periodsOption=(event)=>{
    this.setState({isPeriodloaded:true})
    let date= new Date(),
      currentYear=date.getFullYear(),
      optionValue=[],
      index=0,
      year=event.availPeriodVal,
      month=((currentYear==year)?date.getMonth():11);

      while(index!=month+1){
        optionValue.push({value:year.toString()+index.toString(),month:this.state.month[index]+" "+year})
        index++;
      }
      var periods=(optionValue.map((item) =>(<option value={item.value}>{item.month}</option>)))
      
      this.props.availPeriodOption(periods,[])

}
  
  addAvailPeriodOptions=()=>{
    var unseldataSets,seldataSets=[]
    unseldataSets=this.props.updatedata.notselAvailPeriodOption.map((item) => 
              <option value={item.id}>{item.name}</option>)
    seldataSets=this.props.updatedata.selectedAvailPeriodOption.map((item) => 
        <option value={item.id}>{item.name}</option>)
    this.props.availPeriodOption(unseldataSets,seldataSets)
    this.setState({isloadedAvailPeriodAdd:false})
    }
    
    removeAvailPeriodOptions=()=>{
    var seldataSets,notseldataSets
    seldataSets=(this.props.updatedata.notselAvailPeriodOption.map((item) => 
            <option value={item.id}>{item.name}</option>))
    notseldataSets=(this.props.updatedata.selectedAvailPeriodOption.map((item) => 
            <option value={item.id}>{item.name}</option>))

     this.props.availPeriodOption(seldataSets,notseldataSets)
     this.setState({isloadedAvailPeriodRemove:false})
    }
    
    handleClick(param) {
      if(param=='ADD'){
        this.setState({isloadedAvailPeriodAdd:true})
        this.props.selectAvailPeriod(this.state.selectedOption,this.state.unselectedOption,false);
      }
      
      if(param=='REMOVE'){
        this.setState({isloadedAvailPeriodRemove:true})
        this.props.selectAvailPeriod(this.state.selectedOption,this.state.unselectedOption,true);
      }
      
    }

        
        render(){
          if(this.props.updatedata.availPeriodVal!=null && this.state.isPeriodloaded==false)
          this.periodsOption(this.props.updatedata.availPeriodVal)
          if(this.state.isloadedAvailPeriodAdd==true)
            this.addAvailPeriodOptions()
          if(this.state.isloadedAvailPeriodRemove==true)
            this.removeAvailPeriodOptions()
          
      return(
        <div>
            <Panel className="leftPanel">
                <Panel.Heading >Available Periods</Panel.Heading>
                    {(this.props.Period=='Monthly')?
                    <ButtonToolbar className="dropdown">
                        <DropdownButton  onSelect={(value)=>this.props.setAvailPeriodVal(value)}
                            title={'Select Periods'}>
                            {SelectedDropdown(this.props)}
                        </DropdownButton>
                    </ButtonToolbar>  :false}
                    <Button bsStyle="primary" className='button' onClick={this.handleClick.bind(this,'ADD')}>ADD</Button>
                    <select multiple className='form-control' onChange={(event)=>this.handleChange(event,'ADD')}>
                        {this.props.updatedata.availPeriodOption}
                    </select>
              </Panel>
              <Panel className="rightPanel">
              <Panel.Heading >Selected Periods</Panel.Heading>
              <Button bsStyle="primary" className='button' onClick={this.handleClick.bind(this,'REMOVE')}>REMOVE</Button>
                    <select multiple className='form-control' onChange={(event)=>this.handleChange(event,'REMOVE')}>
                      {this.props.updatedata.selAvailPeriodOption}
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
          availPeriodOption:(selPeriods,unselPeriods)=>{
          dispatch(availPeriodOption(selPeriods,unselPeriods))
          },
          setAvailPeriodVal:(availPeriodVal)=>{
          dispatch(setAvailPeriodVal(availPeriodVal))
          },
          selectAvailPeriod:(selectedOption,unselectedOption,isperiodloaded)=>{
          dispatch(selectAvailPeriod(selectedOption,unselectedOption,isperiodloaded))
      }
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(AvailablePeriods)