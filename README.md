# Bouquet.io coding excercice

Coding excercice for an application to a 6-month internship in Bouquet.io

### Prerequisites

- nodeJS
- npm or yarn

### Installing


To install the project launch at the root :
```
npm install
```
To launch it :
```
npm start
```
Now your NodeJs server is launch at http://localhost:3000/

### Demo 

On Heroku :

### NodeJS

- Express

### React application :

The reactApplication is in the directory front.

### Dependencies : 
- react
- react-dom

- redux
- readux-thunk
- react-redux

- react-router-dom
- history

- babel-polyfill
- react-scripts
- isomorphic-fetch
- prop-types

- boostrap
- reactstrap
- chart.js
- recharts
- react-month-picker

### Redux store format :
````
State of the react app

{
  selectedTab: 'COUNT_BY_MONTH_YEAR', # 'COUNT_BY_MONTH_YEAR' 'COUNT_BY_PERIOD'
  dataByTab: {
    countByMonthYear: {
      isFetching: false, # true false
      sortedBy: 'none', # 'NONE' 'ALPHA' 'AMOUNT_ASC' 'AMOUNT_DESC'
      param_month_and_year: '2016-07-01T00:00:00.000',
      error: '',
      items: {
                2016-07-01T00:00:00.000: [
                         {department: "COMMUNITY_DEVELOPMENT AGENCY",
                         totalAmount:int,
                         listAmounts: […],
                         listContracts: […],
                         listVendorNames: […] },
                         {department: "CULTURAL_SERVICES", totalAmount:int, listAmounts: […], listContracts: […], listVendorNames: […] }
                     },...
                ]
      }
    },
    countByPeriod: {
      isFetching: false, # true false
      sortedBy: 'none', # 'NONE' 'ALPHA' 'AMOUNT_ASC' 'AMOUNT_DESC'
      param_start_period: '', # or a begin_date
      param_end_period: '', # or a end_date
      error: '',
      items: { #All DATA
                 2016-07-01T00:00:00.000: [
                          {department: "COMMUNITY_DEVELOPMENT AGENCY",
                          totalAmount:int,
                          listAmounts: […],
                          listContracts: […],
                          listVendorNames: […] },
                          {department: "CULTURAL_SERVICES", totalAmount:int, listAmounts: […], listContracts: […], listVendorNames: […] }
                      },...
                 ]
       }
    }
  }
}

````

### Make change to the React App

Once you have made your change you will have to build the app.
In front/
```
npm run build
```
#
## Authors

* **Clément Ponthieu** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [react-month-picker](https://github.com/nickeljew/react-month-picker)
* [recharts](http://recharts.org/#/en-US/)
* [reactstrap](https://reactstrap.github.io/)


