import React,{Component} from 'react';
import './App.css'
import {connect} from 'react-redux'
import PeriodType from './components/PeriodType';
import AvailablePeriods from './components/AvailablePeriods'
import AvailableDataSets from './components/AvailableDataSets'
import ViewTree from './components/Treeview/ViewTree'



class App extends Component{

     render(){
        return (
             <div className='LockException-display'>
             <table>
             <tr><th><PeriodType/></th></tr>
             <tr><th><AvailablePeriods   Period={this.props.updatedata.periodSelect}/></th></tr>
             <tr><th><AvailableDataSets  Period={this.props.updatedata.periodSelect}/></th></tr>
             <tr> <th><ViewTree/></th></tr>
             </table>
             </div>
             
         )
     }
   
}

const mapStateToProps=(state)=>{
    return {
        updatedata:state.updatedata,
       }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        setPeriodType:(period)=>{
            dispatch({
            type:"PERIOD-TYPE",
            payload:period
        })
    }}
}

export default connect(mapStateToProps,mapDispatchToProps)(App)

//export default App;


// WEBPACK FOOTER //
// ./src/App.js