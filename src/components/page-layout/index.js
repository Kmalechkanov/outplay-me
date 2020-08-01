import React from 'react'
import styles from './index.module.css'

const PageLayout = (props) => {
    return (
        <div>
            <header>
                <h1>Header</h1>
            </header>

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