import React from "react";
import CurrencySelector from "../CurrencySelector/CurrencySelector";
import { InputNumber } from 'antd';
import './ExchangeInput.css'

class ExchangeInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.selectCurrency = this.selectCurrency.bind(this);
  }

  handleChange(value) {

    if (value < 0) {
      return
    }

    this.props.onExchangeMoney(value);
  }

  selectCurrency(quote) {
    this.props.onCurrencyChange(quote);
  }

  render() {
    const money = this.props.money;

    return (
      <fieldset className={!this.props.right ? 'fieldset-left' : 'fieldset-right'}>
        <CurrencySelector
          right={this.props.right}
          currency={this.props.currency}
          onCurrencyChange={this.selectCurrency}/>
        <legend className='legend-item'>{ !this.props.right ? 'Ունեմ' : 'Ցանկանում եմ' }</legend>
        <InputNumber
          maxLength={15}
          placeholder={'0.00'}
          value={money}
          min="0"
          className={this.props.right ? 'marginLeft input-item' : 'input-item'}
          onChange={this.handleChange}/>
      </fieldset>
    );
  }
}

export default ExchangeInput
