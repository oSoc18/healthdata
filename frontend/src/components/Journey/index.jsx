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
      screenDisplayed: 10,
      name: name,
      age: age,
      gender: gender,
      province: province,
      results: "results",
      agegroup: null
    };
  }




  receiveDataAndGoNext(age, gender, province, agegroup) {
    this.setState({ age });
    this.setState({ gender });
    this.setState({ province });
    this.setState({ name: gender === 'male' ? 'John' : 'Vanessa' });
    this.setState({ agegroup });
    console.log(agegroup);


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
        {this.state.screenDisplayed === 1 && <Questions onClick={(age, gender, province, agegroup) => this.receiveDataAndGoNext(age, gender, province, agegroup)} />}
        {this.state.screenDisplayed === 2 && <WhatIsDepression onClick={() => this.nextScreen()} />}
        {this.state.screenDisplayed === 3 && <Persona onClick={() => this.nextScreen()} age={this.state.age} name={this.state.name} province={this.state.province} gender={this.state.gender} />}

        {this.state.screenDisplayed === 4 && <ComparisonPerAgePerProvince onClick={() => this.nextScreen()} agegroup={this.state.agegroup} age={this.state.age} name={this.state.name} province={this.state.province} gender={this.state.gender} />}
        {this.state.screenDisplayed === 5 && <ComparisonWomenPerProvince onClick={() => this.nextScreen()} agegroup={this.state.agegroup} age={this.state.age} name={this.state.name} province={this.state.province} gender={this.state.gender} />}
        {this.state.screenDisplayed === 6 && <ComparisonMenPerProvince onClick={() => this.nextScreen()} agegroup={this.state.agegroup} age={this.state.age} name={this.state.name} province={this.state.province} gender={this.state.gender} />}

        {this.state.screenDisplayed === 7 && <ComparisonSameAgeBelgium onClick={() => this.nextScreen()} agegroup={this.state.agegroup} age={this.state.age} name={this.state.name} province={this.state.province} gender={this.state.gender} />}
        {this.state.screenDisplayed === 8 && <ComparisonProvince onClick={() => this.nextScreen()} agegroup={this.state.agegroup} name={this.state.name} age={this.state.age} province={this.state.province} gender={this.state.gender} />}
        {this.state.screenDisplayed === 9 && <ComparisonBelgium onClick={() => this.nextScreen()} agegroup={this.state.agegroup} age={this.state.age} name={this.state.name} province={this.state.province} gender={this.state.gender} />}

        {this.state.screenDisplayed === 10 && <YouAreNotAlone onClick={() => this.nextScreen()} name={this.state.name} age={this.state.age} province={this.state.province} gender={this.state.gender} />}
        {this.state.screenDisplayed === 11 && <div>Nothing to show</div>}

      </div>
    );
  }
}

export default Journey;
