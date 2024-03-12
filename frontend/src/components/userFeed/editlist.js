import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import "react-datepicker/dist/react-datepicker.css";

class editlist extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }

    componentDidMount() {
        console.log("inside edit profile get request")
        axios.defaults.withCredentials = true;
        axios.get("/users/profile")
            .then((response) => {
                console.log("data: ", response.data)
                this.setState({

                });
                if (response.data.profileImage) {
                    this.setState({
                        profileimage: response.data.profileImage
                    })
                }
            }).catch(error => {
                this.setState({
                })
            });
    }


    submitChanges(e) {
        e.preventDefault()
        axios.defaults.withCredentials = true;
        axios.put('/lists/')
            .then((response) => {
                console.log("in axios call")
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            });
    }


    render() {
        let redirectVar = null;
        if (localStorage.getItem('email') == null) {
            console.log("in cookie if")
            redirectVar = <Redirect to="/login" />
        }
        return (
            <div class="signup2">
                {redirectVar}
                <br />
                <form class="outer-box1 signup1" onSubmit={this.submitChanges} >
                    <div>
                        <br />
                        <div class="col-md-6 feed">
                            <div class="home-font">
                                <div class="msg-block">List info </div>
                                <span class="uppernav">
                                    <button class="button" style={{ width: "150px" }}>Save </button>
                                </span>
                            </div>


                        </div>

                        <div class="">
                            <br />
                            <div class="elements">
                                <span class="label">Name</span>
                                <input class="form-control1 elements1" placeholder={this.state.listName} pattern="[A-Z]*||[a-z]*" type="text" name="fname" onChange={this.fnameChangeHandler} required />
                            </div>
                        </div>
                        <div class="">
                            <br />
                            <div class="elements">
                                <span class="label">Description</span>
                                <input class="form-control1 elements1" placeholder={this.state.listDesc} pattern="[A-Z]*||[a-z]*" type="text" name="lname" onChange={this.lnameChangeHandler} required />
                            </div>
                        </div>
                        <div class="">
                            <br />
                            <div class="elements" style={{ display: "flex" }}>
                                <div class="inner-element">
                                    <span class="label">City</span>
                                    <input class="form-control1 elements1" placeholder={this.state.city} pattern="[A-Z]*||[a-z]*" type="text" name="city" onChange={this.cityChangeHandler} />
                                </div>
                                <div class="inner-element">
                                    <span class="label">State</span>
                                    <input class="form-control1 elements1" placeholder={this.state.state} pattern="[A-Z]*||[a-z]*" type="text" name="state" onChange={this.stateChangeHandler} />
                                </div>
                                <div class="inner-element">
                                    <span class="label">Zipcode</span>
                                    <input class="form-control1 elements1" placeholder={this.state.zipcode} pattern="[0-9]*" type="text" name="zipcode" onChange={this.zipChangeHandler} />
                                </div>
                            </div>
                        </div>
                        <div class="">
                            <br />
                            <button class="button" style={{ width: "150px" }}>Save </button>
                            <br /><br />
                        </div>
                        <div class="">
                            <br />
                            <button class="button" style={{ width: "150px" }}>Delete</button>
                            <br /><br />
                        </div>



                    </div>
                </form>
                <br /><br />
            </div>



        )
    }

}

export default editlist;
