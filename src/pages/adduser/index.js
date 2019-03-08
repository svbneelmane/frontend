import React,{ Component } from "react";
import Layout from '../../layouts/app';
import "./style.css";

export default class Adduser extends Component{
    render(){
        return(
            <Layout>
                <h3>Add User</h3>
                <form class="form">
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
                    
                </form>
            </Layout>
        );
    }
}