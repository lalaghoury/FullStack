import React, { useEffect } from 'react'
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Spinner.scss'

function Spinner() {
    const navigate = useNavigate()
    const [count, setCount] = React.useState(3);

    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => {
                setCount(count - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            navigate('/login', { replace: true });
        }
    }, [count, navigate]);
    return (
        <div className='spin'>
            <h2>Access Denied, Kindly Login to continue <br /> Redirecting you to Login page in {count} seconds</h2>
            <Spin />
        </div>
    )
}

export default Spinner