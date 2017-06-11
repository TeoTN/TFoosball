import React from 'react'

const OrBall = () => {
    return (
        <div style={{width: '100%', display: 'block', position: 'relative', margin: '40px 0'}}>
            <span style={{
                display: 'block',
                background: 'white',
                width: '100px',
                height: '4px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: '10',
            }}/>
            <span style={{
                display: 'block',
                background: 'white',
                borderRadius: '24px',
                width: '48px',
                height: '48px',
                margin: '0 auto',
                textAlign: 'center',
                lineHeight: '48px',
                zIndex: '11',
                position: 'relative'
            }} className="text-primary">OR</span>
        </div>
    );
};

export default OrBall;
