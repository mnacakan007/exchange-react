import React, { Component } from "react";
import './CoursesTable.css';
import { exchangeConfigs } from "../../assets/configs/exchangeConfigs";

class CourseTable extends Component {
  calcCourse = value => {
    const course = this.props.currency['USDAMD'];

    if (!value || value === 1) {
      return 0
    }

    if (course === value) {
      return Math.round(course * 100) / 100
    }

    return Math.round(course / value * 100) / 100
  }

  compare = (a, b) => {
    if (a[0] === 'USDAMD') return -1

    return a - b
  }

  sortCurrency = () => {
    return Object.entries(this.props?.currency).sort(this.compare).reduce((acc, [k, v]) => {
      acc[k] = v;
      return acc;
    }, {});
  }

  render() {
    return (
        <div className='currency-list'>
          <div className='currency-list-names'>
            {exchangeConfigs.map(country => {
              return <div style={{display: 'flex'}} key={country.name}>
                <div>
                  <img
                    className='flag'
                    width='25'
                    height='25'
                    src={country.flagUrl}
                    alt="country.flagUrl"
                  />
                </div>
                <div className='country-name-item'>{country.name}</div>
              </div>
            })}
          </div>
          <div className='currency-list-values'>
            {Object.values(this.sortCurrency())
              .map(this.calcCourse)
              .filter(value => !!value)
              .map(value => {
              return <div className='currency-course-list' key={value}>{value}</div>
            })}
          </div>
        </div>
    );
  }
}

export default CourseTable
