import React from 'react'
import './CookiesPage.scss'

import { Typography } from 'antd';

const { Title, Paragraph } = Typography;
const CookiesPage = () => {

    return (
        <div className="cookies-page">
            <Title level={1}>Cookies Policy</Title>
            <Paragraph>
                Our website uses cookies to improve your experience. By continuing to use our website, you agree to their use.
            </Paragraph>
            {/* Add more content about your cookies policy here */}
        </div>
    );
}

export default CookiesPage