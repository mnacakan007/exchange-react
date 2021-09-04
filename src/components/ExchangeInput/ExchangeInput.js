import React from "react";
import CurrencySelector from "../CurrencySelector/CurrencySelector";
import { Input } from 'antd';
import './ExchangeInput.css'

class ExchangeInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.selectCurrency = this.selectCurrency.bind(this);
  }

  handleChange(e) {
    this.props.onExchangeMoney(e.target.value);
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
        <Input
          placeholder={'0.00'}
          value={money}
          type={'number'}
          className='input-item'
          onChange={this.handleChange}/>
      </fieldset>
    );
  }
}

export default ExchangeInput
