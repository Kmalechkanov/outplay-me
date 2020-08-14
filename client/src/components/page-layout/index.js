import React from 'react'
import styles from './index.module.css'
import Header from '../header'

const PageLayout = (props) => {
    return (
        <div>
            <Header>Test</Header>

            <div>
                {props.children}
            </div>

            <footer>
                Footer
            </footer>
        </div>
    )
}

export default PageLayout