import React, { Component } from 'react';
import '../../App.css';
import { Link } from "react-router-dom";
import axios from 'axios';
//import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
//import jwt_decode from 'jwt-decode';
//import uuid from 'react-native-uuid';
import ModernDatepicker from 'react-modern-datepicker';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import Favicon from 'react-favicon';
import Navbar from '../navbar'

class messages extends Component {

    constructor(props) {
        super(props);
        this.state = {
          messages: []
        }
        this.deleteClick = this.deleteClick.bind(this)
    }

    componentDidMount(){
        
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/messages/')
                .then((response) => {
                this.setState({
                    messages : response.data
                });
                console.log(response.data)
                console.log(this.state.messages)
            });
    }

    goto = (userid) => {
        try {
            this.props.history.push({
                pathname: "/inbox",
                state: {
                    userID: userid,
                }
            })
            console.log(this.state.userID)
        } catch (e) { }
    }

    deleteClick = (userid) => {
        const data = {
            receiverID  : userid
        }  
         console.log(data.receiverID)
         console.log(sessionStorage.getItem("userID"))
         axios.defaults.withCredentials = true;
         axios.post('http://localhost:3001/messages/delete', data)
                 .then((response) => {
                    console.log(response)
             })
             .catch((error) => {
                 this.setState({
                     authFlag: "false"
                 })
             })
     }
 

    render() {

        let redirectVar = null;
        if (localStorage.getItem('email') == null) {
            console.log("in cookie if")
            redirectVar = <Redirect to="/login" />
        }

       let content;
        content =this.state.messages.map(message => {
            sessionStorage.setItem('msg_user',message.firstName)
            sessionStorage.setItem('msg_img',message.profileImage)
            var profileimg = message.profileImage;
            if(profileimg == null){
                profileimg = "https://library.kissclipart.com/20180904/ese/kissclipart-user-icon-png-clipart-computer-icons-user-66fe7db07b02eb73.jpg"
            }
            else{
                profileimg = message.profileImage;
            }
            return(
            // <Link class="a" to="/inbox">
             <div class="u-clickable u-list"  >
                                <div class="u-flex u-flex-align">
                                <div class="u-mar2"><img src={profileimg} class="logo5" style={{height:"40px", width:"40px"}}></img></div>
                                    <div class="u-flex-justify" >
                                    <div class="u-mar1">
                                    <div class="s-list-item-primary u-mar1 fullname"role="button" onClick ={() => {this.goto(message.userID)}}>{message.firstName} {message.lastName}</div>
                                        <div class="s-list-item-secondary u-mar1 snippet">
                                            <span class="span">{message.userName}</span>
                                        </div>
                                        </div>
                                        </div>
                                        <div class="edit"><button class="buttons3" name="delete"  style={{marginTop:"30px", width: "70px", height: "35px" }} onClick={() => this.deleteClick(message.userID)}>Delete</button></div> 
                                       </div>
                                    </div>
                            // </Link>
            )}
        )
        

        return (
            <div class="container-flex">
                {redirectVar}
                <Navbar/>

                <div class="col-md-6 feed">
                    <div class="home-font">
                        <div class="msg-block">Direct Messages </div>
                        <span class="home-buttons"><Link to="/newmessages"><button class="buttons3">New Message</button></Link></span>
                    </div>

                    {content}
        
                </div>

                

            </div>



        )
    }

}


export default messages;





