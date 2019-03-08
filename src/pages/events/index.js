import React,{ Component } from "react";
import Layout from '../../layouts/app';
import "./style.css";
import dance from '../../images/dance.png'
import singing from '../../images/singing.png'

const EventCard=()=>{

}

export default class Adduser extends Component{
     
    render(){
        return(
            <Layout>
                <h3>Events</h3>
                <div className="events">
                    <div className="event">
                        <img src={dance} />
                        <div className="header">
                            <div className="name">Western Solo Dancing</div>
                            <div className="venue"><label>Venue:</label> Manipal Institute of Technolody</div>
                            <div className="time"><label>Date:</label> 2<sup>nd</sup> April</div>
                        </div>
                    </div>
                    <div className="event">
                        <img src={singing} />
                        <div className="header">
                            <div className="name">Solo Singing</div>
                            <div className="venue"><label>Venue:</label> Manipal College of Dental Sciences</div>
                            <div className="time">2<sup>nd</sup> April</div>
                        </div>
                    </div>
                    
                    
                    
                </div>
            </Layout>
        );
    }
}