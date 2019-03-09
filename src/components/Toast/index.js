import React,{ Component } from "react";
import './style.css';
import toastReducer from '../../reducers/toastReducer';
import {FiInfo} from 'react-icons/fi'

export default class Toast extends Component{
    state={
        message:null
    }
    show(){
        let toast = document.querySelector(".toastContainer");
        toast.classList.add('show');
        setTimeout(()=>{
            toast.classList.remove('show'); 
        },5000);
    }
    componentDidMount(){
        toastReducer.subscribe(()=>{

            this.setState({...toastReducer.getState()},()=>{
                this.show();
            });
        })
    }
    render(){
        return(
            <div className="toastContainer">
                <div className="toast"><FiInfo /> {this.state.message}</div>
            </div>
        );
    }
}