import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import "react-datepicker/dist/react-datepicker.css";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ListsAdduser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            user1: []
        }

        this.submitChanges = this.submitChanges.bind(this);

    }

    goTo = (e) => {
        e.preventDefault()
        const data = {
            params: {
                fname: this.state.search
            }
        }
        console.log("Data from search lists: ", data)
        axios.defaults.withCredentials = true;
        axios.get('/lists/search', data)
            .then((response) => {
                this.setState({
                    user1: response.data
                });
                console.log(this.state.user1);
                this.state.user1.map(username => {
                    console.log("username")
                    console.log(username.firstName);
                    console.log(this.state.user1[0].userID)
                });
            });
    }

    searchChangeHandler = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    submitChanges = (v1) => {
        // e.preventDefault()
        console.log("v1 valuse" + v1);
        console.log(this.props.location.state)

        const data = {
            userID: v1,
            listID: this.props.location.state

        }
        console.log(data)

        axios.defaults.withCredentials = true;

        axios.post('/lists/member', data)
            .then((response) => {
                console.log("in axios cal")
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

        let user1;
        console.log("sent value")
        console.log(this.props.location.state)
        user1 = this.state.user1.map(username => (
            <div class="u-clickable u-list" role="button" style={{}}>
                <div class="u-flex u-flex-align container-flex">
                    <div class="u-mar2 col-md-1" style={{ float: "left" }}><img src="https://library.kissclipart.com/20180904/ese/kissclipart-user-icon-png-clipart-computer-icons-user-66fe7db07b02eb73.jpg" class="logo5"></img></div>
                    <div class="col-md-8" style={{ float: "left" }}>
                        <div class="u-mar3">
                           <div>{username.firstName} {username.lastName}</div>
                            {/* <div class="s-list-item-secondary u-mar3 snippet"> */}
                        
                            {/* </div> */}
                        </div>
                    </div>
                    <div class="col-sm-3" style={{ float: "left" }}>
                        <button  onClick={() => this.submitChanges(username.userID)} class="logoc" style={{ float: "left" }}>Add</button>
                    </div>
                </div>
            </div>

            // <div class="u-flex u-flex-align container-flex" style={{width:"400px",border:"1px solid black"}}>
            //     <div class="u-mar2 col-md-2"  style={{float:"left"}}><img src="https://library.kissclipart.com/20180904/ese/kissclipart-user-icon-png-clipart-computer-icons-user-66fe7db07b02eb73.jpg" class="logo5"></img></div>
            //     <div class="col-md-7">

            //         {/* <div class="s-list-item-primary u-mar3 fullname"> </div> */}
            //             {/* <div class="s-list-item-secondary u-mar3 snippet" style={{}}> */}

            //             <span>{username.firstName}</span>


            //     </div>
            //     {/* <span></span> */}
            //     <div class="col-sm-3" style={{float:"left"}}> 
            //     <button class="logoe" onClick={() => this.submitChanges(username.userID)} style={{width:"120px"}}>Add Member</button>
            //     </div>
            // </div>


        ))



        return (
            <div className="opacity">
                {redirectVar}
                <div className="first">
                    <div class="signup2">
                        <div class="col-md-3">
                        </div>
                        <div class="outer-box1 signup1" >
                            <div class="">
                                <div className="container">
                                    <div className="list-font">
                                        <span class="uppernav"><Link to="/lists"><a> <FontAwesomeIcon icon={faWindowClose} /> </a></Link></span>
                                        <div class="letter-block">Add Members</div>
                                        {/* <Link to="/lists"> <button class="button">Go back </button></Link> */}
                                    </div>
                                    <div className="list-font">
                                        <div>
                                            <input type="text" class="searchbar1" style={{width:"400px"}} placeholder="Add member" name="search" id="search" onChange={this.searchChangeHandler}></input>
                                            <button class="button" onClick={this.goTo}>
                                                Search
                                            </button>
                                            {user1}
                                        </div>
                                        
                                           
                                       
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


export default ListsAdduser; 