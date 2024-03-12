import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
class editProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            city:"",
            state:"",
            zipcode:"",
            bio:"",
            email: "",
            profileimage: "https://www.alc.edu/wp-content/uploads/2016/10/13-twitter-logo-vector-png-free-cliparts-that-you-can-download-to-you-Km878c-clipart.png",
            imageURL:"",
            authFlag:""
        }

        this.fnameChangeHandler = this.fnameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.lnameChangeHandler = this.lnameChangeHandler.bind(this);
        this.profileimageChangeHandler = this.profileimageChangeHandler.bind(this);
        this.bioChangeHandler = this.bioChangeHandler.bind(this);
        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.stateChangeHandler = this.stateChangeHandler.bind(this);
        this.zipChangeHandler = this.zipChangeHandler.bind(this);
        this.submitChanges = this.submitChanges.bind(this);
        this.ImageChange = this.ImageChange.bind(this);
        
    }
    
    componentDidMount() {
        console.log("inside edit profile get request")
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:3001/users/profile")
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
                
                if(response.data.profileImage){
                    this.setState({
                        profileimage : response.data.profileImage
                    })
                }
            }) .catch(error => {
                this.setState({
                })
            });
    }

    fnameChangeHandler = (e) => {
        this.setState({
            fname: e.target.value
        })
    }

    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    lnameChangeHandler = (e) => {
        this.setState({
            lname: e.target.value
        })
    }

    profileimageChangeHandler = (e) => {
        this.setState({
            
        })
    }

    bioChangeHandler = (e) => {
        this.setState({
            bio : e.target.value
        })
    }

    cityChangeHandler = (e) => {
        this.setState({
            city : e.target.value
        })
    }

    stateChangeHandler = (e) => {
        this.setState({
            state : e.target.value
        })
    }

    zipChangeHandler = (e) => {
        this.setState({
            zipcode : e.target.value
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
        e.preventDefault()
        const image = new FormData();
        image.append("profileImage", this.state.imageURL);
        image.append("firstName", this.state.fname);
        image.append("lastName", this.state.lname);
        image.append("email", this.state.email);
        image.append("profileDesc", this.state.bio);
        image.append("city", this.state.city);
        image.append("state", this.state.state);
        image.append("zipcode", this.state.zipcode);
        console.log(image)
        axios.defaults.withCredentials = true;
        axios.put('/users/profile', image)
            .then((response) => {
                console.log("in axios call")
                console.log(response)
                if(response.status == 200){
                    this.setState({
                        authFlag : "Saved changes successfully"
                    })
                }
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
        

        return (
            <div class="signup2">
                {redirectVar}
                <br />
                <form class="outer-box1 signup1" onSubmit={this.submitChanges} >
                    <br />
                    <img src="https://www.alc.edu/wp-content/uploads/2016/10/13-twitter-logo-vector-png-free-cliparts-that-you-can-download-to-you-Km878c-clipart.png" class="logo"></img>
                    <div><Link to="/profile"><button class="buttons3" name="back" style={{ marginTop: "30px", marginLeft: "5px", width: "70px", height: "35px" }} >Back</button></Link></div>
                                       
                    <div className="">
                        <div className="elements2">
                            <h3 class="label">Edit Your Profile</h3>
                            <h6 class="label">{this.state.authFlag}</h6>
                            <br />
                        </div>
                        <div class="">
                            <br/>
                                <div class="elements">
                                    <span class="label">Profile Image</span>
                                    <img id="img" src={this.state.profileimage} alt="Avatar" style={{ width: "200px", height: "200px", borderRadius: "50%" }}></img>
                                    <input type="file" onChange={this.ImageChange} style={{ textAlign: "center", margin: "auto" }} name="pic" accept="image/*"></input>
                                    </div>
                            </div>
                        <div class="">
                        <br/>
                            <div class="elements">
                                <span class="label">First Name</span>
                                <input class="form-control1 elements1" value={this.state.fname} pattern="[A-Za-z]*" type="text" name="fname" onChange={this.fnameChangeHandler} required></input>
                            </div>
                        </div>
                        <div class="">
                            <br />
                            <div class="elements">
                                <span class="label">Last Name</span>
                                <input class="form-control1 elements1" value={this.state.lname} pattern="[A-Za-z]*" type="text" name="lname" onChange={this.lnameChangeHandler}required/>
                            </div>
                            </div>
                        <div class="">
                            <br />
                            <div class="elements">
                                <span class="label">Email</span>
                                <input class="form-control1 elements1" value={this.state.email}  type="email" name="email" onChange={this.emailChangeHandler}required/>
                            </div>
                        </div>
                            <div class="">
                            <br/>
                                <div class="elements">
                                    <span class="label">Bio</span>
                                    <input class="form-control1 elements1" value={this.state.bio} type="text" name="bio" onChange={this.bioChangeHandler}/>
                                </div>
                            </div>
                            <div class="">
                            <br/>
                                <div class="elements" style={{display:"flex"}}>
                                    <div class="inner-element">
                                    <span class="label">City</span>
                                    <input class="form-control1 elements1" value={this.state.city} pattern="[A-Za-z]*\s*[A-Za-z]*" type="text" name="city" onChange={this.cityChangeHandler}/>
                                    </div>
                                    <div class="inner-element">
                                    <span class="label">State</span>
                                    <input class="form-control1 elements1" value={this.state.state} pattern="[A-Z]*||[a-z]*" type="text" name="state" onChange={this.stateChangeHandler}/>
                                    </div>
                                    <div class="inner-element">
                                    <span class="label">Zipcode</span>
                                    <input class="form-control1 elements1" value={this.state.zipcode} pattern="[0-9]{5}-[0-9]{4}||[0-9]{5}" type="text" name="zipcode" onChange={this.zipChangeHandler}/>
                                    </div>
                                </div>
                            </div>
                            <div class="">
                                <br />
                                <button class="button" style={{width:"150px"}}>Save Changes</button>
                                <br /><br />
                            </div>


                        
                    </div>
                </form>
                <br /><br />
            </div>



        )
    }

}

export default editProfile;


