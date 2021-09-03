import React from "react";
import usaFlag from '../../assets/usa-flag.png';
import russiaFlag from '../../assets/russian-flag.png';
import europeFlag from '../../assets/european-flag.png';
import englishFlag from '../../assets/english-flag.png';
import './CoursesTable.css';

const currencyList = [
  {
    flagUrl: europeFlag, name: 'EUR'
  },
  {
    flagUrl: englishFlag, name: 'GBP'
  },
  {
    flagUrl: russiaFlag, name: 'RUB'
  },
  {
    flagUrl: usaFlag, name: 'USD'
  },
]

class CourseTable extends React.Component {
  constructor(props) {
    super(props);

    this.calcCourse = this.calcCourse.bind(this)
  }

  calcCourse(value) {
    const course = this.props.currency['USDAMD'];

    if (!value) {
      return 0
    }

    return Math.round(course / value * 100) / 100
  }

  render() {
    return (
        <div className='currency-list'>
          <div className='currency-list-names'>
            {currencyList.map(country => {
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
            {Object.values(this.props.currency)
              .map(this.calcCourse)
              .filter(value => value !== 1)
              .map(value => {
              return <div className='currency-course-list' key={value}>{value !== 1 ? value : null}</div>
            })}
          </div>
        </div>
    );
  }
}

export default CourseTable
