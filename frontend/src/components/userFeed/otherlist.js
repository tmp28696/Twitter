import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../navbar'

class otherlists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listCreated: []
        }
        
    }

    componentDidMount(){
        const data={
            params:{
                userID:this.props.location.state.userID
            }
        }
        axios.defaults.withCredentials = true;
        axios.get('/lists/others',data)
                .then((response) => {
                this.setState({
                    listCreated : response.data,
                   // profileimage: !response.data.data.tweetImage || response.data.data.tweetImage === 'undefined' ? '/pic.png' : response.data.data.tweetImage
                });
                console.log("lissstttt")
                console.log(data)
                
            });
    }


    render() {

        let redirectVar = null;
        if (localStorage.getItem('email') == null) {
            console.log("in cookie if")
            redirectVar = <Redirect to="/login" />
        }
       
        let listCreated;
        
        listCreated =this.state.listCreated.map(list1 =>(
            <div class="tweets-div u-list1">
                
                <div class="u-flex u-flex-align container-flex">
                        <Link class="a" to={{pathname:"/otherindlist", state:[list1.listName,list1.listDesc,list1.members.length,list1.subscribers.length,list1._id] }}>
                            <div class="u-flex-justify col-md-9" style={{float:"left"}}>
                            <div class="u-mar1">
                            <div class="s-list-item-primary u-mar1 fullname"></div>
                            <div class="s-list-item-primary u-mar1 listheading">{list1.listName}</div>
                            <div class="s-list-item-secondary u-mar1 snippet">
                                    <span class="span">{list1.listDesc}</span>
                            </div>
                            <div class="s-list-item-secondary u-mar1 snippet">
                                    <span class="span">{list1.members.length} Members </span>
                                    <span class="span">{list1.subscribers.length} Subscribers</span>
                            </div>
                            </div>
                            </div>
                        </Link>
                            <div class="col-md-3" style={{float:"left"}}>
                            </div>
                            </div>            
            </div>
            ))

        return (
            <div class="container-flex">
                {redirectVar}
                <Navbar/>
                <div class="col-md-6 feed">
                    <div class="home-font">
                        <div class="msg-block">Lists </div>
                    </div>
                        
                        <div class="topnav" id="myTopnav">
                            <a class="active" class="col-md-4">Lists</a>
                            <Link to={{pathname:"/subscribers", state:this.props.location.state }}><div class="active" class="col-md-4">Subscribers</div></Link>
                            <Link to={{pathname:"/othermembers", state:this.props.location.state }}><div class="active" class="col-md-4">Members</div></Link>
                        </div>
                    <div >
                        {listCreated}
                    </div>
                </div>
                <div class="col-md-3 feed">
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


export default otherlists;





