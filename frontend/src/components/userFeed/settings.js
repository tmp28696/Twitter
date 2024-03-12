import React, { Component } from 'react';
////import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import Navbar from '../navbar'

class settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authFlag: ""
        }
        this.deleteClick = this.deleteClick.bind(this)
    }


    deleteClick = () => {
        console.log("in delete click")
        axios.defaults.withCredentials = true;
        axios.delete('/users/')
            .then((response) => {
                console.log("in axios", response)
                if (response.status == 200) {
                    this.setState({
                        authFlag: "true"
                    })
                }
                else {
                    this.setState({
                        authFlag: "false"
                    })
                }
                console.log("account deleted")
            });
    }



    render() {

        let redirectVar = null;
        if (localStorage.getItem('email') == null) {
            console.log("in cookie if")
            redirectVar = <Redirect to="/login" />
        }

        if (this.state.authFlag == "true") {
            redirectVar = <Redirect to="/login" />
        }

        return (
            <div class="container-flex">
                {redirectVar}
                <Navbar />

                <div className="col-md-6 feed">
                    <div style={{ borderBottom: "0.5px solid lightgrey", marginBottom: "5px" }}>
                        <div className="home-font">Deactivate Account</div>
                    </div>
                    <div className="u-flex u-flex-align" style={{ marginTop: "20px" }}>
                        <div className="u-mar2"><img src="https://library.kissclipart.com/20180904/ese/kissclipart-user-icon-png-clipart-computer-icons-user-66fe7db07b02eb73.jpg" className="logo5" style={{ height: "40px", width: "40px" }}></img></div>
                        <div className="u-flex-justify">
                            <div className="u-mar1">
                                <div className="s-list-item-primary u-mar1 fullname">UserName</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ borderBottom: "0.5px solid lightgrey", marginBottom: "5px" }}>
                        <div className="home-font">This will deactivate your account</div>
                    </div>
                    <div className="s-list-item-secondary snippet" style={{ marginLeft: "7px", marginBottom: "15px" }}><span className="span">
                        You’re about to start the process of deactivating your Twitter account. Your display name, @username,
                            and public profile will no longer be viewable on Twitter.com, Twitter for iOS, or Twitter for Android.</span></div>
                    <span class="home-buttons" style={{ marginLeft: "8%" }}><button class="buttons3" name="delete" onClick={this.deleteClick}>Deactivate</button></span>

                </div>
                <div className="col-md-3 feed">
                    <div>
                        <div>
                            <input type="text" className="searchbar" placeholder="Search Twitter" name="search" id="search"></input>
                        </div>
                    </div>
                </div>

            </div>



        )
    }

}


export default settings;





