import React, { Component } from 'react';
import Icon from 'react-icons-kit';
import { commentO } from 'react-icons-kit/fa/commentO'
import { heartO } from 'react-icons-kit/fa/heartO'
import { bookmarkO } from 'react-icons-kit/fa/bookmarkO'
import { loop } from 'react-icons-kit/iconic/loop'
import '../../App.css';
import './tweet.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


class Retweets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            retweet: [],
            profileImage: sessionStorage.getItem('profileImage')
        }

    }

    componentDidMount() {
        var a = sessionStorage.getItem("component")
        let data;
        if (a == "profile") {
            data = {
                params: {
                    userID: sessionStorage.getItem("userID")
                }
            }
        }
        else if (a == "explore") {
            data = {
                params: {
                    userID: sessionStorage.getItem("ID")
                }
            }
        }
        console.log("USERID: ", data)

        console.log(data.userID)
        axios.defaults.withCredentials = true;
        axios.get('/userprofile/retweets', data)
            .then((response) => {
                this.setState({
                    retweet: response.data,

                });
                console.log(response)
                console.log(this.state.retweet)
            });
    }


    render() {



        let reTweet;

        reTweet = this.state.retweet.map(retweet => {
            var profileimg = "https://library.kissclipart.com/20180904/ese/kissclipart-user-icon-png-clipart-computer-icons-user-66fe7db07b02eb73.jpg"

            var profileimg = retweet.user.profileImage;
            if (profileimg == null) {
                profileimg = "https://library.kissclipart.com/20180904/ese/kissclipart-user-icon-png-clipart-computer-icons-user-66fe7db07b02eb73.jpg"
            }
            else {
                profileimg = retweet.user.profileImage;
            }

            if (retweet.tweet.tweetImage == "") {
                return (

                    <div class="tweets-div u-list1">
                        <span class="span" style={{ paddingLeft: "70px" }}>You retweeted   <Icon icon={loop} /></span><br />
                        <div class="u-flex u-flex-align">

                            <div class="u-mar2"><img src={this.state.profileImage} class="logo5" style={{ height: "40px", width: "40px" }}></img></div>
                            <div class="u-flex-justify">
                                <div class="u-mar1">
                                    <div class="s-list-item-primary u-mar1 fullname">{retweet.user.firstName}</div>
                                    <span class="span s-list-item-secondary u-mar1 snippet" >{retweet.retweets[0].retweetDate.split("T")[0]}  {retweet.retweets[0].retweetDate.split("T")[1].split(".")[0]}</span>
                                    <div class="s-list-item-secondary u-mar1 snippet">

                                        <span class="span">{retweet.tweet.tweet}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="img-tweets-div">

                            {/* <img src="https://www.sftravel.com/sites/sftraveldev.prod.acquia-sites.com/files/styles/sft_390x675_dark/public/alternative-portraits/Skyline-San-Francisco-at-Dusk_2.jpg?itok=FTSuT4Sf&timestamp=1515701696" class="tweets-img" ></img> */}
                            <div style={{ paddingLeft: "12%", paddingTop: "2%", display: "flex" }}>
                                <div class="col-sm-3 buttons-div"><Icon icon={commentO} role="button" /></div>
                                <div class="col-sm-3 buttons-div"><Icon icon={loop} role="button" /></div>
                                <div class="col-sm-3 buttons-div"><Icon icon={heartO} role="button" /></div>
                                <div class="col-sm-3 buttons-div"><Icon icon={bookmarkO} role="button" /></div>
                            </div>
                        </div>

                        <br /><br />
                    </div>
                )
            }

            else if (retweet.tweet.tweetImage != "") {
                return (

                    <div class="tweets-div u-list1">
                        <span class="span" style={{ paddingLeft: "70px" }}>You retweeted   <Icon icon={loop} /></span><br />
                        <div class="u-flex u-flex-align">

                            <div class="u-mar2"><img src={this.state.profileImage} class="logo5" style={{ height: "40px", width: "40px" }}></img></div>
                            <div class="u-flex-justify">
                                <div class="u-mar1">
                                    <div class="s-list-item-primary u-mar1 fullname">{retweet.user.firstName}</div>
                                    <span class="span s-list-item-secondary u-mar1 snippet" >{retweet.retweets[0].retweetDate.split("T")[0]}  {retweet.retweets[0].retweetDate.split("T")[1].split(".")[0]}</span>
                                    <div class="s-list-item-secondary u-mar1 snippet">

                                        <span class="span">{retweet.tweet.tweet}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="img-tweets-div">

                            <img src={retweet.tweet.tweetImage} class="tweets-img" ></img>
                            <div style={{ paddingLeft: "12%", paddingTop: "2%", display: "flex" }}>
                                <div class="col-sm-3 buttons-div"><Icon icon={commentO} role="button" /></div>
                                <div class="col-sm-3 buttons-div"><Icon icon={loop} role="button" /></div>
                                <div class="col-sm-3 buttons-div"><Icon icon={heartO} role="button" /></div>
                                <div class="col-sm-3 buttons-div"><Icon icon={bookmarkO} role="button" /></div>
                            </div>
                        </div>

                        <br /><br />
                    </div>
                )
            }
        })




        return (
            <div class="container-flex">

                {reTweet}

            </div>

        )
    }

}


export default Retweets;





