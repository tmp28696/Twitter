import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Favicon from 'react-favicon';
import Icon from 'react-icons-kit';
import { commentO } from 'react-icons-kit/fa/commentO'
import { heartO } from 'react-icons-kit/fa/heartO'
import { bookmarkO } from 'react-icons-kit/fa/bookmarkO'
import { loop } from 'react-icons-kit/iconic/loop'
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import Navbar from '../navbar'

class userHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            caption: "yesha",
            email: "y@gmail.com",
            errormsg: "",
            authFlag: "",
            profileimage: "",
            imageURL: "",
            tweet: [],
            firstName: ""
        }
        this.ImageChange = this.ImageChange.bind(this);
        this.captionChangeHandler = this.captionChangeHandler.bind(this);
        this.submitChanges = this.submitChanges.bind(this);
        this.fnameChangeHandler = this.fnameChangeHandler.bind(this)
    }



    captionChangeHandler = (e) => {
        this.setState({
            caption: e.target.value
        })
    }

    ImageChange(event) {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ profileimage: e.target.result });
            };
            reader.readAsDataURL(event.target.files[0]);
            this.setState({
                imageURL: event.target.files[0]
            })
        }
    }

    submitChanges(e) {
        e.preventDefault();
        const image = new FormData();
        image.append("tweetImage", this.state.imageURL);
        image.append("tweet", this.state.caption);
        image.append("email", this.state.email);
        console.log(image);
        axios.defaults.withCredentials = true;
        axios.post('/userfeed/', image)
            .then((response) => {
                console.log("in axios call for post tweet")
                console.log("response",response)
            })
            .catch((error) => {
                console.log(error)
            });
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


    fnameChangeHandler = (e) => {
        this.setState({
            firstName: e.target.value
        })
    }


    getFollowing() {
        const data = {
            params : {
                userID : sessionStorage.getItem("userID")
            }
        }
        console.log(data.params.userID)
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:3001/userprofile/followed", data)
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

    componentDidMount() {

        axios.defaults.withCredentials = true;
        axios.get('/userfeed/tweets')
            .then((response) => {
                this.setState({
                    tweet: response.data
                    // profileimage: !response.data.data.tweetImage || response.data.data.tweetImage === 'undefined' ? '/pic.png' : response.data.data.tweetImage
                });
                console.log(response)
                console.log(this.state.tweet)
            });
    }

    like = () => {

        console.log("Follow user method called")
        const data = {
            followedID: this.state.userID
        }
        //console.log("v1 values", v1)
        var a = this.state.follText;

        if(a == "Follow"){

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/users/follow', data)
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
        axios.post('http://localhost:3001/users/unfollow', data)
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

        let tweet1;
        tweet1 = this.state.tweet.map(tweet => {
            var profileimg = tweet.user.profileImage;
                if (profileimg == null) {
                    profileimg = "https://library.kissclipart.com/20180904/ese/kissclipart-user-icon-png-clipart-computer-icons-user-66fe7db07b02eb73.jpg"
                }
                else {
                    profileimg = tweet.user.profileImage;
                }
            if (tweet.tweet.tweetImage == "") {
                return (
                    <div class="tweets-div" role="button">
                        <Link class="a" to={{ pathname: "/descTweets", state: tweet.tweet.tweetID }} >
                            <div class="u-flex u-flex-align">
                                <div class="u-mar2"><img src={profileimg} class="logo5" style={{ height: "40px", width: "40px" }}></img></div>
                                <div class="u-flex-justify">
                                <div class="u-mar1">
                                <div class="s-list-item-primary u-mar1 fullname">{tweet.user.firstName} {tweet.user.lastName}</div>
                                <span class="span s-list-item-secondary u-mar1 snippet" >{tweet.tweet.tweetDate.split("T")[0]}  {tweet.tweet.tweetDate.split("T")[1].split(".")[0]}</span>
                                <div class="s-list-item-secondary u-mar1 snippet">
                                        <span class="span">{tweet.tweet.tweet}</span>
                                </div>
                                </div>
                                </div>
                            </div>
                        </Link>
                        <div class="img-tweets-div">
                            {/* <img src="https://www.sftravel.com/sites/sftraveldev.prod.acquia-sites.com/files/styles/sft_390x675_dark/public/alternative-portraits/Skyline-San-Francisco-at-Dusk_2.jpg?itok=FTSuT4Sf&timestamp=1515701696" class="tweets-img" ></img> */}
                            <div style={{ paddingLeft: "12%" }}>

                                <div class="col-sm-3 buttons-div"><Icon icon={commentO} role="button" /> {tweet.replyCount}</div>
                                <div class="col-sm-3 buttons-div"><Icon icon={loop} role="button" onClick={() => this.createRetweet(tweet.tweet.tweetID)} /> {tweet.retweetCount}</div>
                                <div class="col-sm-3 buttons-div"><Icon icon={heartO} role="button" onClick={() => this.createLike(tweet.tweet.tweetID)} /> {tweet.likeCount}</div>
                                <div class="col-sm-3 buttons-div"><Icon icon={bookmarkO} role="button" onClick={() => this.createBookmark(tweet.tweet.tweetID)} /></div>
                            </div><br/>
                            <div class="contact-form" style={{ width: "80%", margin: "0 auto" }}>
                                <div style={{ width: "100%" }} ><br/>
                                <input type="text" placeholder="Type a reply" name="caption" onChange={this.fnameChangeHandler} style={{ size: "200", width: "400px", borderRadius: "10px"}}></input>
                                    <button class="buttons3" onClick={() => this.sendReply(tweet.tweet.tweetID)} style={{ width: "70px", height: "35px" }}>Reply</button>
                                </div>
                            </div>
                        </div>

                        <br /><br />
                    </div>

                )
            }
            else if (tweet.tweet.tweetImage != "") {
                return (
                        <div class="tweets-div" role="button">
                        <Link class="a" to={{ pathname: "/descTweets", state: tweet.tweet.tweetID }}>
                            <div>
                                <div class="u-flex u-flex-align">
                                    <div class="u-mar2"><img src={profileimg} class="logo5" style={{ height: "40px", width: "40px" }}></img></div>
                                    <div class="u-flex-justify">
                                        <div class="u-mar1">
                                            <div class="s-list-item-primary u-mar1 fullname">{tweet.user.firstName} {tweet.user.lastName} <span class="span s-list-item-secondary u-mar1 snippet" style={{ marginLeft: "40%" }}>{tweet.tweet.tweetDate.split("T")[0]}</span></div>
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
                                <div class="col-sm-3 buttons-div"><Icon icon={commentO} role="button" /> {tweet.replyCount}</div>
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




        return (
            <div class="container-flex">
                {redirectVar}
                <Navbar/>

                <div class="col-md-6 feed">
                    <div class="home-font">Home</div>
                    <div class="u-clickable u-list1" role="button">
                        <div class="u-flex">
                            <div class="u-mar2"><img src={sessionStorage.getItem('profileImage')} class="logo6"></img></div>
                            <div class="u-flex-justify">
                                <div class="u-mar1">
                                    <form onSubmit={this.submitChanges} >
                                        <div class="s-list-item-primary u-mar1 fullname">
                                            <input type="text" placeholder="What's happening?" name="caption" maxLength="280" onChange={this.captionChangeHandler} style={{ size: "200", width: "600px", border: "none" }}></input>

                                        </div><br />
                                        <span>
                                            <img id="img" src={this.state.profileimage} alt="Image" style={{ borderRadius: "20px" }}></img>
                                            <input type="file" onChange={this.ImageChange} style={{ textAlign: "center", margin: "auto" }} name="pic" accept="image/*"></input>

                                            <span class="home-buttons" style={{ width: "100px", marginLeft: "70%" }}><button class="buttons3" style={{ width: "100px" }}>Tweet</button></span>
                                        </span>
                                    </form>
                                </div>
                            </div>
                            <div class="edit"></div>
                        </div>
                    </div>
                    <div>
                        {tweet1}

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



export default userHome;