import React from 'react';
import { Panel, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { getDataSets, availDataSetOption,selectAvailDS } from '../actions/dataReducerAction';
import './style.css'

class AvailDataSets extends React.Component {

  componentDidMount() {
    this.props.getDataSets();
  }

  handleChange(e){
    console.log(e.target.value)
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.props.selectAvailDS(value);
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

  dataSetsOption=(period)=>{
    var dataSets = []
    this.props.updatedata.dataSets.map((item) => {
      if (item.periodType == period)
        dataSets.push({ name: item.name, id: item.id })
    })

    var options= dataSets.map(arr=>(<option value={arr.id}>{arr.name}</option>))
    return options
    }
    handleClick(event) {
      console.log('Your favorite flavor is: ' + this.props.updatedata);
      console.log("heree")
    }


  render() {
   var optionItems=(this.props.updatedata.periodSelect==null)?[]:this.dataSetsOption(this.props.updatedata.periodSelect)
   
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
    selectAvailDS:(selAvailDS)=>{
      dispatch(selectAvailDS(selAvailDS))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AvailDataSets)



