import React from 'react';
import '../../../assets/css/journey/journey.css';


const ComparisonPerAgePerProvince = (props) => {

  // const retreive = () => {

  // }

  return (

    <div>
      <div className="journey_content">
        {/* <p>
          -% of people with depression from the same age group and same province.
      </p> */}
      <p>
        X % at the age of the {this.props.age} year olds that live in {this.props.province} have depression. 
      </p>
        <button type="button" className="redButtonLink" onClick={() => props.onClick()}>Start your journey</button>
      </div>
    </div>
  );
}

export default ComparisonPerAgePerProvince;



// class Home extends React.Component {

//   constructor() {
//     super();
//     fetch('http://192.168.99.100:8000/api/depression/')
//       .then(
//         function (response) {
//           if (response.status !== 200) {
//             console.log('Looks like there was a problem. Status Code: ' +
//               response.status);
//             return;
//           }
//           response.json()
//             .then(function (data) {

//               // % of people with depression from the same age group and same province
//               console.log(data.filter(item => item.agegroup == '15-24' && item.province == 'antwerp'))

//               // -% of women with depression in the province
//               console.log(data.filter(item => item.gender == 'F' && item.province == 'antwerp'))

//               // -% of men with depression in the province
//               console.log(data.filter(item => item.gender == 'M' && item.province == 'antwerp'))

//               // -% of people with depression from the same age group in Belgium
//               console.log(data.filter(item => item.agegroup == '15-24'))

//               // -% of people with depression in the province
//               let res = data.filter(item => item.province == 'antwerp');

//               let total = 0;
//               let resLength = res.length
//               for (let i = 0; i < resLength; i++) {
//                 total += parseFloat(res[i].crude);
//               }
//               console.log(total/resLength);

//               // > 2, <15


//             })

//         }
//       )
//       .catch(function (err) {
//         console.log('Fetch Error :-S', err);
//       })


//   }

//   render() {
//     return (
//       < p >
//         Home page.
//       </p >
//     )
//   }

// }