import React from 'react'

const Switch = ({bsStyle, onChange, children, checked}) => {
    return (
        <div className="switch">
            <span> {children} </span>
            <label className="switch-box">
                <input type="checkbox" onChange={onChange} checked={checked} />
                <div className={`slider ${bsStyle ? `slider-${bsStyle}`:''}`} />
            </label>
        </div>
    );
};

export default Switch;
