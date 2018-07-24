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
                            <h1><span className="redUnderline">Me</span>et {this.props.name}</h1>
                            <p>
                                John is a <span className="bold red">{this.props.age}</span> year old man living in 
                                {this.props.gender == "male" ? "man" : "woman"} living in <span className="red bold">{this.props.province}</span>. 
                                {this.props.gender == "male" ? " He" : " She"} enjoys little things in life, he loves to cook, go to the cinema and have friends home for dinner.
                            </p>
                            <p>
                                However things changed a few years ago...
                            </p>

                            <p>
                                <button type="button" className="redButtonLink" onClick={() => this.props.onClick()}>
                                    next chapter <i className="fa fa-angle-right bold"></i>
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}



export default WhatIsDepression;
