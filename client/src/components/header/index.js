import React from 'react'
import styles from './index.module.css'
import getNavigation from '../../utils/navigation'
import UserContext from '../../Context'
import logo from '../../svgs/logo.svg'
import Line from '../line'
import Href from '../href'
import Button from '../button'
import Logout from '../logout'

class Header extends React.Component {
    static contextType = UserContext

    render() {
        const {
            user
        } = this.context

        const navigations = getNavigation(user)

        return (
            <header>
                <div className={styles['app-header']}>
                    <img src={logo} className='app-logo animation' alt='logo' />
                    <nav className={styles['flex-nav']}>
                        {
                            navigations.map(navEl => {
                                if (navEl.custom) {
                                    if (navEl.title == 'LogOut') {
                                        return (
                                            <Logout link='/' key={navEl.title} />
                                        )
                                    }

                                }

                                return (
                                    <Href key={navEl.title} title={navEl.title} link={navEl.link} />
                                )
                            })
                        }
                    </nav>
                </div>
                <Line />
            </header>
        )
    }
}

export default Header