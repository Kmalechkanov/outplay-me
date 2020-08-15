import React, { useContext } from 'react'
import styles from './index.module.css'
import getNavigation from '../../utils/navigation'
import UserContext from '../../Context'
import logo from '../../svgs/logo.svg'
import Line from '../line'
import Href from '../href'
import Button from '../button'
import Logout from '../logout'

const Header = () => {
    const {user, logOut} = useContext(UserContext)

    const navigation = getNavigation(user)
    return (
        <header>
            <div className={styles['app-header']}>
                <img src={logo} className='app-logo animation' alt='logo' />
                <nav className={styles['flex-nav']}>
                    {
                        navigation.map(element => {
                            return (
                                <Href key={element.title} title={element.title} link={element.link} />
                            )
                        })
                    }
                    {user.loggedIn && 
                        <Logout link={'/login'} event={logOut}/>
                    }
                </nav>
            </div>
            <Line />
        </header>
    )
}

export default Header