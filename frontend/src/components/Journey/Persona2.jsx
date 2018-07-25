import React from 'react';
import '../../assets/css/journey/persona.css';

import personaMale from '../../assets/images/SadJhon.png';
import personaFemale from '../../assets/images/SadJane.png';

class Persona2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      age: this.props.age,
      isMale: this.props.gender == 'male' ? true : false,
      province: this.props.province
    };
  }

  render() {
    return (
      <div>
        <div className="flex-container">


          <div className="personaLeft">
                        <div className={this.props.gender == "male" ? 'persona1-2-image-div' : 'persona2-1-image-div'}>
                        </div>
          </div>

          <div className="personaRight">

            <div className="personaContent">

              <h1><span className="redUnderline">{this.state.name}</span> feels unwell...</h1>
              <div className="middlefont">
                <p className="justify">
                  {this.props.name} started to feel different a few years ago. {this.state.isMale ? 'He' : 'She'} can't explain why {this.state.isMale ? 'he' : 'she'} feels that way. {this.state.name} has a hard time sleeping, {this.state.isMale ? 'he' : 'she'} has little energy, low self-esteem and lost {this.state.isMale ? 'his' : 'her'} appetite.
                {/* For some years now, {this.props.name} has had a strange feeling. {this.state.isMale ? 'He' : 'She'} cannot explain why {this.state.isMale ? 'he' : 'she'} feels that way. Most of the time, {this.state.isMale ? 'he' : 'she'} can hardly sleep, has little energy, low self-esteem and does not eat much. */}
                  {/* // For some years now, {this.props.name} has had a <span className="bold">strange feeling.</span> {this.state.isMale ? 'He' : 'She'} cannot explain why {this.state.isMale ? 'he' : 'she'} feels that way. Most of the time, {this.state.isMale ? 'he' : 'she'} can hardly sleep, has little energy, low self-esteem and does not eat much. */}
                </p>

                <p>{this.props.name} suffers from <span className="red bold">dysthymia</span>.</p>
                <p className="justify">
                  After a while, {this.props.name} started feeling worse. Although {this.state.isMale ? 'he' : 'she'} didn't like this feeling, {this.state.isMale ? 'he' : 'she'} thought it wouldn't last and didn't talk or complain about it.
                {/* 's state deteriorated over time before {this.state.isMale ? 'he' : 'she'} felt as {this.state.isMale ? 'he' : 'she'} does today. When this feeling started occuring, {this.state.isMale ? 'he' : 'she'} thought it would not last, so {this.state.isMale ? 'he' : 'she'} did not complain about it. */}
                </p>
                <p className="red bold">
                  Is that really the case?
              </p>
              </div>
              <p>
                <button type="button" className="redButtonLink" onClick={() => this.props.prev()}>
                  <i className="fa fa-angle-left bold"></i> Go back
                </button> <button type="button" className="redButtonLink" onClick={() => this.props.next()}>
                  Continue <i className="fa fa-angle-right bold"></i>
                </button>
              </p>


            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Persona2;
