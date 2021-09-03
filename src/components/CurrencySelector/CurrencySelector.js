import React from "react";
import { Select } from "antd";

class CurrencySelector extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.sliceValue = this.sliceValue.bind(this);
  }

  handleChange(quote) {
    this.props.onCurrencyChange(quote);
    this.setState({quote})
  }

  sliceValue(value) {
    return value.slice(3)
  }

  render() {
    let currencyObj = this.props?.currency;

    let currency = Object.keys(currencyObj);
    currency.sort(function(a, b) { return currencyObj[b] - currencyObj[a] });

    return (
      <form>
        <label className='w-100'>
          <Select className='w-100' defaultValue={this.sliceValue(currency[0])} onChange={this.handleChange}>
            {currency.map(value => {
              return <Select.Option key={value} value={this.sliceValue(value)}>{this.sliceValue(value)}</Select.Option>
            })}
          </Select>
        </label>
      </form>
    );
  }
}

export default CurrencySelector
