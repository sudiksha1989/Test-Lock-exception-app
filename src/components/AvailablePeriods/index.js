import React from 'react';
import { Panel, Button, DropdownButton, ButtonToolbar } from 'react-bootstrap'
import { connect } from 'react-redux';
import { availPeriodOption, selectAvailPeriod, setAvailPeriodVal } from '../actions/dataReducerAction';

class AvailablePeriods extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isloadedAvailPeriodAdd: false,
      isloadedAvailPeriodRemove: false,
      isPeriodloaded: false,
      availPeriodVal: null,
      selectedOption: [],
      unselectedOption: [],
      periodTypeVal: null,
      month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  }
  componentWillReceiveProps(props) {
    if (props.Period !== this.state.periodTypeVal)
      this.setState({ periodTypeVal: props.Period, isPeriodloaded: false })
  }
  handleChange(e) {
    var options = e.target.options;
    var selectedOption = [], unselectedOption = [];
    for (var i = 0, l = options.length; i < l; i++) {
      (options[i].selected) ? selectedOption.push({ id: options[i].value, name: options[i].label, key: options[i].id }) : unselectedOption.push({ id: options[i].value, name: options[i].label, key: options[i].id })
    }
    this.setState({ selectedOption: selectedOption, unselectedOption: unselectedOption });

  }

  periodsOption = () => {
    this.setState({ isPeriodloaded: true })
    var month
    let date = new Date(),
      currentYear = date.getFullYear(),
      optionValue = [],
      index = 0;

    while (currentYear > 2000) {
      month = ((currentYear < 2000) ? date.getMonth() : 11);
      while (index != month + 1) {
        optionValue.push({ value: currentYear.toString() + index.toString(), month: this.state.month[index] + " " + currentYear })
        index++;
      }
      index = 0
      currentYear--;
    }

    var periods = (optionValue.map((item, index) => (<option value={item.value} id={index}>{item.month}</option>)))

    this.props.availPeriodOption(periods, [])

  }

  addAvailPeriodOptions = () => {
    var notselPeriods, selperiods = []
    selperiods = this.props.updatedata.selectedAvailPeriodOption.sort((a, b) => parseInt(a.key) - parseInt(b.key))
      .map((item) => <option value={item.id} id={item.key}>{item.name}</option>)
    notselPeriods = this.props.updatedata.notselAvailPeriodOption.sort((a, b) => parseInt(a.key) - parseInt(b.key))
      .map((item) => <option value={item.id} id={item.key}>{item.name}</option>)

    this.props.availPeriodOption(notselPeriods, selperiods)
    this.setState({ isloadedAvailPeriodAdd: false })
  }

  removeAvailPeriodOptions = () => {
    var selperiods, notselPeriods
    selperiods = this.props.updatedata.notselAvailPeriodOption.sort((a, b) => parseInt(a.key) - parseInt(b.key)).map((item) =>
      <option value={item.id} id={item.key}>{item.name}</option>)
    notselPeriods = this.props.updatedata.selectedAvailPeriodOption.sort((a, b) => parseInt(a.key) - parseInt(b.key))
      .map((item) => <option value={item.id} id={item.key}>{item.name}</option>)


    this.props.availPeriodOption(selperiods, notselPeriods)
    this.setState({ isloadedAvailPeriodRemove: false })
  }

  handleClick(param) {
    if (param == 'ADD') {
      this.setState({ isloadedAvailPeriodAdd: true })
      this.props.selectAvailPeriod(this.state.selectedOption, this.state.unselectedOption, false);
    }

    if (param == 'REMOVE') {
      this.setState({ isloadedAvailPeriodRemove: true })
      this.props.selectAvailPeriod(this.state.unselectedOption, this.state.selectedOption, true);
    }

  }
  filterFunction(param, e) {
    var filter, option, i;
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
    if (this.props.Period != null && this.state.isPeriodloaded == false)
      this.periodsOption(this.props.updatedata.availPeriodVal)
    if (this.state.isloadedAvailPeriodAdd == true)
      this.addAvailPeriodOptions()
    if (this.state.isloadedAvailPeriodRemove == true)
      this.removeAvailPeriodOptions()
    // <div>
    // <Panel className="leftPanel">
    //     <Panel.Heading >Available Periods</Panel.Heading>
    //     {(this.props.Period!=null)?<input type="text" placeholder="Search.." id="input-box" onKeyUp={this.filterFunction.bind(this,'availPeriodDropdown')}></input>:false}
    //      <Button bsStyle="primary" className='button' onClick={this.handleClick.bind(this,'ADD')}>ADD</Button>
    //         <select multiple className='form-control' id='availPeriodDropdown' onChange={(event)=>this.handleChange(event,'ADD')}>
    //             {this.props.updatedata.availPeriodOption}
    //         </select>
    //   </Panel>
    //   <Panel className="rightPanel">
    //   <Panel.Heading >Selected Periods</Panel.Heading>
    //   {(this.props.Period!=null)?<input type="text" placeholder="Search.." id="input-box" onKeyUp={this.filterFunction.bind(this,'selPeriodDropdown')}></input>:false}
    //  <Button bsStyle="primary" className='button' onClick={this.handleClick.bind(this,'REMOVE')}>REMOVE</Button>
    //         <select multiple className='form-control' id='selPeriodDropdown' onChange={(event)=>this.handleChange(event,'REMOVE')}>
    //           {this.props.updatedata.selAvailPeriodOption}
    //         </select>
    //   </Panel>
    // </div>
    return (
      <div>
        <div class="panel panel-default">
          <div class="panel-heading">Available Periods</div>
          <div class="panel-body">Panel Content</div>
        </div>
        <div class="panel panel-default">
          <div class="panel-heading">Selected Periods</div>
          <div class="panel-body">Panel Content</div>
        </div>
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
    availPeriodOption: (selPeriods, unselPeriods) => {
      dispatch(availPeriodOption(selPeriods, unselPeriods))
    },
    setAvailPeriodVal: (availPeriodVal) => {
      dispatch(setAvailPeriodVal(availPeriodVal))
    },
    selectAvailPeriod: (selectedOption, unselectedOption, isperiodloaded) => {
      dispatch(selectAvailPeriod(selectedOption, unselectedOption, isperiodloaded))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AvailablePeriods)


// WEBPACK FOOTER //
// ./src/components/AvailablePeriods/index.js