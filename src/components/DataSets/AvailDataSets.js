import React from 'react';
import { Panel } from 'react-bootstrap'
import { connect } from 'react-redux';
import { getDataSets, availDataSetOption, clearData } from '../actions/dataReducerAction';
import './style.css'

class AvailDataSets extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: null,
      option: [],
      dataSets: [],
      event: null
    }
  }


  componentDidMount() {
    let url = '../../dataSets.json?fields=id,name,uid,periodType&paging=False'
    this.props.getDataSets(url);
  }


  componentWillReceiveProps(props) {
    if (props.PeriodType != null)
      this.showDataSets(props.PeriodType);
    if (props.AvailDataSets != null)
      this.state.option.push(props.AvailDataSets[0])
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


  showDataSets(value) {
    const { getDataSets } = getState();
    var dataSets = []
    this.props.updatedata.dataSets.map((item) => {
      if (item.periodType == value)
        dataSets.push({ name: item.name, id: item.id })
    })
    this.props.availDataSetOption(dataSets)
  }

  render() {
    var optionItems = this.props.updatedata.dataSetsOption.map((arr) =>
      <option value={arr.id}>{arr.name}</option>)
    // var optionItems=(this.props.updatedata.dataSetsOption==undefined)?
    // []:(this.props.updatedata.dataSetsOption.map((arr)=><option value={arr.id}>{arr.name}</option>))

    return (
      <Panel>
        <Panel.Heading >Available DataSets</Panel.Heading>
        <select multiple className='form-control' onDoubleClick={this.getContent.bind(this)}>
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
    getDataSets: (url) => {
      dispatch(getDataSets(url))
    },
    availDataSetOption:(dataSet)=>{
      dispatch(availDataSetOption(dataSet))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AvailDataSets)



