import React from 'react';
import {DropdownButton,MenuItem,ButtonToolbar}  from 'react-bootstrap';
import {connect} from 'react-redux';
import {setPeriodType,getPeriods}  from '../actions/dataReducerAction';


class PeriodType extends React.Component{


componentDidMount(){
  this.props.getPeriods()
}


render() {
  
  if(this.props.updatedata.isLoadedPeriod==true){
    var  listItems = this.props.updatedata.periodType.map((val) =>
    <MenuItem eventKey={val.name}>{val.name}</MenuItem>
    );
  }
  
  return (
      <ButtonToolbar >
        <DropdownButton onSelect={(value)=>this.props.setPeriodType(value)}
          title={this.props.updatedata.periodtitle}>
           {listItems}
        </DropdownButton>
     </ButtonToolbar>
   );
}}

const mapStateToProps=(state)=>{
  return {
      updatedata:state.updatedata,
     }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    setPeriodType:(period)=>{
          dispatch(setPeriodType(period))
  },
  getPeriods:()=>{
    dispatch(getPeriods())
  }
}
}
export default connect(mapStateToProps,mapDispatchToProps)(PeriodType)

