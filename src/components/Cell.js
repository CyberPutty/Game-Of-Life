import React from 'react';

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        console.log(this.props.size.length);
        return (
            <div className="cellcolumns">{this.props.size.map((col, index) => {
                let color;
                if (col === "D") {
                    color = "dead";
                }
                else {
                    color = "alive";
                }
                return (<div className={color + " R" + this.props.row + "C" + (index + 1)}></div>);
            })}</div>
        );
    }
}

export default Cell;