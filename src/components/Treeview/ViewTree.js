import React,{Component} from 'react';
import {Panel}  from 'react-bootstrap'
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css' 
import "./ViewTree.css";

class ViewTree extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
        error: null,
        error1: null,
        isLoaded: false,
        orgUnits: [],
        orgUnitName: '',
        orgUnitID: '',
        levels: undefined
    }
   
}
    onChange = (currentNode, selectedNodes) => {
        console.log('onChange::', currentNode, selectedNodes)
  }
   onAction = ({ action, node }) => {
    console.log(`onAction:: [${action}]`, node)
  }
   onNodeToggle = currentNode => {
    console.log('onNodeToggle::', currentNode)
  }

componentDidMount() {
    let url = '../../../api/organisationUnits.json?paging=false&level=2&fields=id,name';
    fetch("../../../api/organisationUnitLevels.json",{
        credentials: 'include'
    })
    .then (response => response.json())
    .then (
        (result) => {
            let levels = result.pager.total;
            this.setState({
                levels: levels
            })
            for (let i = 1; i < levels-1; i++) {
                url += ',children[id,name';
            }
            url += ']';
            fetch(url,{
                credentials:'include'
            })
            .then(response => response.json())
            .then(
                (result1) => {
                    let data,str,json;
                    result1.organisationUnits[0].toggled = true;
                    data=result1.organisationUnits[0]
                    str = JSON.stringify(data);
                    str = str.replace(/\"id\":/g, "\"value\":");
                    str = str.replace(/\"name\":/g, "\"label\":");
                    json = JSON.parse(str);
                    this.setState({
                    isLoaded: true,
                    orgUnits: json,
                    });
                },
                (error1) => {
                    this.setState({
                        isLoaded: true,
                        error1
                    });
                }    
            )
        },
        (error) => {
            this.setState({
                error
            });
        }
    )
}



  render() {
    const { error, error1, isLoaded, orgUnits, orgUnitName, orgUnitID, levels} = this.state;
    
    return(
        (error || error1) ? <div>{error.message}</div> :
                (!isLoaded) ? <div>Loading...</div> :
        <Panel >
                <Panel.Heading >Organisation Units Select</Panel.Heading>
                <div className="orgUnitSelect">
                <DropdownTreeSelect data={orgUnits} arrow={false} placeholderText="Search" showDropdown={true} onChange={this.onChange} onAction={this.onAction} onNodeToggle={this.onNodeToggle} />
                </div>
                           </Panel>
    )


  }
}


export default ViewTree;
