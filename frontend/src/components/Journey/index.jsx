import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Questions from './Questions';
import Persona from './Persona';

import ComparisonProvince from './comparisons/ComparisonProvince';
import ComparisonBelgium from './comparisons/ComparisonBelgium';
import ComparisonPerAgePerProvince from './comparisons/ComparisonPerAgePerProvince';
import ComparisonWomenPerProvince from './comparisons/ComparisonWomenPerProvince';
import ComparisonMenPerProvince from './comparisons/ComparisonMenPerProvince';
import ComparisonSameAgeBelgium from './comparisons/ComparisonSameAgeBelgium';

import WhatIsDepression from './WhatIsDepression';
import YouAreNotAlone from './YouAreNotAlone';

class Journey extends React.Component {
  constructor() {
    super();

    let name = null;
    let age = null;
    let province = null;
    let gender = null;

    this.state = {
      screenDisplayed: 1,
      name: name,
      age: age,
      gender: gender,
      province: province,
      results: "results"
    };
    // console.log(this.state);
  }

  


  receiveDataAndGoNext(age, gender, province) {
    this.setState({ age });
    this.setState({ gender });
    this.setState({ province });
    this.setState({ name: gender === 'male' ? 'John' : 'Vanessa' });

    this.nextScreen();
  }

  nextScreen() {
    this.setState(prevState => ({
      screenDisplayed: prevState.screenDisplayed + 1
    }));
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.state.screenDisplayed === 1 && <Questions onClick={(age, gender, province) => this.receiveDataAndGoNext(age, gender, province)} />}
        {this.state.screenDisplayed === 2 && <WhatIsDepression onClick={() => this.nextScreen()} />}
        {this.state.screenDisplayed === 3 && <Persona onClick={() => this.nextScreen()} age={this.state.age} name={this.state.name} province={this.state.province} gender={this.state.gender} />}

        {this.state.screenDisplayed === 4 && <ComparisonPerAgePerProvince onClick={() => this.nextScreen()} age={this.state.age} name={this.state.name} province={this.state.province} gender={this.state.gender} />}
        {this.state.screenDisplayed === 5 && <ComparisonWomenPerProvince onClick={() => this.nextScreen()} age={this.state.age} name={this.state.name} province={this.state.province} gender={this.state.gender} />}
        {this.state.screenDisplayed === 6 && <ComparisonMenPerProvince onClick={() => this.nextScreen()} age={this.state.age} name={this.state.name} province={this.state.province} gender={this.state.gender} />}

        {this.state.screenDisplayed === 7 && <ComparisonSameAgeBelgium onClick={() => this.nextScreen()} age={this.state.age} name={this.state.name} province={this.state.province} gender={this.state.gender} />}
        {this.state.screenDisplayed === 8 && <ComparisonProvince onClick={() => this.nextScreen()} name={this.state.name} age={this.state.age} province={this.state.province} gender={this.state.gender} />}
        {this.state.screenDisplayed === 9 && <ComparisonBelgium onClick={() => this.nextScreen()} age={this.state.age} name={this.state.name} province={this.state.province} gender={this.state.gender} />}

        {this.state.screenDisplayed === 10 && <YouAreNotAlone onClick={() => this.nextScreen()} name={this.state.name} age={this.state.age} province={this.state.province} gender={this.state.gender} />}
        {this.state.screenDisplayed === 11 && <div>Nothing to show</div>}
        <Footer />


        {
          /* // -% of people with depression from the same age group and same province
        // -% of women with depression in the province
        // -% of men with depression in the province
        // -% of people with depression from the same age group in Belgium
        // -% of people with depression in the province (edited) */
          // =% comparison belgium
        }

      </div>
    );
  }
}

export default Journey;
