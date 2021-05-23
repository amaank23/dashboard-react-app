import React from 'react'
import CountUp from 'react-countup';
function TextWidget(props) {
    return (
        <div className="widget_Wrapper">
            
            <div className="widget-heading">{props.heading}</div>
            <h2 className="widget-value"><CountUp start={0} end={props.value} /></h2>
        </div>
    )
}

export default TextWidget
