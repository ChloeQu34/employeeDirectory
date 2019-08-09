import React from 'react';

import {BrowserRouter as Link} from 'react-router-dom';

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
            const url = "http://www.mocky.io/v2/5d4c4a803100005400a95348";
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
                <input onChange = {(e) => this.onTextChange(e)} type = 'text' />
              
                <ul>
                    {foundEmployees && foundEmployees.map(employee => (
        
                      //<Route path = `/employee/${employee.id}` render={(props) => <Employee {...props} employee = {employee} />}>
                      
                      <li key={employee.id} >
                          
                          <Link to = {`/employee/${employee.id}`}>
                          <div>images</div>
                          <div>
                              <div>{employee.firstName} {employee.lastName}</div>
                              <div>{employee.title}</div>
                          </div>
                          </Link>
                      </li>
                      
                    ))}
                </ul>
            </div>
        );
    }
}

export default SearchDirectory;