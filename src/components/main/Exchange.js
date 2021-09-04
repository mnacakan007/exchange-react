import React from "react";
import mainLogo from '../../assets/exchange2.svg';
import ExchangeInput from "../ExchangeInput/ExchangeInput";
import Loader from '../../Loader'
import CourseTable from "../CoursesTable/CoursesTable";
import './Exchange.css'

const URL = process.env.REACT_APP_DB_URL;

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

    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const today  = new Date();

    this.state = {
      loading: true,
      leftInput: 0,
      rightInput: 0,
      leftQuote: 'AMD',
      rightQuote: 'AMD',
      currency: {},
      courseCurrentDate: today.toLocaleDateString("en-US", options),
    };
  }

  componentDidMount() {
    this.getCurrency().then(() => this.setState({loading: false}));
  }

  getCurrency() {
    return new Promise((resolve) => setTimeout(() =>
        fetch(URL)
          .then(response => response.json())
          .then(currency => {
            this.setState({ currency: currency.quotes });
            resolve();
          }),
      1000)
    );
  }

  handleLeftSelector(leftQuote) {
    this.setState({ leftQuote });
  }

  handleRightSelector(rightQuote) {
    this.setState({ rightQuote });
  }

  handleLeftInput(leftInput) {
    this.setState({ rightInput: 0 });
    this.setState({ leftInput });
  }

  handleRightInput(rightInput) {
    this.setState({ leftInput: 0 });
    this.setState({ rightInput });
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <Loader/>;
    }

    const {leftQuote, rightQuote, leftInput, rightInput, courseCurrentDate } = this.state

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
          <CourseTable currency={this.state.currency}/>
          <div className='exchange-page'>
            <ExchangeInput
              money={exportLeftInput}
              currency={this.state.currency}
              onExchangeMoney={this.handleLeftInput}
              onCurrencyChange={this.handleLeftSelector}/>
            <img className='exchange-img' src={mainLogo} alt="exchange.png"/>
            <ExchangeInput
              money={exportRightInput}
              currency={this.state.currency}
              right={true}
              onExchangeMoney={this.handleRightInput}
              onCurrencyChange={this.handleRightSelector}/>
          </div>
          <div className='update-date-text'>Թարմացված է {courseCurrentDate}</div>
        </div>
      </div>
    );
  }
}
