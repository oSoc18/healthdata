import React from 'react';
import '../../assets/css/journey/youAreNotAlone.css';
import { Link } from 'react-router-dom';

import personaImage from '../../assets/images/Message_Picture@2x.png';


class YouAreNotAlone extends React.Component {
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
      <div className="flex-container">
        <div className="notAloneBg">
            <img src={personaImage} alt="You are not alone message" width="408" height="530" />
        </div>


        <div>
          <div className="notAloneContent">
            <div>
              <h1>{this.state.name} is not <br />alone, and neither are <span className="redUnderline">you</span></h1>
              <p className="lineheight-last-text">
                “The American National Mental Health Association says that more than 80% of people who get treatment say it helps. If you stick with it, the odds are very good that you will feel better.”
              </p>
              <p className="support-text">
                Here, you will find the support which suits you best, depending on your will and where you live in Belgium.
              </p>

              <a href="http://be.brussels/vivre-a-bruxelles/famille-et-vie-privee/aide-aux-personnes-et-aux-familles/aide-psychologique" className="lineheight-last-text button-text bold go-to-button">Find support here</a>
            </div>
          </div>
        </div>

      </div>

    );
  }
}


export default YouAreNotAlone;
