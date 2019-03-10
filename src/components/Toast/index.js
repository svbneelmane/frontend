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
        },3000);
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
            <div className="toastContainer" css={{
                position:"fixed",
                top:"-10%",
                width:"100%"
            }}>
                <div css={{
                    background: "#fff",
                    color:"#900",
                    maxWidth: 300,                    
                    zIndex: 1000,
                    fontSize: 12,
                    textAlign: "center",
                    padding: 10,
                    margin:"auto",
                    boxShadow: "0px 0px 100px #ddd"
                }}>
                    <FiInfo/> 
                    <span style={{marginLeft:2}}>
                        {this.state.message}
                    </span>
                </div>
            </div>
        );
    }
}