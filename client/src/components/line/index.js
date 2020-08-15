import React from 'react'
import styled from 'styled-components'

const Line = () => {
    
    return (
        <>
            <FirstHr/>
            <SecondHr/>
        </>
    )
}

// todo: Make it reusable.

const FirstHr = styled.hr`
    width: 100%;
    height: 15px;
    background: #13315C;
    border: none;
    margin: 0;
`

const SecondHr = styled.hr`
    width: 100%;
    height: 15px;
    background: #0B2545;
    border: none;
    margin: 0;
`

export default Line