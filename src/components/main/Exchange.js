import React, { Component } from "react";
import mainLogo from '../../assets/exchange2.svg';
import ExchangeInput from "../ExchangeInput/ExchangeInput";
import Loader from '../Loader/Loader'
import CourseTable from "../CoursesTable/CoursesTable";
import classes from './Exchange.module.css'
import { toMoney, calcCourse } from "../../utils/utils";
import { getCurrency } from "../../services/getCurrency";

export class Exchange extends Component {
  constructor(props) {
    super(props);

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
    getCurrency().then(currency => this.setState({ currency, loading: false }));
  }

  handleLeftSelector = leftQuote => {
    this.setState({ leftQuote });
  }

  handleRightSelector = rightQuote => {
    this.setState({ rightQuote });
  }

  handleLeftInput = leftInput => {
    this.setState({ rightInput: 0 });
    this.setState({ leftInput });
  }

  handleRightInput = rightInput => {
    this.setState({ leftInput: 0 });
    this.setState({ rightInput });
  }

  render() {
    if (this.state.loading) {
      return <Loader/>;
    }

    const { leftQuote, rightQuote, leftInput, rightInput, courseCurrentDate } = this.state

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
        <h1 className={classes['main-title']}>Exchange</h1>
        <div className={classes['content-page']}>
          <CourseTable currency={this.state.currency}/>
          <div className={classes['exchange-page']}>
            <ExchangeInput
              money={exportLeftInput}
              currency={this.state.currency}
              onExchangeMoney={this.handleLeftInput}
              onCurrencyChange={this.handleLeftSelector}/>
            <img className={classes['exchange-img']} src={mainLogo} alt="exchange.png"/>
            <ExchangeInput
              money={exportRightInput}
              currency={this.state.currency}
              right={true}
              onExchangeMoney={this.handleRightInput}
              onCurrencyChange={this.handleRightSelector}/>
          </div>
          <div className={classes['update-date-text']}>Թարմացված է {courseCurrentDate}</div>
        </div>
      </div>
    );
  }
}
