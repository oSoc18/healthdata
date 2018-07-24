import React from 'react';
import '../../assets/css/journey/persona.css';
import Timeline from './Timeline';

class WhatIsDepression extends React.Component {

    render() {
        return (
            <div>
                <div className="flex-container">
                    <div className="personaLeft">

                    </div>
                    <div className="personaRight">
                        <Timeline />
                        <div className="personaContent">
                            <h1>What is depression?</h1>
                            <p>
                                Depression is a common mental illness. Depression causes severe symptoms that affect how you feel, think, and handle daily activities, such as sleeping, eating, or working.
                                Depression causes feelings of sadness and/or a loss of interest in activities you once enjoyed.
                            </p>
                            
                            <p>
                                <button className="redButtonLink" onClick={() => this.props.onClick()}>Continue</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}



export default WhatIsDepression;
