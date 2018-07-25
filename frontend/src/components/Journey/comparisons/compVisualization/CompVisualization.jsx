import React from 'react';

class CompVisualization extends React.Component {

    constructor(props) {
        super(props);
        console.log('lolol')
        console.log(this.props.percent);
        this.state = {
            depressedPercentage: this.props.percent,
            listOfDummies: new Array(),
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
            this.state.listOfDummies.map(function (dummy) {
                return dummy;
            })
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
            <span style={{ color: this.state.isRed ? "red" : "black", padding: "0.5em" }}>&#11044;</span>
            // <i className="fa fa-male" style={{ color: this.state.isRed ? "red" : "black", padding: "0.5em" }}> </i>
        );
    }
}


export default CompVisualization;
