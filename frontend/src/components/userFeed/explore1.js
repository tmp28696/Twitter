import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import './tweet.css'
import Tweets from './tweets'
import Retweets from './retweets'
import Likes from './likes'
import Replies from './replies'
import { Link } from "react-router-dom";
import Navbar from '../navbar'

class profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fName: "",
            lName: "",
            errormsg: "",
            authFlag: "",
            year: "",
            month: "",
            day: "",
            startDate: moment(),
            isComponent: "",
            profile: [],
            userID:this.props.location.state.userID,
            user: this.props.location.state.profile,
            following: [],
            follArr: [],
            follText: ""
        }
        this.handleTweetClick = this.handleTweetClick.bind(this);
        this.handleRetweetClick = this.handleRetweetClick.bind(this);
        this.handleRepliesClick = this.handleRepliesClick.bind(this);
        this.handleLikesClick = this.handleLikesClick.bind(this);
        this.followUser = this.followUser.bind(this)
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
        this.setState({
            userID:this.state.userID,
            user: this.state.user
        })
        sessionStorage.setItem("component","explore")
        sessionStorage.setItem("ID",this.state.userID)
        console.log("Data: ",this.props.location.state.userID)
        console.log("UserID: ", this.props.location.state.profile)
        console.log("inside edit profile get request")
        this.getFollowing()
        axios.defaults.withCredentials = true;
        axios.get("/users/profile")
            .then((response) => {
                console.log("data: ", response.data)
                this.setState({
                    fname: response.data.firstName,
                    lname: response.data.lastName,
                    email: response.data.email,
                    bio: response.data.profileDesc,
                    city: response.data.city,
                    state: response.data.state,
                    zipcode: response.data.zipcode,
                });
                sessionStorage.setItem("exploreUser",this.state.user)
                if(response.data.profileImage){
                    this.setState({
                        profileimage : response.data.profileImage
                    })
                }
                
                const data={
           
                    userID:this.state.userID,
                }
            });
        
          const data={

                    userID:this.props.location.state

            }
            axios.defaults.withCredentials = true;
           
            axios.post('http://localhost:3001/analytics/incprofileviewcount',data)
                    .then((response) => {




                });
    }

    getFollowing() {
        const data = {
            params : {
                userID : sessionStorage.getItem("userID")
            }
        }
        console.log(data.params.userID)
        axios.defaults.withCredentials = true;
        axios.get("/userprofile/followed", data)
            .then((response) => {
                this.setState({
                    following: response.data
                });
                console.log("following",response.data)
                let foll1 = []
                var foll = this.state.following;
                foll.map(f1 => {
                    foll1.push(f1.userID)
                });
                console.log("UserIDs of following", foll1)
                var flag = foll1.includes(sessionStorage.getItem("userID"))
                if(flag == false){
                    this.setState({
                        follText : "Follow"
                    })
                }
                else if(flag ==true){
                    this.setState({
                        follText : "Unfollow"
                    })
                }
                this.setState({
                    follArr: foll1
                })

            }) .catch(error => {
                this.setState({
                    message: "something went wrong"
                })
            });
    }

    followUser = () => {

        console.log("Follow user method called")
        const data = {
            followedID: this.state.userID
        }
        var a = this.state.follText;

        if(a == "Follow"){

        axios.defaults.withCredentials = true;
        axios.post('/users/follow', data)
            .then((response) => {
                console.log("in axios call for follow")
                console.log("follow resp: ",response)
                this.componentDidMount()
            })
            .catch((error) => {
                console.log(error)
            });
        }

        else if(a == "Unfollow"){
        axios.defaults.withCredentials = true;
        axios.post('/users/unfollow', data)
            .then((response) => {
                console.log("in axios call for unfollow")
                console.log(response)
                this.componentDidMount()
            })
            .catch((error) => {
                console.log(error)
            });
        }
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
        
        //render different components
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

        let user1 = this.state.user
        return (
            <div class="container-flex">
                {redirectVar}
                <Navbar/>

                <div class="col-md-6 feed1 u-list1">
                    <div class="home-font"></div>

                    <div class="home-font1">
                        <div class="">
                            <div class="rest-img">
                                <img src="https://platinumroyalties.com/wp-content/uploads/2018/01/bjs.jpg" class="logoa"></img>
                                <button  class="logob" onClick = {this.followUser}>{this.state.follText}</button>
                                <Link to={{pathname:"/otherlist",state:this.props.location.state}}><button class="logod">View Lists</button></Link>                            </div>
                            
                            <div>
                            
                            </div><br /><br /><br/>
                            <h5 class="rest-name-div1">{user1.firstName} {user1.lastName}</h5>
                            <h5 class="rest-name-div">{user1.city}, {user1.state}-{user1.zipcode}</h5>
                            <h5 class="rest-name-div">{user1.bio}</h5>
                            <h5 class="rest-name-div"> <Link to="/followers" style={{color:"black"}}>Followers</Link>    <Link to="/following" style={{color:"black"}}>Following </Link></h5>
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





