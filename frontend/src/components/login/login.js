import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            authFlag: "",
            msg: "",
        }

        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);

    }
    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    submitLogin = (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(data);
        axios.defaults.withCredentials = true;
        axios.post('/users/login', data)
            .then((response) => {
                console.log("response"+response)
               
                sessionStorage.setItem("username",response.data.userName)
                sessionStorage.setItem("name",response.data.firstName)

                localStorage.setItem("email",response.data.email)
                localStorage.setItem("username",response.data.userName)
                if (response.status === 200) {
                    this.setState({
                        authFlag: true
                    })
                }
                else {
                    this.setState({ msg: "Invalid Credentials" });
                }
            })
            .catch((err) => {
                this.setState({
                    authFlag: false,
                    msg: "Invalid Credentials",
                })
                console.log("Error messagw", err.response.status);
            });

    }
    render() {
        return (
            <div className = "bodylogin" >

                {this.state.authFlag === true ? <Redirect to="/home" /> : ""}
                <div className="loginnav">
                        <div>
                            <div>
                                <a className="text" aria-hidden="true" href="/launchpage" >
                                    <img src="https://www.alc.edu/wp-content/uploads/2016/10/13-twitter-logo-vector-png-free-cliparts-that-you-can-download-to-you-Km878c-clipart.png" class="logo"></img>
                                    Home
                                </a>
                            </div>
                        </div>
                </div>
                <div><br/>
                <br/><br/><br/>
                    <div className = "loginform">
                        <div >
                            <div >
                                <h4 className="loginlabel" >Log in to Twitter</h4>
                                <p>{this.state.msg}</p>
                            </div>
                            <form name="loginForm" onSubmit={this.submitLogin}>
                                <div >
                                    <div className="logincontainer">
                                        <input name="email" id="email" type="email" placeholder="Email Address" onChange={this.emailChangeHandler} required />
                                    </div>
                                </div> 
                                <div >
                                    <div className="logincontainer" >
                                        <input name="password" id="password" type="password" placeholder="Password" onChange={this.passwordChangeHandler} required />
                                    </div>
                                </div>
                                <form className="buttonContainer">
                                <div >
                                    <button className="loginbutton" type="submit">Log in </button>
                                    <label className="buttonlabel">
                                    </label>
                                    
                                    
                                </div>  
                                </form> 
                            </form>
                            <form className="logininsideContainer">
                                <div>
                                    <p className="logindownfont col-sm-6" > New to Twitter? 
                                    <a className="col-sm-1" href="/signup">Sign up now >> </a>
                                    </p>
                            
                                </div>
                            </form>
                        </div>
        
                    </div>
                </div>
            </div>
        )
    }
}
export default login;