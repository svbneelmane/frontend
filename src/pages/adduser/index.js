import React,{ Component } from "react";
import Layout from '../../layouts/app';
import "./style.css";

export default class Adduser extends Component{
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
                        <input name="name" list="colleges" autoComplete="off" id="name"/>
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
                        <select>
                            <option>Admin</option>
                            <option>Faculty Coordinator</option>
                            <option>Support Team</option>
                        </select>
                       
                    </div>
                    <div>
                        <button>Create</button>
                    </div>
                </form>
            </Layout>
        );
    }
}