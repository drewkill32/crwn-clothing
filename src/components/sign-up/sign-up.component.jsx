import React from 'react';


import FormInput from '../form-imput/form-import.component';

import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.util';

import './sign-up.styles.scss';

class SignUp extends React.Component {

    constructor(){
        super();


        this.state = {
            displayName: '',
            email: '',
            password:'',
            comfirmPassword: ''
        }
    }


    handleSubmit = async event => {
        event.preventDefault();
        const {displayName,email, password, comfirmPassword } = this.state;

        if (password !== comfirmPassword){
            alert("passwords don't match");
            return;
        }
        try {
            const {user} = await auth.createUserWithEmailAndPassword(email,password);

            await createUserProfileDocument(user, displayName);

            this.setState({
                displayName: '',
                email: '',
                comfirmPassword: '',
                password:''
            });

        } catch(error){
            console.error(error);
        }
    }


    handleChange = event => {
        const {name, value } = event.target;
        console.log(event.target.name);
        console.log(event.target.value);
        this.setState({[name]: value});
    }

    render(){
        const { displayName,email, password, comfirmPassword } = this.state;
        console.log(comfirmPassword);
        return (<div className='sign-up'>
            <h2 className='title'>I do not have an acconut</h2>
            <span>Signup with your email and password</span>
            <form className='sign-up-from' onSubmit={this.handleSubmit} >
                <FormInput 
                    type='text'
                    value={displayName}
                    name='displayName'
                    onChange={this.handleChange}
                    label='Display Name'
                    required
                />
                <FormInput 
                    type='email'
                    name='email'
                    value={email}
                    onChange={this.handleChange}
                    label='Email'
                    required
                />
                <FormInput 
                    type='password'
                    name='password'
                    value={password}
                    onChange={this.handleChange}
                    label='Password'
                    required
                />
                <FormInput 
                    type='password'
                    name='comfirmPassword'
                    value={comfirmPassword}
                    onChange={this.handleChange}
                    label='Confirm Password'
                    required
                />
                <CustomButton type='submit' >SIGN UP</CustomButton>
            </form>

        </div>)

    }
    
}

export default SignUp;

