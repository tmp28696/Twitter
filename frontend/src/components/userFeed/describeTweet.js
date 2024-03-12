import React, { Component } from "react";
import Icon from "react-icons-kit";
import { commentO } from "react-icons-kit/fa/commentO";
import { heartO } from "react-icons-kit/fa/heartO";
import { bookmarkO } from "react-icons-kit/fa/bookmarkO";
import { loop } from "react-icons-kit/iconic/loop";
import "../../App.css";
import "./tweet.css";
import axios from "axios";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import ModernDatepicker from "react-modern-datepicker";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import Favicon from "react-favicon";
import { Link } from "react-router-dom";
import Navbar from '../navbar'

class describeTweet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errormsg: "",
            authFlag: "",
            tweetID: "",
            tweet: [],
            reply: [],
            replyData: []
        }

    }




    componentDidMount() {
        const data = {
            params: {
                tweetID: this.props.location.state
            }
        }
        console.log("Data from home", data.params.tweetID)
        axios.defaults.withCredentials = true;
        axios.get('/tweets/details', data)
            .then((response) => {
                this.setState({
                    tweet: response.data,
                    reply: response.data[0].replies
                });
                console.log("tweet: ", this.state.tweet)
                console.log("Reply ", this.state.reply)

            });
         const data1 = {
      tweetID: this.props.location.state
    };
    axios.defaults.withCredentials = true;
    console.log("inc");
    console.log(this.props.location.state);

    axios
      .post("http://localhost:3001/analytics/inctweetviewcount", data1)
      .then(response => {});
  }

    


    render() {

        let redirectVar = null;
        if (localStorage.getItem('email') == null) {
            console.log("in cookie if")
            redirectVar = <Redirect to="/login" />
        }
        console.log(this.state.tweet)
        let tweet1 = this.state.tweet.map(tweet => {
            if (tweet.tweet.tweetImage == "") {
                var profileimg = tweet.tweetOwner.profileImage;
                if (profileimg == null) {
                    profileimg = "https://library.kissclipart.com/20180904/ese/kissclipart-user-icon-png-clipart-computer-icons-user-66fe7db07b02eb73.jpg"
                }
                else {
                    profileimg = tweet.tweetOwner.profileImage;
                }
                return (
                    <div class="tweets-div" role="button">
                        <Link class="a" to={{ pathname: "/descTweets", state: tweet.tweet.tweetID }} >
                            <div class="u-flex u-flex-align">
                                <div class="u-mar2"><img src={profileimg} class="logo5" style={{ height: "40px", width: "40px" }}></img></div>
                                <div class="u-flex-justify">
                                    <div class="u-mar1">
                                        <div class="s-list-item-primary u-mar1 fullname">{tweet.tweetOwner.firstName} {tweet.tweetOwner.lastName}</div>
                                        <span class="span s-list-item-secondary u-mar1 snippet" >{tweet.tweet.tweetDate.split("T")[0]}  {tweet.tweet.tweetDate.split("T")[1].split(".")[0]}</span>
                                        <div class="s-list-item-secondary u-mar1 snippet">
                                            <span class="span">{tweet.tweet.tweet}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div class="img-tweets-div">
                            <div style={{ paddingLeft: "12%" }}>

                                <div class="col-sm-3 buttons-div"><Icon icon={commentO} role="button" onClick={() => this.handleNameClick(tweet.tweet.tweetID)} /> {tweet.replyCount}</div>
                                <div class="col-sm-3 buttons-div"><Icon icon={loop} role="button" onClick={() => this.createRetweet(tweet.tweet.tweetID)} /> {tweet.retweetCount}</div>
                                <div class="col-sm-3 buttons-div"><Icon icon={heartO} role="button" onClick={() => this.createLike(tweet.tweet.tweetID)} /> {tweet.likeCount}</div>
                                <div class="col-sm-3 buttons-div"><Icon icon={bookmarkO} role="button" onClick={() => this.createBookmark(tweet.tweet.tweetID)} /></div>
                            </div><br />
                            <div class="contact-form" style={{ width: "80%", margin: "0 auto" }}>
                                <div style={{ width: "100%" }} ><br />
                                    <input type="text" placeholder="Type a reply" name="caption" onChange={this.fnameChangeHandler} style={{ size: "200", width: "400px", borderRadius: "10px" }}></input>
                                    <button class="buttons3" onClick={() => this.sendReply(tweet.tweet.tweetID)} style={{ width: "70px", height: "35px" }}>Reply</button>
                                </div>
                            </div>
                        </div>

                        <br /><br />
                    </div>

                )
            }
            else if (tweet.tweet.tweetImage != "") {
                var profileimg = tweet.tweetOwner.profileImage;
                if (profileimg == null) {
                    profileimg = "https://library.kissclipart.com/20180904/ese/kissclipart-user-icon-png-clipart-computer-icons-user-66fe7db07b02eb73.jpg"
                }
                else {
                    profileimg = tweet.tweetOwner.profileImage;
                }
                return (
                    <div class="tweets-div" role="button">
                        <Link class="a" to={{ pathname: "/descTweets", state: tweet.tweet.tweetID }}>
                            <div>
                                <div class="u-flex u-flex-align">
                                    <div class="u-mar2"><img src={profileimg} class="logo5" style={{ height: "40px", width: "40px" }}></img></div>
                                    <div class="u-flex-justify">
                                        <div class="u-mar1">
                                            <div class="s-list-item-primary u-mar1 fullname">{tweet.tweetOwner.firstName} {tweet.tweetOwner.lastName} <span class="span s-list-item-secondary u-mar1 snippet" style={{ marginLeft: "40%" }}>{tweet.tweet.tweetDate.split("T")[0]}</span></div>
                                            <span class="span s-list-item-secondary u-mar1 snippet">{tweet.tweet.tweetDate.split("T")[1].split(".")[0]} </span>                            <div class="s-list-item-secondary u-mar1 snippet">
                                                <span class="span">{tweet.tweet.tweet}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div class="img-tweets-div">
                            <img src={tweet.tweet.tweetImage} class="tweets-img" ></img>
                            <div style={{ paddingLeft: "12%" }}>
                                <div class="col-sm-3 buttons-div"><Icon icon={commentO} role="button" onClick={() => this.handleNameClick(tweet.tweet.tweetID)} /> {tweet.replyCount}</div>
                                <div class="col-sm-3 buttons-div"><Icon icon={loop} role="button" onClick={() => this.createRetweet(tweet.tweet.tweetID)} /> {tweet.retweetCount}</div>
                                <div class="col-sm-3 buttons-div"><Icon icon={heartO} role="button" onClick={() => this.createLike(tweet.tweet.tweetID)} /> {tweet.likeCount}</div>
                                <div class="col-sm-3 buttons-div"><Icon icon={bookmarkO} role="button" onClick={() => this.createBookmark(tweet.tweet.tweetID)} /></div>
                            </div>
                        </div>
                        <div class="contact-form" style={{ width: "80%", margin: "0 auto" }}>
                            <div style={{ width: "100%" }} >
                                <input type="text" placeholder="Type a reply" name="caption" onChange={this.captionChangeHandler} style={{ size: "200", width: "400px", borderRadius: "10px" }}></input>
                                <button class="buttons3" onClick={() => this.sendReply(tweet.tweet.tweetID)} style={{ width: "70px", height: "35px" }}>Reply</button>
                            </div>
                        </div>
                        <br /><br />
                    </div>
                )
            }
        })



        let replies = this.state.reply.map(reply1 => {
            console.log(reply1)
            return (
                <div class="u-flex u-flex-align u-list2">
                    <div class="u-mar2"><img src="https://library.kissclipart.com/20180904/ese/kissclipart-user-icon-png-clipart-computer-icons-user-66fe7db07b02eb73.jpg" class="logo5"></img></div>
                    <div class="u-flex-justify">
                        <div class="u-mar1">
                            <div class="s-list-item-primary u-mar1 fullname">{reply1.user.firstName} {reply1.user.lastName}</div>
                            <div class="s-list-item-secondary u-mar1 snippet">
                                <span class="span">Replying to </span><br />
                                <span class="span">Reply: {reply1.reply.reply}</span>
                            </div>
                        </div>
                    </div>

                </div>
            )
        }

        )

        return (
            <div class="container-flex">
                {redirectVar}
                <Navbar />
                <div class="col-md-6 feed">
                    <div class="home-font">Thread</div><br />

                    <div>
                        {tweet1}
                    </div>
                    <div>

                        {replies}
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

        );
    }
}

export default describeTweet;
