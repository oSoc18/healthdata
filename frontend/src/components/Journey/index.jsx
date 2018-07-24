import React from 'react';
import Navbar from '../Navbar';
import Questions from './Questions';
import Persona2 from './Persona2';

import ComparisonProvince from './comparisons/ComparisonProvince';
import ComparisonBelgium from './comparisons/ComparisonBelgium';
import ComparisonPerAgePerProvince from './comparisons/ComparisonPerAgePerProvince';
// import ComparisonWomenPerProvince from './comparisons/ComparisonWomenPerProvince';
// import ComparisonMenPerProvince from './comparisons/ComparisonMenPerProvince';
import ComparisonGenderPerProvince from './comparisons/ComparisonGenderPerProvince';

import ComparisonSameAgeBelgium from './comparisons/ComparisonSameAgeBelgium';

import Persona1 from './Persona1';
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

  prevScreen() {
    this.setState(prevState => ({
      screenDisplayed: prevState.screenDisplayed - 1
    }));
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.state.screenDisplayed === 1 && <Questions onClick={(age, gender, province, agegroup) => this.receiveDataAndGoNext(age, gender, province, agegroup)} />}
        {this.state.screenDisplayed === 2 && <Persona1 prev={() => this.prevScreen()} next={() => this.nextScreen()} age={this.state.age} name={this.state.name} province={this.state.province} gender={this.state.gender} />}
        {this.state.screenDisplayed === 3 && <Persona2 prev={() => this.prevScreen()} next={() => this.nextScreen()} age={this.state.age} name={this.state.name} province={this.state.province} gender={this.state.gender} />}

        {this.state.screenDisplayed === 4 && <ComparisonPerAgePerProvince prev={() => this.prevScreen()} next={() => this.nextScreen()} agegroup={this.state.agegroup} age={this.state.age} name={this.state.name} province={this.state.province} gender={this.state.gender} />}
        {this.state.screenDisplayed === 5 && <ComparisonProvince prev={() => this.prevScreen()} next={() => this.nextScreen()} agegroup={this.state.agegroup} name={this.state.name} age={this.state.age} province={this.state.province} gender={this.state.gender} />}
        {this.state.screenDisplayed === 6 && <ComparisonGenderPerProvince prev={() => this.prevScreen()} next={() => this.nextScreen()} agegroup={this.state.agegroup} age={this.state.age} name={this.state.name} province={this.state.province} gender={this.state.gender} />}

        {this.state.screenDisplayed === 7 && <ComparisonSameAgeBelgium prev={() => this.prevScreen()} next={() => this.nextScreen()} agegroup={this.state.agegroup} age={this.state.age} name={this.state.name} province={this.state.province} gender={this.state.gender} />}
        {this.state.screenDisplayed === 8 && <ComparisonBelgium prev={() => this.prevScreen()} next={() => this.nextScreen()} agegroup={this.state.agegroup} age={this.state.age} name={this.state.name} province={this.state.province} gender={this.state.gender} />}

        {this.state.screenDisplayed === 9 && <YouAreNotAlone prev={() => this.prevScreen()} name={this.state.name} age={this.state.age} province={this.state.province} gender={this.state.gender} />}
        {this.state.screenDisplayed === 10 && <div>Nothing to show</div>}
      </div>
    );
  }
}

export default Journey;
