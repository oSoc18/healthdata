import React from 'react';
import '../../assets/css/journey/persona.css';

//import personaMale from '../../assets/images/HappyJohn.png';
//import personaFemale from '../../assets/images/HappyJane.png';

class Persona1 extends React.Component {

    render() {
        return (
            <div>
                <div className="flex-container">
                    <div className="personaLeft">
                        <div className={this.props.gender == "male" ? 'persona1-image-div' : 'persona2-image-div'}>
                        </div>
                    </div>
                    <div className="personaRight">
                        <div className="personaContent">
                            <span className="central"><h1><span className="redUnderline">Me</span>et {this.props.name}...</h1></span>
                            <div className="middlefont">
                                <p>
                                    {this.props.name} is a(n) <span className="bold red">{this.props.age}</span> year old
                                    {this.props.gender == "male" ? " man" : " woman"} living in <span className="red bold capitalize">{this.props.province}</span>.
                                    {this.props.gender == "male" ? " He" : " She"} enjoys the little things in life. {this.props.gender == "male" ? " He" : " She"} loves to cook, go to the cinema and having friends over for dinner or drinks.
                                </p>
                                <p>
                                    However things changed a few years ago...
                                </p>
                            </div>

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
