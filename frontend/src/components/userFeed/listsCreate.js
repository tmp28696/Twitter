import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import "react-datepicker/dist/react-datepicker.css";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ListsCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listName: "",
            listDesc: "",
            isPrivate: 0,
        }

        this.listNameChangeHandler = this.listNameChangeHandler.bind(this);
        this.listDescChangeHandler = this.listDescChangeHandler.bind(this);
        this.submitAdd = this.submitAdd.bind(this);

    }

    listNameChangeHandler = (e) => {
        this.setState({
            listName: e.target.value
        })
    }

    listDescChangeHandler = (e) => {
        this.setState({
            listDesc: e.target.value
        })
    }

    submitAdd = (e) => {
        e.preventDefault();
        const data = {
            listName: this.state.listName,
            listDesc: this.state.listDesc,
            isPrivate: this.state.isPrivate
        }
        console.log(data);
        axios.defaults.withCredentials = true;
        console.log("data" + data)
        axios.post('/lists/create', data)
            .then((response) => {
                console.log(response.status);
                if (response.status === 200) {
                    this.props.history.push({
                        pathname: "/lists",
                    })
                    this.setState({
                        authFlag: true
                    })

                }
                else {
                    this.setState({ msg: response.body.message });
                }
            })
            .catch((err) => {
                this.setState({
                    authFlag: false,
                    msg: err.response.data.message,
                })
                console.log("Error messagw", err.response.status);
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
                <form class="outer-box1 signup1" onSubmit={this.submitAdd}>
                    <br />
                    <div className="">
                        <div className="list-font">
                            <span class="uppernav"><Link to="/lists"><a> <FontAwesomeIcon icon={faWindowClose} /> </a></Link></span>
                            <div class="letter-block">Create new List </div>
                            <span class="home-buttons"><button class="buttons3" type="submit">Next</button></span>
                        </div>
                        <div class="">
                            <br />
                            <div class="elements">
                                <span class="label">Name</span>
                                <input class="form-control1 elements1" placeholder={this.state.listName} type="text" name="listName" onChange={this.listNameChangeHandler} required />
                            </div>
                        </div>
                        <div class="">
                            <br />
                            <div class="elements">
                                <span class="label">Description</span>
                                <input class="form-control1 elements1" placeholder={this.state.listDesc} type="text" name="listDesc" onChange={this.listDescChangeHandler} required />
                            </div>
                        </div>>
                    </div>
                </form>
                <br /><br />
            </div>



        )
    }


}

export default ListsCreate;




