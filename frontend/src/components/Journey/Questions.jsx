import React from 'react';
import '../../assets/css/journey/questions.css';

import welcomeImage from '../../assets/images/HithereImage@2x.png';


class Questions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value1: 19, // age
      value2: 'male', // gender
      value3: 'west-vlaanderen', // location
      agegroup: '15-24'
    };
  }

  NextScreenAndSendData() {
    this.props.onClick(this.state.value1, this.state.value2, this.state.value3, this.state.agegroup);
  }

  updateVal1(val) {
    if (val == "null") {
      this.setState({ value1: 37 });
      this.setState({ agegroup: "35-44" });
    }
    else {
      this.setState({ value1: parseInt(val.substring(0, 2)) + 3 });
      this.setState({ agegroup: val });
    }
  }

  updateVal2(val) {
    if (val == "null") this.setState({ value2: 'male' });
    else this.setState({ value2: val });

  }

  updateVal3(val) {
    if (val == "null") this.setState({ value3: 'brussels' });
    else this.setState({ value3: val });
  }

  render() {
    return (
      <div>
        <div className="flex-container">
          <div className="questionsLeft">
            <div className="questionsContent">
              <h1>Hi there!</h1>
              <p className="questionsExplenation">
                <div className="smallblack">
                  Before we start, we just need you to <br />fill in some simple questions. Do not worry, none of your data will be stored or used.
                  <br />
                  <span className="red bold"><span className="smallboldred"> This will not take long and it will make the journey more personal. </span></span></div>
                {/* Before starting, we need you to answer some simple questions.
                Don't worry, none of this data will be stored nor used.
              </p>
              <p classname="questionsExplenation">
                This will make your journey more personnal. */}
              </p>
              <div className="flex-container firsttwoQuestions">
                <div>
                  <div>
                    <label htmlFor="inp1">What's your age?</label>
                    <br />
                    <select id="inp1" onChange={(event) => this.updateVal1(event.target.value)}>
                      <option value="15-24">15-24</option>
                      <option value="25-34">25-34</option>
                      <option value="35-44">35-44</option>
                      <option value="45-54">45-54</option>
                      <option value="65-74">65-74</option>
                      <option value="75%2B">75+</option>
                      <option value="null">Won't say</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="inp2">
                    What's your gender?
                  </label>
                  <br />
                  <select id="inp2" onChange={(event) => this.updateVal2(event.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="null">Won't say</option>

                  </select>
                </div>
              </div>
              <div className="thirdQuestion">
                <label htmlFor="inp3">In what province do you live?</label>
                <br />

                <select id="inp3" onChange={(event) => this.updateVal3(event.target.value)}>
                  <option value="west-vlaanderen">West-Vlaanderen</option>
                  <option value="antwerp">Antwerp</option>
                  <option value="oost-vlaanderen">Oost-Vlaanderen</option>
                  <option value="vlaams brabant">Vlaams Brabant</option>
                  <option value="limburg">Limburg</option>
                  <option value="liege">Liege</option>
                  <option value="hainout">Hainout</option>
                  <option value="luxembourg">Luxembourg</option>
                  <option value="namur">Namur</option>
                  <option value="Brabant Wallon">Brabant Wallon</option>
                  <option value="brussels">Brussels</option>
                  <option value="null">Won't say</option>
                </select>
                <p>
                  <button id="continue_button" className="redButtonLink" onClick={() => this.NextScreenAndSendData()}><span className="buttonredsmall">Start your journey</span> <i className="fa fa-angle-right bold"></i></button>
                </p>
              </div>
            </div>

          </div>
          <div className="questionsRight">
            <div className="question-background">
              <img src={welcomeImage} alt="welkom - vragenlijst" width="408" height="562" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // hideOrShowContinueButton() {

  //   if (this.state.value1.length != 0 && this.state.value2.length != 0 && this.state.value3.length != 0) {
  //     document.getElementById("continue_button").style.display = "block"
  //   }
  //   else
  //     document.getElementById("continue_button").style.display = "none";
  // }
}

export default Questions;
