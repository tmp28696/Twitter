import React, { Component } from 'react';
import Icon from 'react-icons-kit';
import {commentO} from 'react-icons-kit/fa/commentO'
import {heartO} from 'react-icons-kit/fa/heartO'
import {bookmarkO} from 'react-icons-kit/fa/bookmarkO'
import {loop} from 'react-icons-kit/iconic/loop'
import '../../App.css';
import './tweet.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

class tweets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweet: [],
            fName: "",
            profileImage: sessionStorage.getItem('profileImage'),
            user: sessionStorage.getItem('exploreUser') 
        }

        this.deleteClick = this.deleteClick.bind(this)
    }


    componentDidMount(){
        console.log("in componentdidmount")
        console.log("profileimage: ",this.state.profileImage)
        //console.log("path: ", this.props.match.path)
        console.log("Profile of", sessionStorage.getItem("component"))
        var a = sessionStorage.getItem("component")
        let data;
        if(a == "profile"){
             data = {
                params:{
                userID : sessionStorage.getItem("userID")
            }}
            this.setState({
                name: this.state.user.firstName
            })
        }
        else if(a == "explore"){
             data = {
                params:{
                userID : sessionStorage.getItem("ID")
            }}
            this.setState({
                name: sessionStorage.getItem("fName")
            })
        }
        console.log("USERID: ",data)
        
        console.log(data.userID)
        axios.defaults.withCredentials = true;
        axios.get('/userprofile/tweets', data)
                .then((response) => {
                    console.log("in axios", response.data)
                this.setState({
                  //  tweet : response.data,
                //    fName : sessionStorage.getItem("fName")
                });
                console.log(response)
                console.log(this.state.tweet)
                console.log(sessionStorage.getItem("fName"))
            });
    }

    deleteClick = (tweetid) => {
        console.log("in delete click", tweetid)
        const data = {
            tweetID : tweetid
         }
        axios.defaults.withCredentials = true;
        axios.post('/userfeed/delete', data)
                .then((response) => {
                    console.log("in axios", response)
                    if(response.status == 200){
                    this.setState({
                        authFlag : "true"
                    })
                    }
                    else{
                        this.setState({
                            authFlag : "false"
                        }) 
                    }
                    console.log("tweet deleted")
            });
    }

    render() {
    
        let tweet1;
        
        tweet1 = this.state.tweet.map(tweet => {
            var profileimg = "https://library.kissclipart.com/20180904/ese/kissclipart-user-icon-png-clipart-computer-icons-user-66fe7db07b02eb73.jpg"

            var profileimg = this.state.profileImage;
            if(profileimg == null){
                profileimg = "https://library.kissclipart.com/20180904/ese/kissclipart-user-icon-png-clipart-computer-icons-user-66fe7db07b02eb73.jpg"
            }
            else{
                profileimg = this.state.profileImage;
            }
            if(tweet.tweet.tweetImage == "")
            {
                return(
                
                <div class="tweets-div" role="button">
                    <div>
                    <div class="u-flex u-flex-align">
                                <div class="u-mar2"><img src={profileimg} class="logo5" style={{height:"40px", width:"40px"}}></img></div>
                                <div class="u-flex-justify">
                                <div class="u-mar1">
                                <Link class="a" to="/descTweets">
                                <div class="s-list-item-primary u-mar1 fullname">{this.state}</div>
                                <span class="span s-list-item-secondary u-mar1 snippet" >{tweet.tweet.tweetDate.split("T")[0]}  {tweet.tweet.tweetDate.split("T")[1].split(".")[0]}</span>
                                <div class="s-list-item-secondary u-mar1 snippet">
                                        <span class="span">{tweet.tweet.tweet}</span>
                                </div></Link>
                                </div>
                                </div>
                                <div class="edit"><button class="buttons3" style={{marginTop:"10px", width: "70px"}} onClick = {() => this.deleteClick(tweet.tweet.tweetID)}>Delete</button></div>
                                </div>
                    </div>
                    <div class="img-tweets-div">
                        {/* <img src="https://www.sftravel.com/sites/sftraveldev.prod.acquia-sites.com/files/styles/sft_390x675_dark/public/alternative-portraits/Skyline-San-Francisco-at-Dusk_2.jpg?itok=FTSuT4Sf&timestamp=1515701696" class="tweets-img" ></img> */}
                        <div style={{paddingLeft: "12%"}}>
                        <div class="col-sm-3 buttons-div"><Icon icon={commentO} role="button"/> {tweet.replyCount}</div>
                        <div class="col-sm-3 buttons-div"><Icon icon={loop} role="button"/> {tweet.retweetCount}</div>
                        <div class="col-sm-3 buttons-div"><Icon icon={heartO} role="button"/> {tweet.likeCount}</div>
                        <div class="col-sm-3 buttons-div"><Icon icon={bookmarkO} role="button"/></div>                
                        </div>
                    </div>
                    
                    <br/><br/>
                </div>
                
            )}
            else if(tweet.tweet.tweetImage != ""){
            return(
               
            <div class="tweets-div" role="button">
                <div>
                <div class="u-flex u-flex-align">
                            <div class="u-mar2"><img src={profileimg} class="logo5" style={{height:"40px", width:"40px"}}></img></div>
                            <div class="u-flex-justify">
                            <div class="u-mar1">
                            <Link class="a" to="/descTweets">
                            <div class="s-list-item-primary u-mar1 fullname">{sessionStorage.getItem("fName")}</div>
                            <span class="span s-list-item-secondary u-mar1 snippet" >{tweet.tweet.tweetDate.split("T")[0]}  {tweet.tweet.tweetDate.split("T")[1].split(".")[0]}</span>
                            <div class="s-list-item-secondary u-mar1 snippet">
                                    <span class="span">{tweet.tweet.tweet}</span>
                            </div></Link>
                            </div>
                            </div>
                            <div class="edit"><button class="buttons3" style={{marginTop:"10px", width: "70px"}} onClick = {() => this.deleteClick(tweet.tweet.tweetID)}>Delete</button></div>
                            </div>
                </div>
                <div class="img-tweets-div">
                    <img src={tweet.tweet.tweetImage} class="tweets-img" ></img>
                    <div style={{paddingLeft: "12%"}}>
                    <div class="col-sm-3 buttons-div"><Icon icon={commentO} role="button"/> {tweet.replyCount}</div>
                    <div class="col-sm-3 buttons-div"><Icon icon={loop} role="button"/> {tweet.retweetCount}</div>
                    <div class="col-sm-3 buttons-div"><Icon icon={heartO} role="button"/> {tweet.likeCount}</div>
                    <div class="col-sm-3 buttons-div"><Icon icon={bookmarkO} role="button"/></div>                
                    </div>
                </div>
                
                <br/><br/>
            </div>
           
            )}
        })
        



        return (
            <div class="container-flex">

            <br/>
            {tweet1}

            </div>

        )
    }

}


export default tweets;





