import React from "react";
import mainLogo from '../assets/exchange2.svg';
import ExchangeInput from "./ExchangeInput";
import Loader from '../Loader'

const imageStyles = {
  width: '35px',
  height: '40px',
  position: 'absolute',
  left: '0',
  right: '0',
  margin: '0 auto',
  top: '150px'
}

function toMoney(money = 0, course) {
  if (!money) {
    return 0
  }
  return Math.round(money * course * 100) / 100
}

function calcCourse(course1, course2) {
  return course1 / course2;
}

export class Exchange extends React.Component {
  constructor(props) {
    super(props);

    this.handleLeftSelector = this.handleLeftSelector.bind(this);
    this.handleRightSelector = this.handleRightSelector.bind(this);
    this.handleLeftInput = this.handleLeftInput.bind(this);
    this.handleRightInput = this.handleRightInput.bind(this);
    this.getCurrency = this.getCurrency.bind(this);

    this.state = {
      loading: true,
      leftInput: 0,
      rightInput: 0,
      leftQuote: 'AMD',
      rightQuote: 'AMD',
      currency: {},
    };
  }

  componentDidMount() {
    this.getCurrency().then(() => this.setState({ loading: false }));
  }

  getCurrency() {
    return new Promise((resolve) => setTimeout(() =>
      fetch('http://apilayer.net/api/live?access_key=2b1b329fd66a5a8e48d84dd8d0d03fba&currencies=EUR,GBP,RUB,AMD,USD&source=USD&format=1')
        .then(response => response.json())
        .then(currency => {
          this.setState({currency: currency.quotes});
          console.log(this.state);
          resolve();
        }),
      1000)
    );
  }

  handleLeftSelector(quote) {
    this.setState({ leftQuote: quote });
  }

  handleRightSelector(quote) {
    this.setState({ rightQuote: quote });
  }

  handleLeftInput(money) {
    this.setState({ rightInput: 0 });
    this.setState({ leftInput: money });
  }

  handleRightInput(money) {
    this.setState({ leftInput: 0 });
    this.setState({ rightInput: money });
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <Loader />;
    }

    const { leftQuote, rightQuote, leftInput, rightInput } = this.state

    const leftInputCourse = this.state.currency['USD' + leftQuote];
    const rightInputCourse = this.state.currency['USD' + rightQuote];

    let exportLeftInput, exportRightInput

    if (leftInput) {
      exportRightInput = toMoney(leftInput, calcCourse(rightInputCourse, leftInputCourse)) ?? leftInput;
    } else if (rightInput) {
      exportLeftInput = toMoney(rightInput, calcCourse(leftInputCourse, rightInputCourse)) ?? rightInput;
    }

    return (
      <div>
      <h1 className='main-title'>Exchange</h1>
      <div className='content-page'>
        <ExchangeInput
          money={exportLeftInput}
          currency={this.state.currency}
          onExchangeMoney={this.handleLeftInput}
          onCurrencyChange={this.handleLeftSelector}/>
        <img style={imageStyles} src={mainLogo} alt="exchange.png"/>
        <ExchangeInput
          money={exportRightInput}
          currency={this.state.currency}
          right={true}
          onExchangeMoney={this.handleRightInput}
          onCurrencyChange={this.handleRightSelector}/>
      </div>
    </div>
    );
  }
}
