import React, { Component } from 'react';

import axios from 'axios';
import { Redirect } from 'react-router';
import Navbar from '../navbar'

class subscribers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            followers: [],
            userID: ""
        }
    }

    componentDidMount() {
        const data = {
            params: {
                userID: this.props.location.state.userID
            }
        }
        console.log(data.params.userID)
        axios.defaults.withCredentials = true;
        axios.get("/lists/subscribers", data)
            .then((response) => {
                this.setState({
                    followers: response.data

                });
                console.log(response.data)
            }).catch(error => {
                this.setState({
                    message: "something went wrong"
                })
            });
    }



    render() {
        let redirectVar = null;
        if (localStorage.getItem('email') == null) {
            console.log("in cookie if")
            redirectVar = <Redirect to="/login" />
        }

        let Contents;
        Contents = this.state.followers.map(people => {

            return (
                <div class="u-clickable followers-box" role="button">
                    <div class="u-flex u-flex-align">
                        <div class="u-mar2" style={{ paddingLeft: "15px" }}><img class="logo5"></img></div>
                        <div class="u-flex-justify">
                            <div class="u-mar1" style={{ width: "450px" }}>
                                <div class="s-list-item-primary u-mar1 fullname">{people.firstName} {people.lastName} </div>
                                <div class="s-list-item-secondary u-mar1 snippet">
                                    <span class="span">{people.userName}</span>
                                </div>
                            </div>
                        </div>
                        <div class="edit">
                            <button class="buttons3" style={{ marginTop: "10px" }}>Follow</button>
                        </div>
                    </div>

                </div>
            )
        })
        return (
            <div class="container-flex">
                {redirectVar}
                <Navbar />

                <div class="col-md-6 feed1 u-list1">
                    <div style={{ borderBottom: "0.5px solid lightgrey", marginBottom: "5px" }}>
                        <div class="home-font">Subscribers</div>
                        <div class="s-list-item-secondary snippet" style={{ marginLeft: "7px", marginBottom: "15px" }}><span class="span"></span></div>
                    </div>

                    <div class="home-font1">
                    </div>
                    <div class="home-font2">
                        <div class="divs" style={{ color: "#29a3ef", width: "50%", paddingLeft: "60px", paddingTop: "5px" }}>
                        </div>
                        <div class="divs" style={{ width: "50%", paddingLeft: "50px", paddingTop: "5px" }}>
                        </div>
                    </div>
                    <div>
                        {Contents}
                    </div>
                </div>
                <div class="col-md-3 feed1">
                    <div>
                        <div>
                            <input type="text" class="searchbar" placeholder="Search Twitter" name="search" id="search"></input>
                        </div>
                    </div>
                </div>



            </div>

        )
    }

}


export default subscribers;





