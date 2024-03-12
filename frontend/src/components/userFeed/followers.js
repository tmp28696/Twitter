import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import Navbar from '../navbar'

class followers extends Component {

    constructor(props) {
        super(props);
        this.state = {
           followers:[],
           userID:"",
           currentPage : 1,
           itemsPerPage : 10
        }
        this.handleClick = this.handleClick.bind(this); 

    }

    componentWillReceiveProps({followers}) {
        console.log('Inside menu will receive props');
        this.setState({
            followers : followers
        });
    }


    componentDidMount() {
        var a = sessionStorage.getItem("component")
        let data;
        if(a == "profile"){
             data = {
                params:{
                userID : sessionStorage.getItem("userID")
            }}
        }
        else if(a == "explore"){
             data = {
                params:{
                userID : sessionStorage.getItem("ID")
            }}
        }
        
        console.log(data.params.userID)
        axios.defaults.withCredentials = true;
        axios.get("/userprofile/followers", data)
            .then((response) => {
                this.setState({
                    followers: response.data
                  
                });
                console.log(response.data)
                let foll1 = []
                var foll = this.state.followers;
                foll.map(f1 => {
                    foll1.push(f1.userID)
                });
                console.log("UserIDs of followers", foll1)
                  
            }) .catch(error => {
                this.setState({
                    message: "something went wrong"
                })
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

        const {followers,currentPage, itemsPerPage} = this.state;
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = followers.slice(indexOfFirstItem, indexOfLastItem);

        let Contents;
        Contents = currentItems.map(people => {
            var profileimg = people.profileImage;
            if (profileimg == null) {
                profileimg = "https://library.kissclipart.com/20180904/ese/kissclipart-user-icon-png-clipart-computer-icons-user-66fe7db07b02eb73.jpg"
            }
            else {
                profileimg = people.profileImage;
            }
            
            return(
            <div class="u-clickable followers-box" role="button">
                                <div class="u-flex u-flex-align">
                                    <div class="u-mar2" style={{paddingLeft:"15px"}}><img src={profileimg} class="logo5"></img></div>
                                    <div class="u-flex-justify">
                                    <div class="u-mar1" style={{width:"450px"}}>
                                    <div class="s-list-item-primary u-mar1 fullname">{people.firstName} {people.lastName} </div>
                                        <div class="s-list-item-secondary u-mar1 snippet">
                                            <span class="span">{people.userName}</span>
                                        </div>
                                        </div>
                                        </div>
                                    <div class="edit"><button class="buttons3" style={{marginTop:"10px"}}>Follow</button></div>
                                </div>
                                
                            </div>
         ) } )


         const pageNumber = [];
         for(let i = 1; i <= Math.ceil(followers.length / itemsPerPage);i++) {
             pageNumber.push(i);
         }

         const renderNumber = pageNumber.map(number => {
            return (
                <div role="button" style={{color: "#29a3ef", cursor: "pointer", borderRadius: "7px", float:"right"}} key = {number} id = {number} onClick = {this.handleClick}> 
                    {number}
                </div>
            );
        });


        return (
            <div class="container-flex">
               {redirectVar}
                <Navbar/>

                <div class="col-md-6 feed1 u-list1">
                <div style={{borderBottom: "0.5px solid lightgrey", marginBottom: "5px"}}>
                    <div class="home-font">{sessionStorage.getItem('fName')} {sessionStorage.getItem('lName')}</div>
                    <div class="s-list-item-secondary snippet" style={{marginLeft: "7px", marginBottom: "15px"}}><span class="span">{sessionStorage.getItem('userName')}</span></div>
                    </div>

                    <div class="home-font1">
                    </div>
                    <div class="home-font2">
                        <div class="divs" style={{ color: "#29a3ef",width:"50%",paddingLeft: "60px", paddingTop: "5px"}}>
                        <a href="/followers" class="a"><span onClick={this.handleTweetClick} role="button">Followers</span></a></div>
                        <div class="divs" style={{width:"50%",paddingLeft: "50px", paddingTop: "5px" }}>
                        <a href="/following" class="a"><span role="button">Following</span></a></div>
                    </div>
                    <div>
                        {Contents}
                        {renderNumber}
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


export default followers;





