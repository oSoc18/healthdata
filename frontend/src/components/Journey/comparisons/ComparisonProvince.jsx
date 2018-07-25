import React from 'react';
import '../../../assets/css/journey/journey.css';

class ComparisonProvince extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            depressedPercentage: 6,
            listOfDummies: new Array(),
            name: this.props.name,
            age: this.props.age,
            isMale: this.props.gender == "male" ? true : false,
            province: this.props.province,
            value: "",
            dataFromYear: "2013"
        };
        this.fillList();

    }
    fillList() {
        let depressedPpl = this.state.depressedPercentage;

        for (let i = 1; i < 101; i++) {
            this.state.listOfDummies.push(<Dummy key={i} value={i <= depressedPpl ? true : false} />);
            if (i % 10 == 0)
                this.state.listOfDummies.push(<br />);
        }
    }


    componentDidMount() {
        this.processData("2013");
    }

    processData(year) {
        fetch(`http://192.168.99.100:8000/api/depression?province=${this.props.province}&year=${year}`)
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
                            this.processData("2008");
                            break;
                        case "2008":
                            this.processData("2004");
                        case "2004":
                            this.processData("2001");
                        default:
                            this.setState({
                                value: avg
                            })
                            break;
                    }
                }
                else {
                    this.setState({ value: avg });
                    this.setState({ dataFromYear: year })
                }

            });
    }


    render() {
        return (
            <div>
                <div className="journey_content">
                    <h1>Comparison over your province</h1>
                    <p>
                        In the whole province, that is <span className="red bold">{this.state.value}%</span> of people.
                    </p>
                    {
                        this.state.listOfDummies.map(function (dummy) {
                            return dummy;
                        })

                    }
                    <p>
                        <button type="button" className="redButtonLink" onClick={() => this.props.prev()}>
                            <i className="fa fa-angle-left bold"></i> Go back
                         </button> <button type="button" className="redButtonLink" onClick={() => this.props.next()}>
                            Continue <i className="fa fa-angle-right bold"></i>
                        </button>
                    </p>
                    <p>
                        Data from the Belgian Health Interview Survey, current symptoms of a depressive disorder. Year: {this.state.dataFromYear}
                    </p>
                </div>
            </div>
        )
    }
}


class Dummy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRed: this.props.value,
        }
    }
    render() {
        return (
            <i className="fa fa-male" style={{ color: this.state.isRed ? "red" : "black", padding: "0.5em" }}> </i>
        );
    }
}


export default ComparisonProvince;
