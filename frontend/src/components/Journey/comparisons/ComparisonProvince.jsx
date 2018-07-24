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
            province: this.props.province
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
    render() {
        return (
            <div>
                <div className="journey_content">
                    <h1>Comparison over provinces</h1>
                    <p>
                        -% of people with depression in the province
                    </p>

                    <p>In {this.state.province}, {this.state.name} has <span className="red bold">{this.state.depressedPercentage}%</span> chances to meet another {this.state.age} years old, touched with depression. <br /> “x persons in blue with 100-x persons in white/red/whatever. In {this.state.province}, that’s [x*ProvincePop].</p>
                    {
                        this.state.listOfDummies.map(function (dummy) {
                            return dummy;
                        })

                    }
                    <button className="redButtonLink" onClick={() => this.props.onClick()}>Continue</button>
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
