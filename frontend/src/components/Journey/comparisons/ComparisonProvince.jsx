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
            value: ""
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
        fetch(`http://192.168.99.100:8000/api/depression?province=${this.props.province}&year=2013`)
            .then(response => response.json())
            .then((data) => {
                console.log(data);

                let total = 0;
                let dataLength = data.length;
                for (let i = 0; i < dataLength; i++) {
                    total += parseFloat(data[i].crude);
                }

                this.setState({
                    value: Math.round((total / dataLength) * 100) / 100
                })
            });
    }


    render() {
        return (
            <div>
                <div className="journey_content">
                    <h1>Comparison over provinces</h1>
                    <p>
                        {this.state.value}% of people with depression in Belgium
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
