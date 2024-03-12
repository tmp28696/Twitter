import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './tweet.css'
import Tweets from './tweets'
import Retweets from './retweets'
import Likes from './likes'
import Replies from './replies'
import Navbar from '../navbar'



class profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isComponent: "",
            userID:"",
            fname: "",
            lname: "",
            city:"",
            state:"",
            userName:"",
            zipcode:"",
            bio:"",
            email: "",
            profileimage: "https://www.alc.edu/wp-content/uploads/2016/10/13-twitter-logo-vector-png-free-cliparts-that-you-can-download-to-you-Km878c-clipart.png",
            imageURL:""
        }
        this.handleTweetClick = this.handleTweetClick.bind(this);
        this.handleRetweetClick = this.handleRetweetClick.bind(this);
        this.handleRepliesClick = this.handleRepliesClick.bind(this);
        this.handleLikesClick = this.handleLikesClick.bind(this);
    }

    handleTweetClick() {
        this.setState({ isComponent: "tweet" });
    }

    handleRetweetClick() {
        this.setState({ isComponent: "retweet" });
    }

    handleRepliesClick() {
        this.setState({ isComponent: "replies" });
    }

    handleLikesClick() {
        this.setState({ isComponent: "likes" });
    }


    handleRetweetClick() {
        this.setState({ isComponent: "retweet" });
    }


    submitLogin(values) {
        this.props.signup(values);
        console.log(this);
    }

    componentDidMount() {
        console.log("inside edit profile get request")
        axios.defaults.withCredentials = true;
        axios.get("/users/profile")
            .then((response) => {
                console.log("data: ", response.data)
                //update the state with the response data
                this.setState({
                    fname: response.data.firstName,
                    lname: response.data.lastName,
                    email: response.data.email,
                    bio: response.data.profileDesc,
                    profileImage: response.data.profileImage,
                    city: response.data.city,
                    state: response.data.state,
                    zipcode: response.data.zipcode,
                    userID: response.data.userID,
                    userName: response.data.userName
                });
                sessionStorage.setItem("fName",this.state.fname)
                sessionStorage.setItem("lName",this.state.lname)
                sessionStorage.setItem("userName",this.state.userName)
                sessionStorage.setItem("profileImage",this.state.profileImage)
                sessionStorage.setItem("userID",this.state.userID)
                sessionStorage.setItem("component","profile")
                if(response.data.profileImage != ""){
                    this.setState({
                        profileimage : response.data.profileImage
                    })
                }
            }) .catch(error => {
                this.setState({
                })
            });
    }

    render() {

        let redirectVar = null;
        if (localStorage.getItem('email') == null) {
            console.log("in cookie if")
            redirectVar = <Redirect to="/login" />
        }
        
        const isComponent = this.state.isComponent;
        console.log("Component : ",isComponent)

        let Contents;
        
        if(isComponent == "tweet"){
            Contents = (
                <Tweets/>
            )
        }

        else if(isComponent == "retweet"){
            Contents = (
                <Retweets/>
            )
        }

        else if(isComponent == "replies"){
            Contents = (
                <Replies/>
            )
        }

        else if(isComponent == "likes"){
            Contents = (
                <Likes/>
            )            
        }




        return (
            <div class="container-flex">
                {redirectVar}
                <Navbar/>

                <div class="col-md-6 feed1 u-list1">
                    <div class="home-font">{this.state.userName}</div>

                    <div class="home-font1">
                        <div class="">
                            <div class="rest-img">
                                <img src={this.state.profileImage} class="logoa"></img>
                                <Link to="/editprofile"><button class="logob">Edit Profile</button></Link>
                            </div>
                            <div>

                            </div><br /><br />
                            <h5 class="rest-name-div1">{this.state.fname} {this.state.lname}</h5>
                            <h5 class="rest-name-div">{this.state.city}, {this.state.state}-{this.state.zipcode}</h5>
                            <h5 class="rest-name-div">{this.state.bio}</h5>
                            <h5 class="rest-name-div">  <Link to="/followers" style={{color:"black"}}>Followers</Link>    <Link to="/following" style={{color:"black"}}>Following </Link></h5>
                        </div>
                    </div>
                    <div class="home-font2">
                        <div class="col-md-4 divs" style={{ paddingLeft: "60px", paddingTop: "5px" }}><span onClick={this.handleTweetClick} role="button">Tweets</span></div>
                        <div class="col-md-4 divs" style={{ paddingLeft: "50px", paddingTop: "5px" }}><span onClick={this.handleRetweetClick} role="button">Retweets</span></div>
                        {/* <div class="col-md-3 divs" style={{ paddingLeft: "50px", paddingTop: "5px" }}><span onClick={this.handleRepliesClick} role="button">Replies</span></div> */}
                        <div class="col-md-4 divs" style={{ paddingLeft: "60px", paddingTop: "5px" }}><span onClick={this.handleLikesClick} role="button">Likes</span></div>
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


export default profile;





