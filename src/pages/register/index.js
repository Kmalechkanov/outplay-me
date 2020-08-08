import React from 'react'
import Input from '../../components/input'
import PageLayout from '../../components/page-layout'
import UserContext from '../../Context'
import authenticate from '../../utils/authenticate'
import { render } from '@testing-library/react'

import { UserAPIUrl } from '../../Constants'

class Register extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            email: "",
            password: "",
            rePassword: "",
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
            email,
            password
        } = this.state

        await authenticate(UserAPIUrl + 'signup', {
            username,
            email,
            password
        }, (user) => {
            this.context.logIn(user)
            this.props.history.push('/')
        }, (e) => {
            this.state.error = e.message.message
            console.log('Error', e)
            this.render()
        })
    }

    render() {
        const {
            username,
            email,
            password,
            rePassword,
            error
        } = this.state

        return (
            <PageLayout>
                <form onSubmit={this.handleSubmit}>
                    {/* <Title title="Register" /> */}
                    <p>{
                        this.state.error
                    }</p>
                    <Input
                        value={username}
                        onChange={(e) => this.onChange(e, 'username')}
                        label="Username"
                        id="username"
                    />
                    <Input
                        value={email}
                        onChange={(e) => this.onChange(e, 'email')}
                        label="Email"
                        id="email"
                    />
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => this.onChange(e, 'password')}
                        label="Password"
                        id="password"
                    />
                    <Input
                        type="password"
                        value={rePassword}
                        onChange={(e) => this.onChange(e, 'rePassword')}
                        label="Re-Password"
                        id="re-password"
                    />
                    <button>Register</button>
                    {/* <Button type="submit" onClick={this.handleSubmit}>Register</Button> */}
                </form>
            </PageLayout >
        )
    }
}

export default Register