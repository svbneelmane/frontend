import React,{ Component } from "react";
import Layout from '../../layouts/app';
import "./style.css";
import userReducer from '../../reducers/userReducer';


export default class Profile extends Component{
    async componentDidMount(){
        this.setState({...await userReducer.getState()},()=>{
            console.log(this.state);
        });
    }
    render(){
        return(
            <Layout>
                <h3>{this.state&&this.state.name}</h3>
                <div>{this.state&&this.state.email}</div>
               
            </Layout>
        );
    }
}