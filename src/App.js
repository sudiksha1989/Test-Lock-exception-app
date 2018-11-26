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
            <div className="display">
            <div className='input-cart col s12 m10 push-m1 z-depth-2 grey lighten-5'>
             <table>
                 <thead><tr><th><PeriodType/></th></tr></thead>
                 <tbody>
                 <tr><th><AvailablePeriods   Period={this.props.updatedata.periodSelect}/></th></tr>
                    <tr><td>hello</td></tr>
                    <tr><td>hello</td></tr>
                </tbody>
             </table>
             </div>
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