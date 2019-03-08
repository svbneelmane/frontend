import React,{ Component } from "react";
import Layout from '../../layouts/app';
import "./style.css";
import Select from 'react-select';


export default class Adduser extends Component{
     options = [
        { value: 'kmc-mangalore', label: 'Kasturba Medical College, Mangalore' },
        { value: 'mit-manipal', label: 'Manipal Institute of Technology, Mangalore' },
        { value: 'mcods-manipal', label: 'Manipal College of Dental Sciences' }
      ];
      state = {
        selectedOption: null,
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
                        <input name="college" list="colleges" autoComplete="off" id="name"/>
                        <datalist id="colleges">
                            <option>MIT</option>
                            <option>KMC</option>
                            <option>MCODS</option>
                        </datalist>
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
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.options}
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