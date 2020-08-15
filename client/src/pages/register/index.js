import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Input from '../../components/input'
import Title from '../../components/title'
import Button from '../../components/button'
import BoxForm from '../../components/box-form'
import PageLayout from '../../components/page-layout'
import UserContext from '../../Context'
import authenticate from '../../utils/authenticate'
import { render } from '@testing-library/react'

import { UserAPIUrl } from '../../Constants'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [error, setError] = useState('')

    const { user } = useContext(UserContext)
    const history = useHistory()


    const registerEvent = async (event) => {
        event.preventDefault()

        await authenticate(UserAPIUrl + 'signup', {
            username,
            email,
            password
        }, (user) => {
            // this.context.logIn(user)
            history.push('/login')
        }, (e) => {
            if (e.message.message != undefined) {
                setError(e.message.message)
            }
            else {
                setError(e.message)
            }
        })
    }


    return (
        <PageLayout>
            <BoxForm body={
                <form>
                    <Title title="Register" />
                    <p>{
                        error
                    }</p>
                    <Input
                        value={username}
                        label="Username"
                        id="username"
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                    <Input
                        value={email}
                        label="Email"
                        id="email"
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        value={password}
                        label="Password"
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        value={rePassword}
                        label="Re-Password"
                        id="re-password"
                        onChange={e => setRePassword(e.target.value)}
                        required
                    />
                    <Button text="Register" onClick={registerEvent}></Button>
                </form>
            } />
        </PageLayout >
    )
}

export default Register