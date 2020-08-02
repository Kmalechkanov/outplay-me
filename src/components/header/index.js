import React, { Component } from 'react'
import styles from './index.module.css'
import getNavigation from '../../utils/navigation'
import UserContext from '../../Context'
import logo from '../../svgs/logo.svg'
import Line from '../line'
import Href from '../href'

class Header extends Component {
    static contextType = UserContext

    render() {
        const {
            user
        } = this.context

        const links = getNavigation(user)

        return (
            <header>
                <div className={styles['app-header']}>
                    <img src={logo} className='app-logo animation' alt='logo' />
                    <nav className={styles['flex-nav']}>
                        {
                            links.map(navEl => {
                                return (
                                    <Href key={navEl.title} title={navEl.title} link={navEl.link}/>
                                )
                            })
                        }
                    </nav>
                </div>
                <Line/>
            </header>
        )
    }
}

export default Header