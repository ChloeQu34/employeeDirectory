import React from 'react';


class Employee extends React.Component{


    render(){
        const id = this.props.match.id;
        return(
            <div>
                <h2>Employee</h2>
                {id}
            </div>
        );
    }
}

export default Employee;