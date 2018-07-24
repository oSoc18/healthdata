import React from 'react';
import '../../assets/css/journey/persona.css';
import Timeline from './Timeline';

class Persona extends React.Component {
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
          <div className="personaLeft"></div>
          <div className="personaRight">
            <Timeline />
            <div className="personaContent">

              <h1><span className="redUnderline">{this.state.name}</span> feels unwell</h1>
              
              <p className="justify">
                For some years now, {this.props.name} has had a strange feeling. {this.state.isMale ? 'He' : 'She'} cannot explain why {this.state.isMale ? 'he' : 'she'} feels that way. Most of the time, {this.state.isMale ? 'he' : 'she'} can hardly sleep, has little energy, low self-esteem and does not eat much.
              </p>
              <p>{this.props.name} suffers from <span className="red bold">dysthymia</span>.</p>
              <p className="justify">
                {this.props.name}'s state deteriorated over time before {this.state.isMale ? 'he' : 'she'} felt as {this.state.isMale ? 'he' : 'she'} does today. When this feeling started occuring, {this.state.isMale ? 'he' : 'she'} thought it would not last, so {this.state.isMale ? 'he' : 'she'} did not complain about it.
              </p>
              <p className="red bold">
                Is that really the case?
              </p>
              <p>
                <button type="button" className="redButtonLink">
                  <i className="fa fa-angle-left bold"></i> previous chapter 
                </button> <button type="button" className="redButtonLink" onClick={() => this.props.onClick()}>
                  next chapter <i className="fa fa-angle-right bold"></i>
                </button>
              </p>


            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Persona;
