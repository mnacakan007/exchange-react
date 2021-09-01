import React from "react";
import CurrencySelector from "./CurrencySelector";
import { Input } from 'antd';

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
      <fieldset style={{margin: !this.props.right ? '30px 10px 0 15px' : '30px 15px 0 10px'}}>
        <CurrencySelector
          right={this.props.right}
          currency={this.props.currency}
          onCurrencyChange={this.selectCurrency}/>
        <legend style={{fontSize: '14px'}}>{ !this.props.right ? 'Ունեմ' : 'Ցանկանում եմ' }</legend>
        <Input
          style={{maxWidth: '135px'}}
          placeholder={'0.00'}
          value={money}
          type={'number'}
          className={this.props.right ? 'marginLeft' : ''}
          onChange={this.handleChange}/>
      </fieldset>
    );
  }
}

export default ExchangeInput
