import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Unauthorized.scss'

function Unauthorized({ used }) {
    const navigate = useNavigate()
    return (
        <div className='unauthorized'>
            <h1>Unauthorized - You are not the author of this {used}.</h1>
            <Button className='disable-hover text-black bold' onClick={() => navigate(-1)}>Go Back!</Button>
        </div>
    )
}

export default Unauthorized