import React,{ Component } from "react";
import Layout from '../../layouts/app';
import "./style.css";
import Select from 'react-select';


export default class Adduser extends Component{
     colleges = [
        { value: 'kmc-mangalore', label: 'Kasturba Medical College, Mangalore' },
        { value: 'mit-manipal', label: 'Manipal Institute of Technology, Mangalore' },
        { value: 'mcods-manipal', label: 'Manipal College of Dental Sciences' }
      ];
      types = [
          {value: "admin",label:'Admin'},
          {value: "faculty",label:'Faculty Coordinators'},
          {value: "support",label:'Support Team'},
      ]
      state = {
        college:null,
        type:null
      }
      handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
      }
    render(){
        return(
            <Layout>
                <h3>Add User</h3>
                <form class="form" >
                    <div>
                        <label for="name">Name:</label>
                        <input name="name" autoComplete="off" id="name"/>
                    </div>
                    <div>
                        <label for="college">College:</label>
                        <Select
                            value={this.state.college}
                            onChange={this.handleChange}
                            options={this.colleges}
                            className="select"
                            isSearchable={true}
                            name="college"
                        />
                    </div>
                    <div>
                        <label for="email">Email Id:</label>
                        <input name="email" autoComplete="off" id="email"/>
                       
                    </div>
                    <div>
                        <label for="email">Mobile:</label>
                        <input name="phone" autoComplete="off" id="mobile"/>
                       
                    </div>

                    <div>
                        <label for="type">Type:</label>
                         <Select
                            value={this.state.type}
                            onChange={this.handleChange}
                            options={this.types}
                            className="select"
                            isSearchable={true}
                            name="college"
                        />
                       
                    </div>
                    <div style={{textAlign:"center"}}>
                        <button>Create</button>
                    </div>
                </form>
            </Layout>
        );
    }
}