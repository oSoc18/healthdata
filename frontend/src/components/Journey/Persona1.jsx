import React from 'react';
import '../../assets/css/journey/persona.css';

class Persona1 extends React.Component {

    render() {
        return (
            <div>
                <div className="flex-container">
                    <div className="personaLeft">

                    </div>
                    <div className="personaRight">
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
                                <p>
                                    <button type="button" className="redButtonLink" onClick={() => this.props.prev()}>
                                        <i className="fa fa-angle-left bold"></i> Go back
                                    </button> <button type="button" className="redButtonLink" onClick={() => this.props.next()}>
                                        Continue <i className="fa fa-angle-right bold"></i>
                                    </button>
                                </p>
                            </p>
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}



export default Persona1;
