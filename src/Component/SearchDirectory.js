import React from 'react';

import {BrowserRouter as Router, Link} from 'react-router-dom';

class SearchDirectory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            empolyees: [],
            foundEmployees: [],
            showEmployees : false,
        };
    }
    
    async fetchData(){
        try{
            //const url = "http://www.mocky.io/v2/5d4c4a803100005400a95348";
            const url = "http://www.mocky.io/v2/5d4d6ac8330000d43f33780f";
            const response = await fetch(url);
            const responseBody = await response.json();
            this.setState({empolyees: responseBody.employees});
            console.log(this.state.empolyees);
        }
        catch(error){
            console.error('Error:', error);
        }
    }

    componentDidMount(){
        this.fetchData();
        
    }
    
    async searchEmployees(keyword) {
        //console.log(this.state.empolyees);
        const employees = this.state.empolyees;
        keyword = RegExp.escape(keyword.toLowerCase());
        const pattern = `[A-Za-z.\s]*${keyword}[A-Za-z.\s]*`;
        const matchRegex = new RegExp(pattern);
        const foundEmployees = employees.filter((employee) => {
        //console.log("Match: ", matchRegex, pattern, employee.firstName);
        //console.log(matchRegex.test(employee.firstName.toLowerCase()) || matchRegex.test(employee.lastName.toLowerCase()));
        return matchRegex.test(employee.firstName.toLowerCase())|| matchRegex.test(employee.lastName.toLowerCase());
        });
        //console.log("Found Employees: ", foundEmployees);
        this.setState({ foundEmployees: foundEmployees });
      }

    onTextChange(e){
      const text = e.target.value;
      this.searchEmployees(text);
    }

    render(){
        const foundEmployees = this.state.foundEmployees;
        return(
            <div>
                <h4 className="employDirectory">Employee Directory</h4>
                <div className = "searchBox">
                   <input className="search" onChange = {(e) => this.onTextChange(e)} type = 'text' />
                </div>
                
                <ul>
                    {foundEmployees && foundEmployees.map(employee => (
                      
                      <Link to = {`/employee/${employee.id}`}>
                      <li key={employee.id} >
                         
                          <div className="image"><img src={employee.pic} /></div>
                          <div className="employeeInformation">
                              <div className="employeeName">{employee.firstName} {employee.lastName}</div>
                              <div>{employee.title}</div>
                          </div> 
                         
                      </li>
                      </Link>
                      
                    ))}
                </ul>
            </div>
        );
    }
}

export default SearchDirectory;