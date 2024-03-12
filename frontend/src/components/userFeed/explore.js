import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Icon from 'react-icons-kit';
import { commentO } from 'react-icons-kit/fa/commentO'
import { heartO } from 'react-icons-kit/fa/heartO'
import { bookmarkO } from 'react-icons-kit/fa/bookmarkO'
import { loop } from 'react-icons-kit/iconic/loop'
import Navbar from '../navbar'

class explore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            profile: []
        }

    }


    goTo = () => {
        const data = {
            params: {
                topic: this.state.search
            }
        }
        console.log("Data from explore: ", data)
        axios.defaults.withCredentials = true;
        axios.get('/userfeed/search', data)
            .then((response) => {
                this.setState({
                    profile: response.data
                });
                console.log(response)
                console.log(this.state.profile)
            });
    }

    searchChangeHandler = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    nextPage = (v1) => {
        console.log(v1)
        this.props.history.push({
            pathname: '/explore1',
            state: {
                profile: v1,
                userID: v1.userID
            }
        })
    }




    render() {

        let redirectVar = null;
        if (localStorage.getItem('email') == null) {
            console.log("in cookie if")
            redirectVar = <Redirect to="/login" />
        }

        let tweet1;

        let profile1;
        var a = this.state.search.startsWith("#")
        console.log("var a: ", a)

        // search tweets with hashtag
        if (a == true) {
            profile1 = this.state.profile.map(profile => {
                if (profile.tweet.tweetImage == "") {
                    var profileimg = profile.user.profileImage;
                    if (profileimg == null) {
                        profileimg = "https://library.kissclipart.com/20180904/ese/kissclipart-user-icon-png-clipart-computer-icons-user-66fe7db07b02eb73.jpg"
                    }
                    else {
                        profileimg = profile.user.profileImage;
                    }
                    return (
                        <Link class="a" to={{ pathname: "/descTweets", state: profile.tweet.tweetID }}>
                            <div class="tweets-div" role="button">
                                <div>
                                    <div class="u-flex u-flex-align">
                                        <div class="u-mar2">
                                            <img src={profileimg} class="logo5" style={{ height: "40px", width: "40px" }}></img>
                                        </div>
                                        <div class="u-flex-justify">
                                            <div class="u-mar1">
                                                <div class="s-list-item-primary u-mar1 fullname">{profile.user.firstName} {profile.user.lastName}</div>
                                                <div class="s-list-item-secondary u-mar1 snippet">
                                                    <span class="span">{profile.tweet.tweet}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="img-tweets-div">
                                    <div style={{ paddingLeft: "12%" }}>
                                        <div class="col-sm-3 buttons-div"><Icon icon={commentO} role="button" /> {profile.replyCount}</div>
                                        <div class="col-sm-3 buttons-div"><Icon icon={loop} role="button" /> {profile.retweetCount}</div>
                                        <div class="col-sm-3 buttons-div"><Icon icon={heartO} role="button" /> {profile.likeCount}</div>
                                        <div class="col-sm-3 buttons-div"><Icon icon={bookmarkO} role="button" /></div>
                                    </div>
                                </div>

                                <br /><br />
                            </div>
                        </Link>
                    )
                }

                else if (profile.tweet.tweetImage != "") {
                    console.log("with tweet image")
                    var profileimg = profile.user.profileImage;
                    if (profileimg == null) {
                        profileimg = "https://library.kissclipart.com/20180904/ese/kissclipart-user-icon-png-clipart-computer-icons-user-66fe7db07b02eb73.jpg"
                    }
                    else {
                        profileimg = profile.user.profileImage;
                    }
                    return (
                        <Link class="a" to={{ pathname: "/descTweets", state: profile.tweet.tweetID }}>
                            <div class="tweets-div" role="button">
                                <div>
                                    <div class="u-flex u-flex-align">
                                        <div class="u-mar2"><img src={profileimg} class="logo5" style={{ height: "40px", width: "40px" }}></img></div>
                                        <div class="u-flex-justify">
                                            <div class="u-mar1">
                                                <div class="s-list-item-primary u-mar1 fullname">{profile.user.firstName} {profile.user.lastName}</div>
                                                <div class="s-list-item-secondary u-mar1 snippet">
                                                    <span class="span">{profile.tweet.tweet}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="img-tweets-div">
                                    <img src={profile.tweet.tweetImage} class="tweets-img" ></img>
                                    <div style={{ paddingLeft: "12%" }}>
                                        <div class="col-sm-3 buttons-div"><Icon icon={commentO} role="button" /> {profile.replyCount}</div>
                                        <div class="col-sm-3 buttons-div"><Icon icon={loop} role="button" /> {profile.retweetCount}</div>
                                        <div class="col-sm-3 buttons-div"><Icon icon={heartO} role="button" /> {profile.likeCount}</div>
                                        <div class="col-sm-3 buttons-div"><Icon icon={bookmarkO} role="button" /> </div>
                                    </div>
                                </div>

                                <br /><br />
                            </div>
                        </Link>)
                }

            }
            )
        }
        // Search people
        else {
            profile1 = this.state.profile.map(profile => {
                var profileimg = profile.profileImage;
                if (profileimg == null) {
                    profileimg = "https://library.kissclipart.com/20180904/ese/kissclipart-user-icon-png-clipart-computer-icons-user-66fe7db07b02eb73.jpg"
                }
                else {
                    profileimg = profile.profileImage;
                }
                return (
                    <div class="u-clickable u-list" role="button">
                        <div class="u-flex u-flex-align container-flex">
                            <div class="u-mar2 col-sm-1" style={{ float: "left" }}><img src={profileimg} class="logo5"></img></div>
                            <div class="col-md-8" style={{ float: "left" }}>
                                <div class="u-mar3" role="button" onClick={() => this.nextPage(profile)}>
                                    <div class="s-list-item-primary u-mar3 fullname">{profile.firstName} {profile.lastName}</div>
                                    <div class="s-list-item-secondary u-mar3 snippet">
                                        <span class="span">{profile.profileDesc}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3" style={{ float: "left" }}>
                            </div>
                        </div>
                    </div>

                )
            })
        }


        return (
            <div class="container-flex">
                {redirectVar}
                <Navbar />

                <div class="col-md-6 feed">
                    <div class="home-font">Explore</div>
                    <div>
                        <input type="text" class="searchbar1" placeholder="Search Twitter" name="search" id="search" onChange={this.searchChangeHandler}></input>
                    </div>
                    <div style={{ paddingLeft: "78%" }}>
                        <button class="buttons3" onClick={this.goTo}>
                            Search
                    </button>
                    </div><br />
                    {profile1}
                </div>
                <div class="col-md-3 feed">



                </div>
            </div>
        )
    }

}


export default explore;





