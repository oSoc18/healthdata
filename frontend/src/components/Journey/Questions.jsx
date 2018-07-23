import React from 'react';
import '../../assets/css/journey/questions.css';
import { Link } from 'react-router-dom';


class Questions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value1: 27, // age
      value2: 'male', // gender
      value3: 'brussels' // location
    };
  }

  NextScreenAndSendData() {
    this.props.onClick(this.state.value1, this.state.value2, this.state.value3);
  }

  updateVal1(val) {
    if (val <= 0 || val >= 121) this.setState({ value1: 27 });
    else this.setState({ value1: val });
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
                Before we start, we just need you to fill in some simple questions.
                Don't worry,
                <span className="red bold"> this won't take long! </span>
                And it will make the journey much more personal ;)
              </p>
              <div className="flex-container firsttwoQuestions">
                <div>
                  <div>
                    <label htmlFor="inp1">What's your age?</label>
                    <br />
                    <input type="number" id="inp1" defaultValue="0" min="0" max="120" onChange={(event) => this.updateVal1(event.target.value)} />
                  </div>
                </div>
                <div>
                  <label htmlFor="inp2">
                    What's your gender?
                  </label>
                  <br />
                  <select id="inp2" onChange={(event) => this.updateVal2(event.target.value)}>
                    <option value="null">Won't say</option>
                    <option value="male">Male</option>
                    <option value="female`">Female</option>
                  </select>
                </div>
              </div>
              <div className="thirdQuestion">
                <label htmlFor="inp3">In what province do you live?</label>
                <br />

                <select id="inp3" onChange={(event) => this.updateVal3(event.target.value)}>
                  <option value="null">Won't say</option>
                  <option value="antwerp">Antwerp</option>
                  <option value="oost-vlaanderen">East Flanders</option>
                  <option value="vlaams brabant">Flemish Brabant</option>
                  <option value="limburg">Limburg</option>
                  <option value="west-vlaanderen">West Fladers</option>
                  <option value="liege">Liege</option>
                  <option value="hainout">Hainaut</option>
                  <option value="luxembourg">Luxembourg</option>
                  <option value="namur">Namur</option>
                  <option value="Brabant Wallon">Walloon Brabant</option>
                  <option value="brussels">Brussels</option>
                </select>
                <p>
                  <button id="continue_button" className="redButtonLink" onClick={() => this.NextScreenAndSendData()}>Start your journey <i className="fa fa-angle-right bold"></i></button>
                </p>

              </div>


            </div>

          </div>
          <div className="questionsRight">
            An image will come here.
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
