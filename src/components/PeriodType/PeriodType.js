import React from 'react';
import {DropdownButton,MenuItem,ButtonToolbar}  from 'react-bootstrap';
import {connect} from 'react-redux';
import {setPeriodType}  from '../actions/dataReducerAction';


class PeriodType extends React.Component{
constructor(props){
  super(props)
  this.state={
    error:null,
    isLoaded:false,
    period:[],
    button:'Period Type'
  }
}

componentDidMount(){
  fetch('../../../api/periodTypes.json')
  .then(res=>res.json())
  .then((result)=>{
    

    this.props.setPeriodType(result)
    result.periodTypes.map((item)=>{
      this.state.period.push(item.name)
    })
    this.setState({isLoaded:true})
  })

}
render() {
  
  if(this.state.isLoaded==true){
    var  listItems = this.state.period.map((val) =>
    <MenuItem eventKey={val}>{val}</MenuItem>
    );
  }
  
  return (
      <ButtonToolbar >
        <DropdownButton onSelect={(value)=>this.props.setPeriodType(value)}
          title={this.state.button}>
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
  }}
}
export default connect(mapStateToProps,mapDispatchToProps)(PeriodType)

