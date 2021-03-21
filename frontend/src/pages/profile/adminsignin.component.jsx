import React from 'react'
import styled from 'styled-components';
import axios from 'axios'
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login , register , AdminLogin} from "../../redux/user/user.actions.js"

const SignInSignUpContainer = styled.div`
    display: flex;
    ${'' /* justify-content: center; */}
`;

const WelcomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    flex: 2;
    color: #fff;
    justify-content: center;
    align-items: center;
    background-color: #39AF9B;
`;

const SignInSignUpBox = styled.div`
    display: flex;
    height: 100vh;
    flex: 3;
    background-color: #fff;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SignInSignUpButton = styled.button`
    display: inline-block;
    width: 200px;
    height: 50px;
    background-color: ${props => props.isSignUpBox ? "#39AF98" : "transparent"};
    color: #fff;
    border: 2px solid #fff;
    border-radius: 20px;
    font-size: 20px;
`;

const WelcomeLine = styled.h1`
    font-size: 40px;
    color: ${props => props.isSignUpBox ? "#39AF98" : "#fff" } 
`;

const WelcomeParagraph = styled.div`
    display: flex;
    justify-content: center;
    font-size: 20px;
    margin-bottom: 40px;
`;

const FormContainer = styled.div`
    ${'' /* margin-left: 100px; */}
`;

const FormInputContainer = styled.input`
    width: 400px;
    display: block;
    height: 45px;
    background-color: #f0f0f0;
    border: none;
    margin-bottom: 15px;
`;

class AdminSignIn extends React.Component {
    state = {
        isSignUp: true,
        loading: false,
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        username: "",
    }

    handleChange = (isSignUp) => {
        // console.log(isSignUp);
        this.setState({isSignUp: !isSignUp} , () => {console.log(this.state.isSignUp)})
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { dispatch , history} = this.props;
        const {email , firstname , lastname , password , username} = this.state;
        this.state.isSignUp ?
        // console.log(user);
        dispatch(register(username , firstname , lastname , email , password)).then(() => {
            console.log("Succesfulel")
        }).catch(() => {
            console.log("error");
        }) : 
        console.log("printing");
        const self = this;
        dispatch(AdminLogin(username , password)).then(() => {
            self.props.history.push("/");
            // window.location.reload();
        }).catch(() => {
            console.log("login failed")
        })  
    }

    onChange = event => {
        // console.log(event.target.value);
        const {name  , value} = event.target;
        this.setState({[name]: value} , () => console.log(this.state));
    }



    render() {
        // console.log(this.state.isSignUp);
        return(
            <SignInSignUpContainer>
                <WelcomeContainer>
                    <WelcomeLine>Welcome Back</WelcomeLine>
                    <WelcomeParagraph>To see your details please <br/>
                    login with your personal info
                    </WelcomeParagraph>
                    <SignInSignUpButton isSignUpBox={true} onClick={() => this.handleChange(this.state.isSignUp)}>{this.state.isSignUp ? "Sign In" : "Sign Up" }</SignInSignUpButton>
                </WelcomeContainer>
                <SignInSignUpBox>
                <WelcomeLine isSignUpBox={true}>{this.state.isSignUp ? "Create Account" : "Welcome"}</WelcomeLine>
                <FormContainer>
                <form onSubmit={this.handleSubmit}>
                   {this.state.isSignUp ?  <FormInputContainer onChange={this.onChange} type="text" name="firstname" placeholder="First Name"></FormInputContainer> : null} 
                   {this.state.isSignUp ?  <FormInputContainer type="text" name="lastname" onChange={this.onChange} placeholder="lastName"></FormInputContainer> : null} 
                     <FormInputContainer type="text" name="username" onChange={this.onChange} placeholder="username"></FormInputContainer> 
                   {this.state.isSignUp ? <FormInputContainer type="email" name="email" onChange={this.onChange} placeholder="Email"></FormInputContainer> : null } 
                    <FormInputContainer type="password" name="password" onChange={this.onChange} placeholder="Password"></FormInputContainer>
                     <SignInSignUpButton type="submit" isSignUpBox={true}>{this.state.isSignUp ? "Sign Up" : "Sign In"}</SignInSignUpButton>
                </form>
                </FormContainer>
                </SignInSignUpBox>
            </SignInSignUpContainer>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.user,
    message: state.message,
})

export default connect(mapStateToProps)(AdminSignIn);