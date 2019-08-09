import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import logo from '../backArrowIcon.png'

class Employee extends React.Component{
  constructor(props){
      super(props);
      this.textInput = React.createRef();
      this.state = {
          employees: [],
          title: "",
      };
  }

  async fetchData(){
      try{
          const url = "http://www.mocky.io/v2/5d4d6ac8330000d43f33780f";
          const response = await fetch(url);
          const responseBody = await response.json();
          this.setState({employees: responseBody.employees});
          console.log(this.state.employees);
      }
      catch(error){
          console.error('Error:', error);
      }
  }

  componentDidMount(){
      this.fetchData();
  }
  
 
  render(){
      const paramId = this.props.match.params.id;
      const employee = this.state.employees ? this.state.employees.find(e=>{
        return e.id == paramId
      }) : null
      const employeeDetails = employee ?
            (<div>

              <div className = "employee">
              
                  <div className = "icon"><img src={employee.pic} /></div>
                  
                  <div className = "employeeDetails">
                    <div className = "font">{employee.firstName} {employee.lastName}</div>
                    <input className = "employeeInput" defaultValue = {employee.title} type="text" ref={this.textInput} />
                  </div>
              </div>
              <div className = "employeeDetails">
                <div className = "font"> Call Office</div>
                <input className = "employeeInput" defaultValue = {employee.officePhone} type="text" ref={this.textInput} />
              </div>
              <div className = "employeeDetails">
                  <div className = "font">Call Mobile</div>
                  <input className= "employeeInput" defaultValue = {employee.mobilePhone} type="text" ref={this.textInput} />
              </div>
              <div className = "employeeDetails">
                  <div className = "font">SMS</div>
                  <input className= "employeeInput" defaultValue = {employee.mobilePhone} type="text" ref={this.textInput} />
              </div>
              <div className = "employeeDetails">
                  <div className = "font">Email</div>
                  <input className= "employeeInput" defaultValue = {employee.email} type="text" ref={this.textInput} />
              </div>
            </div>) : null
      return(
          <div>
              <div className="employeeTitle">
                <Link to = "/"><button><img src={logo}  alt="back arrow button" /></button></Link>
                <h4>Employee</h4>
                <div></div>
              </div>
              
              {employeeDetails || ""}
          </div>
      );
  }
}

export default Employee;