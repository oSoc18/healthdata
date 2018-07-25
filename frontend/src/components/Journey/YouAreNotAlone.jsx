import React from 'react';
import '../../assets/css/journey/youAreNotAlone.css';
import personaImg from '../../assets/images/Jonathan.jpg';


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
<<<<<<< HEAD
      <div>
        <div className="journey_content" style={{ textAlign: 'center' }}>
          <h1>{this.state.name} is not alone, and neither are you.</h1>
          <p>
            “The American National Mental Health Association says that more than 80% of people who get treatment say it helps. If you stick with it, the odds are very good that you will feel better.”
          </p>
          <p>
            <a href="http://be.brussels/vivre-a-bruxelles/famille-et-vie-privee/aide-aux-personnes-et-aux-familles/aide-psychologique">Here</a>
            , you will find the support which suits you best, depending on your will and where you live in Belgium.
          </p>
          <button type="button" className="redButtonLink" onClick={() => this.props.onClick()}>Continue</button>
=======
      <div className="flex-container">
        <div className="notAloneBg">
          <img src={personaImg} alt="img of logo" />
        </div>
        <div>
          <div className="notAloneContent">
            <div>
              <h1>{this.state.name} is not <br /><span className="redUnderline">alo</span>ne though, AND NEITHER ARE U!!</h1>
              <p>
                “The American National Mental Health Association says that more than 80% of people who get treatment say it helps. If you stick with it, the odds are very good that you will feel better.”
              </p>
              <p>
                <a href="http://be.brussels/vivre-a-bruxelles/famille-et-vie-privee/aide-aux-personnes-et-aux-familles/aide-psychologique">Here</a>
                , you will find the support which suits you best, depending on your will and where you live in Belgium.
              </p>
            </div>
          </div>
>>>>>>> 5b6f7cc528595541c6aac398ae1cb6ceea09dd95
        </div>

      </div>

    );
  }
}


export default YouAreNotAlone;
