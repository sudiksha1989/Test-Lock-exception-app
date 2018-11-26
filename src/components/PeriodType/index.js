import React from 'react';
import { connect } from 'react-redux';
import { setPeriodType, getPeriods } from '../actions/dataReducerAction';
import FontAwesome from 'react-fontawesome'



class PeriodType extends React.Component {
  componentDidMount() {
    this.props.getPeriods()
  }
  handleClick=(e)=>{
    this.props.setPeriodType(e.target.textContent)
  }


  render() {

    if (this.props.updatedata.isLoadedPeriod == true) {
      var listItems = this.props.updatedata.periodType.map((val) => <li><a >{val.name}</a></li>
      );
    }
    //   <ButtonToolbar >
    //   <DropdownButton onSelect={(value) => this.props.setPeriodType(value)}
    //     title={this.props.updatedata.periodtitle}>
    //     {listItems}
    //   </DropdownButton>
    // </ButtonToolbar>
    return (
      <nav>
        <ul>
          <li className="sub-menu-parent" tab-index="0">
            <a >Select PeriodType<div className="arrow-icon"><FontAwesome  name='caret-down' /></div></a>
            <ul className="sub-menu" onClick={event=>this.handleClick(event)}>
                {listItems}
            </ul>
          </li>
          </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    updatedata: state.updatedata,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPeriodType: (period) => {
      dispatch(setPeriodType(period))
    },
    getPeriods: () => {
      dispatch(getPeriods())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PeriodType)

