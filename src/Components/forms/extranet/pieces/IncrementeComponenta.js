import React from 'react';

class IncrementeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.quant,
      show: true,
      max: 20,
      min: 0
    };
  }

  IncrementItem = () => {
    this.setState(
      prevState => {
        if (prevState.quantity < 9) {
          return {
            quantity: prevState.quantity + 1
          };
        } else {
          return null;
        }
      },
      () => {
        if (this.props.onChange) {
          const { quantity } = this.state;
          this.props.onChange(quantity);
        }
      }
    );
  };
  DecreaseItem = () => {
    this.setState(
      prevState => {
        if (prevState.quantity > 0) {
          return {
            quantity: prevState.quantity - 1
          };
        } else {
          return null;
        }
      },
      () => {
        if (this.props.onChange) {
          const { quantity } = this.state;
          this.props.onChange(quantity);
        }
      }
    );
  };

  ToggleClick = () => {
    this.setState({
      show: !this.state.show
    });
  };

  handleChange = event => {
    this.setState({ quantity: event.target.value }, () => {
      if (this.props.onChange) {
        const { quantity } = this.state;
        this.props.onChange(quantity);
      }
    });
  };

  render() {
    return (
      <span className="">
        <button
          type="button"
          className="  bg-white text-blue-500   font-bold py-0 px-2  mx-4  rounded-full  shadow-inner border-gray-500"
          onClick={this.DecreaseItem}
        >
          -
        </button>
        <input
          className="w-10"
          value={this.state.quantity}
          onChange={this.handleChange}
        />
        <button
          type="button"
          className="  bg-white text-blue-500   font-bold py-0 px-2 rounded-full shadow-inner border-gray-500"
          onClick={this.IncrementItem}
        >
          +
        </button>
      </span>
    );
  }
}

export default IncrementeComponent;