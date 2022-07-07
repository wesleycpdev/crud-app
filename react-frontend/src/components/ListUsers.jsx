import React, { Component } from 'react'
import UsersService from '../services/UsersService'

class ListUsers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }
        this.addUser = this.addUser.bind(this)
        this.editUser = this.editUser.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.deslogar = this.deslogar.bind(this)
    }

    deleteUser(id) {
        UsersService.deleteUser(id).then(res => {
            this.setState({ users: this.state.users.filter(user => user.id !== id) })
        });
    }
    editUser(id) {
        this.props.history.push(`/add-user/${id}`)
    }

    componentDidMount() {
        UsersService.getUsers().then((res) => {
            this.setState({ users: res.data })
        });
    }

    addUser() {
        this.props.history.push('/add-user/_add')
    }

    deslogar() {
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <h2 className="text-center mt-4">Lista de Usuários</h2>

                <div className="row d-flex justify-content-between">
                    <button className="btn btn-primary" onClick={this.addUser}>Adicionar</button>
                    <button className="btn btn-danger" onClick={this.deslogar}>Deslogar</button>
                </div>

                <div className="row mt-4">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Senha</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.users.map(
                                    user =>
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.password.replace(/./img, '*')}</td>
                                            <td>
                                                <button onClick={() => this.editUser(user.id)} className="btn btn-info">Editar</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteUser(user.id)} className="btn btn-danger">Excluir</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListUsers
