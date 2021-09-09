import React, { Component } from "react";
import { Select } from "antd";

class CurrencySelector extends Component {
  handleChange = quote => {
    this.props.onCurrencyChange(quote);
    this.setState({quote})
  }

  sliceValue = value => {
    return value.slice(3)
  }

  render() {
    let currencyObj = this.props?.currency;

    let currency = Object.keys(currencyObj);
    currency.sort(function(a, b) { return currencyObj[b] - currencyObj[a] });

    return (
      <form>
        <label className='w-100'>
          <Select
            defaultValue={this.sliceValue(currency[0])}
            onChange={this.handleChange}
            className='w-100'
          >
            {currency.map(value =>
              <Select.Option
                value={this.sliceValue(value)}
                key={value}
              >
                {this.sliceValue(value)}
              </Select.Option>
            )}
          </Select>
        </label>
      </form>
    );
  }
}

export default CurrencySelector
