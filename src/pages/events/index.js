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
                <div class="events">
                    <div class="event">
                        <img src={dance} />
                        <div class="header">
                            <div class="name">Western Solo Dancing</div>
                            <div class="venue"><label>Venue:</label> Manipal Institute of Technolody</div>
                            <div class="time"><label>Date:</label> 2<sup>nd</sup> April</div>
                        </div>
                    </div>
                    <div class="event">
                        <img src={singing} />
                        <div class="header">
                            <div class="name">Solo Singing</div>
                            <div class="venue"><label>Venue:</label> Manipal College of Dental Sciences</div>
                            <div class="time">2<sup>nd</sup> April</div>
                        </div>
                    </div>
                    
                    
                    
                </div>
            </Layout>
        );
    }
}