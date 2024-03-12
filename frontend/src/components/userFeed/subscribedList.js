import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from "react-router-dom";
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import './tweet.css'
import Tweets from './tweets'
import Retweets from './retweets'
import Likes from './likes'
import Replies from './replies'
import Icon from 'react-icons-kit';
import { commentO } from 'react-icons-kit/fa/commentO'
import { heartO } from 'react-icons-kit/fa/heartO'
import { bookmarkO } from 'react-icons-kit/fa/bookmarkO'
import { loop } from 'react-icons-kit/iconic/loop'
import Navbar from '../navbar'



class SubscribedList extends Component {

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
            retweet: []
        }
        this.handleTweetClick = this.handleTweetClick.bind(this);
        this.handleRetweetClick = this.handleRetweetClick.bind(this);
        this.handleRepliesClick = this.handleRepliesClick.bind(this);
        this.handleLikesClick = this.handleLikesClick.bind(this);
    }

    componentDidMount(){

           const data = {
            params:{
            listID  : this.props.location.state[4]
            }
        }
        axios.defaults.withCredentials = true;
        axios.get('/lists/tweets',data)
                .then((response) => {
                this.setState({
                    retweet: response.data
                });
                this.state.retweet.map(retweet1 => {
                    console.log("members");
                    console.log(retweet1);
                });
                console.log(response)

            });
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

    deleteClick = () => {
        console.log(this.props.location.state[4])
        const data = {
            listID: this.props.location.state[4]
        }

        axios.defaults.withCredentials = true;
        axios.post('/lists/unsubscribe', data)
            .then((response) => {

            })
            .catch((error) => {
                this.setState({
                    authFlag: "false"
                })
            })
        window.location.assign("/subscriptions");
    }




    createRetweet = (v1) => {
        //e.preventDefault();
        const data = {
            retweet: "",
            tweetID: v1
        }
        console.log("v1 values", v1)
        axios.defaults.withCredentials = true;
        axios.post('/userfeed/retweet', data)
            .then((response) => {
                console.log("in axios call for post retweet")
                console.log(response)
                this.componentDidMount()
            })
            .catch((error) => {
                console.log(error)
            });
    }

    createLike = (v1) => {
        //e.preventDefault();
        const data = {
            tweetID: v1
        }
        console.log("v1 values", v1)
        axios.defaults.withCredentials = true;
        axios.put('/userfeed/like', data)
            .then((response) => {
                console.log("in axios call for like")
                console.log(response)
                this.componentDidMount()
            })
            .catch((error) => {
                console.log(error)
            });
    }

    createBookmark = (v1) => {
        //e.preventDefault();
        const data = {
            tweetID: v1
        }
        console.log("v1 values", v1)
        axios.defaults.withCredentials = true;
        axios.post('/bookmarks/create', data)
            .then((response) => {
                console.log("in axios call for creating bookmark")
                console.log(response)
                this.componentDidMount()
            })
            .catch((error) => {
                console.log(error)
            });
    }


    sendReply = (v1) => {
        console.log("inside send reply")
        const data = {
            tweetID: v1,
            reply: this.state.firstName
        }
        console.log("Data", data)
        axios.defaults.withCredentials = true;
        axios.post('/userfeed/reply', data)
            .then((response) => {
                console.log("in axios call for creating bookmark")
                console.log(response)
                this.componentDidMount()
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


        const isComponent = this.state.isComponent;
        console.log("Component : ", isComponent)

        let Contents;

        if (isComponent == "tweet") {
            Contents = (
                <Tweets />
            )
        }

        else if (isComponent == "retweet") {
            Contents = (
                <Retweets />
            )
        }

        else if (isComponent == "replies") {
            Contents = (
                <Replies />
            )
        }

        else if (isComponent == "likes") {
            Contents = (
                <Likes />
            )
        }

        let retweet;

        retweet = this.state.retweet.map(retweet1 => (
            <Link class="a" to="/descTweets">
                <div class="tweets-div" role="button">
                    <div>
                        <div class="u-flex u-flex-align">
                            <div class="u-mar2"><img src="https://library.kissclipart.com/20180904/ese/kissclipart-user-icon-png-clipart-computer-icons-user-66fe7db07b02eb73.jpg" class="logo5" style={{ height: "40px", width: "40px" }}></img></div>
                            <div class="u-flex-justify">
                                <div class="u-mar1">
                                    <div class="s-list-item-primary u-mar1 fullname">{retweet1.user.firstName}</div>
                                    <div class="s-list-item-secondary u-mar1 snippet">
                                        <span class="span">{retweet1.tweet.tweetDate.split("T")[0]}  {retweet1.tweet.tweetDate.split("T")[1].split(".")[0]}</span>
                                    </div>
                                    <div class="s-list-item-secondary u-mar1 snippet">
                                        <span class="span">{retweet1.tweet.tweet}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="img-tweets-div">
                    <img src="https://www.sftravel.com/sites/sftraveldev.prod.acquia-sites.com/files/styles/sft_390x675_dark/public/alternative-portraits/Skyline-San-Francisco-at-Dusk_2.jpg?itok=FTSuT4Sf&timestamp=1515701696" class="tweets-img" ></img>
                    <div style={{ paddingLeft: "12%" }}>
                        <div class="col-sm-3 buttons-div">{retweet1.replyCount}<Icon icon={commentO} role="button" onClick={() => this.sendReply(retweet1.tweet.tweetID)} /></div>
                        <div class="col-sm-3 buttons-div">{retweet1.retweetCount}<Icon icon={loop} role="button" onClick={() => this.createRetweet(retweet1.tweet.tweetID)} /></div>
                        <div class="col-sm-3 buttons-div">{retweet1.likeCount}<Icon icon={heartO} role="button" onClick={() => this.createLike(retweet1.tweet.tweetID)} /></div>
                        <div class="col-sm-3 buttons-div"><Icon icon={bookmarkO} role="button" onClick={() => this.createBookmark(retweet1.tweet.tweetID)} /></div>
                    </div>
                </div>
            </Link >
        ))

        return (
            <div class="container-flex">
                {redirectVar}
                <Navbar />

                <div class="col-md-6 feed1 u-list1">
                    <div class="home-font">{this.props.location.state[0]}</div>

                    <div class="home-font1">
                        <div class="">
                            <div class="rest-img">
                            </div>
                            <div class="s-list-item-primary u-mar1 fullname">{this.props.location.state[1]}</div>
                            <div class="s-list-item-primary u-mar1 listheading"></div>
                            <div class="s-list-item-secondary u-mar1 snippet">
                                <span class="span">Tweet</span>
                            </div>
                            <div class="s-list-item-secondary u-mar1 snippet">
                                <span class="span">{this.props.location.state[2]} members .</span>
                                <span class="span">{this.props.location.state[3]} subscribers</span>
                            </div>
                            <div>
                                <button class="logob" onClick={() => this.deleteClick()}>Unsubcribe</button>
                            </div>
                        </div>
                    </div>

                    <div>
                        {retweet}
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


export default SubscribedList;
