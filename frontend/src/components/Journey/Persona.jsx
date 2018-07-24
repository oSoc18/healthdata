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
              {/* {this.state.isMale ? 'He' : 'She'} */}
              <p className="justify">
                For some years now, John has had a strange feeling. He cannot explain why he feels that way. Most of the time, he can hardly sleep, has little energy, low self-esteem and does not eat much.
              </p>
              <p>John suffers from <span className="red bold">dysthymia</span>.</p>
              <p className="justify">
                John’s state deteriorated over time before he feltas he does today. When this feeling started occuring, he thought it would not last, so he did not complain about it.
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
