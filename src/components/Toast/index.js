import React,{ Component } from "react";
import './style.css';
import toastReducer from '../../reducers/toastReducer';

export default class Toast extends Component{
    state={
        message:null
    }
    show(){
        let toast = document.querySelector(".toast");
        toast.classList.add('show');
        setTimeout(()=>{
            toast.classList.remove('show'); 
        },2000);
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
        <div className="toast">{this.state.message}</div>
        );
    }
}