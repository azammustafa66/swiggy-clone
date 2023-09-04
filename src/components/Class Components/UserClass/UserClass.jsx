import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      count2: 2,
    };
  }

  render() {
    const { name } = this.props;
    const { count, count2 } = this.state;
    return (
      <div className="user-card">
        {/* <h1>Count: {this.state.count}</h1> */}
        <button
          onClick={() => {
            this.setState({
              count: this.state.count - 1,
              count2: this.state.count - 1,
            });
          }}
        >
          -
        </button>
        <h1>Count: {count}</h1>
        <h1>Count2 : {count2}</h1>
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
              count2: this.state.count2 + 1,
            });
          }}
        >
          +
        </button>
        <h2>Name: {name}</h2>
        <h3>Dehradun</h3>
        <h4>Contact: azammustafa66</h4>
      </div>
    );
  }
}

export default UserClass;
