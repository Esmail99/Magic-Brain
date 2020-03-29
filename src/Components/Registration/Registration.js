import React from 'react';

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerEmail: '',
            registerPassword: '',
            registerUsername: '',
            checkError: false
        }
    }
    
    onEmailChange = (event) => {
        this.setState({ registerEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ registerPassword: event.target.value })
    }

    onUsernameChange = (event) => {
        this.setState({ registerUsername: event.target.value })
    }

    onRegisterClick = (event) => {
        event.preventDefault();
        fetch('https://evening-savannah-93967.herokuapp.com/register/',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                name: this.state.registerUsername,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.id) {
                this.props.loadUser(data);
                this.props.changeRoute('home');
            } else {
                this.setState({ checkError: true });
            }
        })
    }

    render() {
        return(
            <div>
                <h1 className='f1 garamond mb5 light-red'>FACE DETECTION APP</h1>
                <article className="br3 ba white b--white-90 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
                    <main className="pa4 white">
                        <form className="measure" onSubmit={this.onRegisterClick}>
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f2 fw6 ph0 mh0">Registration</legend>
                                {
                                    this.state.checkError === true
                                    ? <p className='f5 underline calisto light-red'>Unable To Register..</p>
                                    : <span></span>
                                }
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">First Name</label>
                                    <input 
                                        onChange={ this.onUsernameChange }
                                        className="pa2 input-reset ba bg-transparent hover-bg-black b--white-90 hover-white w-100" 
                                        type="text" 
                                        name="name"  
                                        id="name" 
                                        required
                                    />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input 
                                        onChange={ this.onEmailChange }
                                        className="pa2 input-reset ba bg-transparent hover-bg-black b--white-90 hover-white w-100" 
                                        type="email" 
                                        name="email-address" 
                                        id="email-address"
                                        required 
                                    />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input 
                                        onChange={ this.onPasswordChange }
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black b--white-90 hover-white w-100" 
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        required
                                    />
                                </div>
                            </fieldset>
                            <div>
                                <input 
                                    className="b ph2 pv2 input-reset ba b--transparent bg-red br3 white-90 grow pointer f4 dib garamond" 
                                    type="submit" 
                                    value="Register"
                                />
                            </div>
                        </form>
                    </main>
                </article>
            </div>
        );
    }
}

export default Registration;