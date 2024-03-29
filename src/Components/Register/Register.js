import React from 'react';

class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            message: ''
        }
    }
    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }
    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }
    checkEmail = () => {
        if(this.state.email === ''){
            this.setState({message: 'Please enter an email'})
            return false;
        } else if (!(this.state.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))){
            this.setState({message: 'Please enter a valid email'})
            return false;
        }
        return true;
    }
    checkPassword = () => {
        if(this.state.password.length < 8){
            this.setState({message: 'Password must be longer than eight characters'})
            return false;
        }
        return true;
    }
    checkUsername = () => {
        if(this.state.name === ''){
            this.setState({message: 'Please enter a username'})
            return false;
        }
        return true;
    }
    onSubmitSignIn = () => {
        if(this.checkUsername() && this.checkEmail() && this.checkPassword()){
            fetch('https://rocky-refuge-82156.herokuapp.com/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email:this.state.email,
                    password: this.state.password,
                    name: this.state.name
                })
            }).then(response => response.json())
            .then(user => {
                if (user.id){
                    this.props.loadUser(user)
                    this.props.onRouteChange('home');
                }
            })
        }
        
    }
    render(){
    return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Username</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="text" 
                        name="name"  
                        id="name"
                        onChange={this.onNameChange}
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email-address"  
                        id="email-address"
                        onChange={this.onEmailChange}
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" 
                        name="password"  
                        id="password"
                        onChange={this.onPasswordChange}
                        />
                    </div>
                    </fieldset>
                    <div className="">
                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register"
                            onClick={this.onSubmitSignIn}/>
                    </div>
                    <div>
                        <p>{this.state.message}</p>
                    </div>
                </div>
            </main>
        </article>
    )
    }
}

export default Register;