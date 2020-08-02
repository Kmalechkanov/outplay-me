import React, { Component } from 'react'
import styles from './index.module.css'
import getNavigation from '../../utils/navigation'
import UserContext from '../../Context'
import logo from '../../svgs/logo.svg'

class Header extends Component {
    static contextType = UserContext

    render() {
        const {
            user
        } = this.context

        const links = getNavigation(user)

        return (
            <header className={styles['App-header']}>
                {console.log('styles', styles)}
                <img src={logo} className='App-logo Animation' alt="logo" />
                <nav className={styles['Flex-nav']}>
                    {
                        links.map(navEl => {
                            return (
                                <li key={navEl.title}>
                                    <a>{navEl.title}</a>
                                    <a>{navEl.link}</a>
                                </li>
                            )
                        })
                    }
                </nav>
            </header>
        )
    }
}

export default Header