import React, { Component } from 'react'
import UsersService from '../services/UsersService'

const login = {
    email: "admin@admin.com",
    password: "admin"
}

class Login extends Component {
    constructor(props) {
        super(props)

        this.stateStatus = {
            
        }

        this.tryLogin = this.tryLogin.bind(this)

        this.state = {
            email: '',
            password: '',
            ok: 'null'
        }

        this.changeEmailHandler = this.changeEmailHandler.bind(this)
        this.changePasswordHandler = this.changePasswordHandler.bind(this)
    }

    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value })
    }

    changePasswordHandler = (event) => {
        this.setState({ password: event.target.value })
    }

    tryLogin() {
        if (this.state.email == login.email && this.state.password == login.password) {
            this.setState({ ok: 'true' })
            this.props.history.push('/users')
        } else {
            this.setState({ ok: 'false' })
        }
    }

    render() {
        return (
            <div className='text-center d-flex justify-content-center align-items-center mt-5 mh-100'>
                <div className="form-signin">
                    <img className="mb-4" src="https://cdn.discordapp.com/attachments/952940847022882906/994733589319139394/unknown.png" alt="" width="100" height="100" />

                    <h1 className="h3 mb-3 font-weight-normal">Acesse sua conta</h1>

                    {
                        this.state.ok == 'false'
                        ?
                        <div class="alert alert-danger" role="alert">
                            Usuário ou senha inválido!
                        </div>
                        :
                        <div></div>
                    }

                    

                    <input type="email" id="inputEmail" className="form-control mb-3"
                     placeholder="Email" value={this.state.email} onChange={this.changeEmailHandler} required autofocus />

                    <input type="password" id="inputPassword" className="form-control" 
                    placeholder="Senha" value={this.state.password} onChange={this.changePasswordHandler} required />

                    <div className="checkbox my-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Nunca mais deslogar
                        </label>
                    </div>

                    <button className="btn btn-lg btn-primary btn-block" onClick={this.tryLogin}>Entrar</button>

                    <p className="mt-5 mb-3 text-muted">&copy; 2025</p>
                </div>
            </div>
        )
    }
}

export default Login