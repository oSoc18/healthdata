import React from 'react';
import '../../../assets/css/journey/journey.css';
import API from '../../../api/BaseAPI';
import imgManvsWoman from '../../../assets/images/mvsf.png';


class ComparisonGenderPerProvince extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueM: "",
      dataFromYearM: 2013,
      valueF: "",
      dataFromYearF: 2013
    }
    this.api = new API();
  }

  componentDidMount() {
    this.getData("2013", true); //male
    this.getData("2013", false); //female
  }

  async getData(year, isMale) {
    let data = await this.api.getComparisonData(`province=${this.props.province}&gender=${isMale ? "M" : "F"}&year=${year}`);
    this.processData(data, year, isMale);
  }


  processData(data, year, isMale) {
    let total = 0;
    let dataLength = data.length;

    for (let i = 0; i < dataLength; i++) {
      total += parseFloat(data[i].crude);
    }

    let avg = Math.round((total / dataLength) * 100) / 100;
    // if (isMale) {
    //   console.log(data);
    //   console.log(dataLength);
    //   console.log(avg);
    //   console.log(total);

    // }

    if (avg > 15 || avg < 3) {
      switch (year) {
        case "2013":
          this.getData("2008", isMale);
          break;
        case "2008":
          this.getData("2004", isMale);
        case "2004":
          this.getData("2001", isMale);
        default:
          if (isMale) {
            this.setState({ valueM: avg });
            this.setState({ dataFromYearM: year })
          }
          else {
            this.setState({ valueF: avg });
            this.setState({ dataFromYearF: year })
          }
          break;
      }
    }
    else {
      if (isMale) {
        this.setState({ valueM: avg });
        this.setState({ dataFromYearM: year })
      }
      else {
        this.setState({ valueF: avg });
        this.setState({ dataFromYearF: year })
      }

    }

  }

  processDataM(year) {
    fetch(`http://192.168.99.100:8000/api/depression?province=${this.props.province}&gender=M&year=${year}`)
      .then(response => response.json())
      .then((data) => {
        console.log(data);

        let total = 0;
        let dataLength = data.length;
        for (let i = 0; i < dataLength; i++) {
          total += parseFloat(data[i].crude);
        }

        let avg = Math.round((total / dataLength) * 100) / 100;
        console.log(avg + "- " + year);
        if (avg > 15 || avg < 3) {
          switch (year) {
            case "2013":
              this.processDataM("2008");
              break;
            case "2008":
              this.processDataM("2004");
            case "2004":
              this.processDataM("2001");
            default:
              this.setState({
                valueM: avg
              })
              break;
          }
        }
        else {
          this.setState({ valueM: avg });
          this.setState({ dataFromYearM: year })
        }
      });
  }


  render() {
    return (
      <div className="comparisonP">
        <div className="flex-container">
          <div className="compContent">
            <div className="compContentContent flex-container">
              <div style={{ padding: "1em", width: "30%" }}>

              </div>
              <div style={{ paddingRight: "1em", width: "70%" }}>
                <h1>Comparison <span className="red bold">male vs female</span> <span className="capitalize">{this.props.province}</span></h1>
                <p>
                  <span className="bold red"> {(this.state.valueF) ? this.state.valueF : "Loading "}%</span> of women living in <span className="capitalize">{this.props.province}</span> have the same symptoms, while <span className="bold red"> {(this.state.valueM) ? this.state.valueM : "Loading "}%</span> of men living in <span className="capitalize">{this.props.province}</span> experience those symptoms.

                </p>
              </div>

            </div>

          </div>
          <div className="compVis">
            <div className="compVisVis">
              <img src={imgManvsWoman} alt="Image of man and woman standing on block"/>
            </div>

          </div>
        </div >

        <div className="comparisonButtonAndFootnote">
          <p>
            <button type="button" className="redButtonLink" onClick={() => this.props.prev()}>
              <i className="fa fa-angle-left bold"></i> Go back
                </button> <button type="button" className="redButtonLink" onClick={() => this.props.next()}>
              Continue <i className="fa fa-angle-right bold"></i>
            </button>
          </p>
          <p>
            Data from the Belgian Health Interview Survey, current symptoms of a depressive disorder. Year women data: {this.state.dataFromYearF} <br />
            Data from the Belgian Health Interview Survey, current symptoms of a depressive disorder. Year men data:  {this.state.dataFromYearM}
          </p>
        </div>
      </div>
    );
  }
}

export default ComparisonGenderPerProvince;





// {/* <div>
//         <div className="journey_content">
//           <p>
//             <span className="bold red"> {(this.state.valueF) ? this.state.valueF : "Loading "}%</span> of women living in <span className="capitalize">{this.props.province}</span> have the same symptoms, while <span className="bold red"> {(this.state.valueM) ? this.state.valueM : "Loading "}%</span> of men living in <span className="capitalize">{this.props.province}</span> experience those symptoms.
//             {/* In {this.props.province}, <span className="bold red"> {(this.state.valueF) ? this.state.valueF : "Loading "}%</span> of the women have those symptoms too, while <span className="bold red"> {(this.state.valueM) ? this.state.valueM : "Loading "}%</span> of men do. */}
//           </p>
//           <p>
//             <button type="button" className="redButtonLink" onClick={() => this.props.prev()}>
//               <i className="fa fa-angle-left bold"></i> Go back
//                 </button> <button type="button" className="redButtonLink" onClick={() => this.props.next()}>
//               Continue <i className="fa fa-angle-right bold"></i>
//             </button>
//           </p>
//           <p>
//             Data from the Belgian Health Interview Survey, current symptoms of a depressive disorder. Year women data: {this.state.dataFromYearF} <br />
//             Data from the Belgian Health Interview Survey, current symptoms of a depressive disorder. Year men data:  {this.state.dataFromYearM}
//           </p>
//         </div>
//       </div> */}