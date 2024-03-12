import React, { Component } from 'react';

import axios from 'axios';
import { Redirect } from 'react-router';

import Icon from 'react-icons-kit';
import { commentO } from 'react-icons-kit/fa/commentO'
import { heartO } from 'react-icons-kit/fa/heartO'
import { heart } from 'react-icons-kit/fa/heart'
import { bookmarkO } from 'react-icons-kit/fa/bookmarkO'
import { loop } from 'react-icons-kit/iconic/loop'
import Navbar from '../navbar'

class bookmarks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookmarks: [],
            currentPage: 1,
            itemsPerPage: 10,
            likeIcon: heartO,
            profileImage: sessionStorage.getItem('profileImage')

        }
        this.changeIcon = this.changeIcon.bind(this)
        this.handleClick = this.handleClick.bind(this);

    }

    componentWillReceiveProps({ bookmarks }) {
        console.log('Inside menu will receive props');
        this.setState({
            bookmarks: bookmarks
        });
    }

    componentDidMount() {

        axios.defaults.withCredentials = true;
        axios.get('/bookmarks/')
            .then((response) => {
                this.setState({
                    bookmarks: response.data
                });
                console.log(response.data)
                console.log(this.state.bookmarks)
            });
    }

    deleteBookmark = (v1) => {
        const data = {
            tweetID: v1,
            bookmarksID: ""
        }
        console.log("v1 values", v1)
        axios.defaults.withCredentials = true;
        axios.post('/bookmarks/delete', data)
            .then((response) => {
                console.log("in axios call for creating bookmark")
                console.log(response)
                this.componentDidMount()
            })
            .catch((error) => {
                console.log(error)
            });
    }

    changeIcon = () => {
        if (this.state.likeIcon == heartO) {
            this.setState({
                likeIcon: heart
            })
        }
        else if (this.state.likeIcon == heart) {
            this.setState({
                likeIcon: heartO
            })
        }
        console.log("icon ", this.state.likeIcon)
        axios.defaults.withCredentials = true;
        axios.get('/userfeed/like')
            .then((response) => {
                console.log(response.data)
            });
    }

    handleClick(event) {
        console.log(event.target.id);
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    render() {

        let redirectVar = null;
        if (localStorage.getItem('email') == null) {
            console.log("in cookie if")
            redirectVar = <Redirect to="/login" />
        }

        const { bookmarks, currentPage, itemsPerPage } = this.state;
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = bookmarks.slice(indexOfFirstItem, indexOfLastItem);

        let bookmarkTweet;


        bookmarkTweet = currentItems.map(bookmark => {
            var profileimg = this.state.profileImage;
            if (profileimg == null) {
                profileimg = "https://library.kissclipart.com/20180904/ese/kissclipart-user-icon-png-clipart-computer-icons-user-66fe7db07b02eb73.jpg"
            }
            else {
                profileimg = this.state.profileImage;
            }
            if (bookmark.tweet.tweetImage == "") {
                return (
                    <div class="tweets-div u-list1">

                        <div class="u-flex u-flex-align">
                            <div class="u-mar2"><img src={profileimg} class="logo5" style={{ height: "40px", width: "40px" }}></img></div>
                            <div class="u-flex-justify">
                                <div class="u-mar1">
                                    <div class="s-list-item-primary u-mar1 fullname">{bookmark.user.firstName} {bookmark.user.lastName}</div>
                                    <span class="span s-list-item-secondary u-mar1 snippet" >{bookmark.tweet.tweetDate.split("T")[0]}  {bookmark.tweet.tweetDate.split("T")[1].split(".")[0]}</span>
                                    <div class="s-list-item-secondary u-mar1 snippet">
                                        <span class="span">{bookmark.tweet.tweet}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="img-tweets-div">
                            <div style={{ paddingLeft: "12%", paddingTop: "2%", display: "flex" }}>
                                <div class="col-sm-3 buttons-div"><Icon icon={commentO} role="button" /> {bookmark.replyCount}</div>
                                <div class="col-sm-3 buttons-div"><Icon icon={loop} role="button" /> {bookmark.retweetCount}</div>
                                <div class="col-sm-3 buttons-div"><Icon icon={this.state.likeIcon} role="button" onClick={this.changeIcon} /> {bookmark.likeCount}</div>
                                <div class="col-sm-3 buttons-div"><Icon icon={bookmarkO} role="button" onClick={() => this.deleteBookmark(bookmark.tweet.tweetID)} /></div>
                            </div>
                        </div>

                        <br /><br />
                    </div>
                )
            }
            else if (bookmark.tweet.tweetImage != "") {
                return (
                    <div class="tweets-div u-list1">
                        {redirectVar}
                        <div class="u-flex u-flex-align">
                            <div class="u-mar2"><img src={profileimg} class="logo5" style={{ height: "40px", width: "40px" }}></img></div>
                            <div class="u-flex-justify">
                                <div class="u-mar1">
                                    <div class="s-list-item-primary u-mar1 fullname">{bookmark.user.firstName} {bookmark.user.lastName}</div>
                                    <span class="span s-list-item-secondary u-mar1 snippet" >{bookmark.tweet.tweetDate.split("T")[0]}  {bookmark.tweet.tweetDate.split("T")[1].split(".")[0]}</span>
                                    <div class="s-list-item-secondary u-mar1 snippet">
                                        <span class="span">{bookmark.tweet.tweet}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="img-tweets-div">
                            <img src={bookmark.tweet.tweetImage} class="tweets-img" ></img>
                            <div style={{ paddingLeft: "12%", paddingTop: "2%", display: "flex" }}>
                                <div class="col-sm-3 buttons-div"><Icon icon={commentO} role="button" /> {bookmark.replyCount}</div>
                                <div class="col-sm-3 buttons-div"><Icon icon={loop} role="button" /> {bookmark.retweetCount}</div>
                                <div class="col-sm-3 buttons-div"><Icon icon={this.state.likeIcon} role="button" onClick={this.changeIcon} /> {bookmark.likeCount}</div>
                                <div class="col-sm-3 buttons-div"><Icon icon={bookmarkO} role="button" onClick={() => this.deleteBookmark(bookmark.tweet.tweetID)} /></div>
                            </div>
                        </div>

                        <br /><br />
                    </div>
                )
            }
        })

        const pageNumber = [];
        for (let i = 1; i <= Math.ceil(bookmarks.length / itemsPerPage); i++) {
            pageNumber.push(i);
        }

        const renderNumber = pageNumber.map(number => {
            return (
                <div role="button" style={{ color: "#29a3ef", cursor: "pointer", borderRadius: "7px", float: "right" }} key={number} id={number} onClick={this.handleClick}>
                    {number}
                </div>
            );
        });

        return (
            <div class="container-flex">

                <Navbar />

                <div class="col-md-6 feed2" >
                    <div style={{borderBottom: "0.5px solid lightgrey", marginBottom: "5px"}}>
                    <div class="home-font">Bookmarks</div>
                    {renderNumber}
                    <div class="s-list-item-secondary snippet" style={{marginLeft: "7px", marginBottom: "15px"}}><span class="span"></span></div>
                    
                    </div>
                    {bookmarkTweet}

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


export default bookmarks;





