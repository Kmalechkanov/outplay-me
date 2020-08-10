import React from 'react'
import Input from '../../components/input'
import Title from '../../components/title'
import Button from '../../components/button'
import BoxForm from '../../components/box-form'
import UserContext from '../../Context'
import authenticate from '../../utils/authenticate'
import PageLayout from '../../components/page-layout'

import { UserAPIUrl } from '../../Constants'


class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: ""
        }
    }

    static contextType = UserContext

    onChange = (event, type) => {
        const newState = {}
        newState[type] = event.target.value

        this.setState(newState)
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const {
            username,
            password
        } = this.state

        await authenticate(UserAPIUrl + 'signin', {
            username,
            password
        }, (user) => {
            this.context.logIn(user)
            this.props.history.push('/')
        }, (e) => {
            if (e.message.message != undefined) {
                this.state.error = e.message.message
            }
            else {
                this.state.error = e.message
            }

            this.forceUpdate()
        })
    }

    render() {
        const {
            username,
            password,
            error
        } = this.state

        return (
            <PageLayout>
                <BoxForm body={
                    <form onSubmit={this.handleSubmit}>
                        <Title title="Login" />
                        <p>{
                            this.state.error
                        }</p>
                        <Input
                            value={username}
                            onChange={(e) => this.onChange(e, 'username')}
                            label="Username"
                            id="username"
                            required
                        />
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => this.onChange(e, 'password')}
                            label="Password"
                            id="password"
                            required
                        />
                        <Button text="Login"></Button>
                    </form>
                } />
            </PageLayout >
        )
    }
}

export default Login