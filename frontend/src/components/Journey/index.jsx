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

    let name = "test";
    let age = 23;
    let province = "west-vlaanderen";
    let gender = "M";
    // let results = this.retrieveData(age, gender, province);
    // console.log(results);

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



  retrieveData(age, gender, province) {

  }


  procesData() {
    console.log(this.state.data);
    return this.state.data;
  }

  async receiveDataAndGoNext(age, gender, province) {
    this.setState({ age });
    this.setState({ gender });
    this.setState({ province });
    this.setState({ name: gender === 'male' ? 'John' : 'Vanessa' });



    let that = this;

    fetch('http://192.168.99.100:8000/api/depression/')
      .then(
        function (response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
          response.json()
            .then(function (data) {

              // % of people with depression from the same age group and same province
              let agePerProv = data.filter(item => item.agegroup == '15-24' && item.province == province);

              // -% of women with depression in the province
              let womenPerProv = data.filter(item => item.gender == 'F' && item.province == prov);

              // // -% of men with depression in the province
              let menPerProv = calcAverage(data.filter(item => item.gender == 'M' && item.province == prompt));

              // -% of people with depression from the same age group in Belgium
              let perAge = calcAverage(data.filter(item => item.agegroup == '15-24'));

              // -% of people with depression in the province
              let perProv = calcAverage(data.filter(item => item.province == prompt));


              // > 2, <15
              // return {
              //   // data.filter(item => item.agegroup == '15-24' && item.province == this.state.province)
              //   // agePerProv: this.state.name,
              //   womenPerProv: "null",
              //   menPerProv: null,
              //   perAge: null,
              //   perProvince: null,
              //   entireBelgium: null
              // };





              that.setState({ results: "testter" });


            })

        }
      )
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      })

    this.nextScreen();
  }

  calcAverage(res) {
    let total = 0;
    let resLength = res.length;
    for (let i = 0; i < resLength; i++) {
      total += parseFloat(res[i].crude);
    }
    console.log(total / resLength);
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

        {this.state.screenDisplayed === 4 && <ComparisonPerAgePerProvince onClick={() => this.nextScreen()} testVal={this.state.results} age={this.state.age} name={this.state.name} province={this.state.province} gender={this.state.gender} />}
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
