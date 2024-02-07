import { Button } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { useState } from 'react';

const WishlistButton = () => {
    const [added, setAdded] = useState(false);
    const onClick = () => {
        setAdded(!added);
    }
    const style1 = {
        position: 'absolute',
        borderRadius: '8px',
        right: '3px',
        top: '3px',
        width: '30px',
        height: '30px',
        backgroundColor: 'rgb(255, 255, 255)',
        color: '#b55d51',
    };

    const style2 = {
        position: 'absolute',
        borderRadius: '8px',
        right: '3px',
        top: '3px',
        width: '30px',
        height: '30px',
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(141 141 141)',
    }

    return (
        <Button type="primary" shape="circle" icon={<HeartFilled />} onClick={onClick} style={added ? style1 : style2} />
    );
};

export default WishlistButton;