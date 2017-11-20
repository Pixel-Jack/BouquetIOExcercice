import React from 'react';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <div className='container notFound'>
          <div className='row content notFound'>
            <div className='col-lg-12'></div>
            <div className='col-lg-12'>
              <h1 className='hero notFound'>404</h1>
              <h3 className='hero notFound'>Oops, the page you're looking for doesn't exist</h3>
              <h3 className='hero'>
                Choose one of these two options :
                <br/>
                (Of course, if you think something is broken, feel free to report the problem)
              </h3>
              <Link className='btn notFound' to="/bymonth">Chart By Month And Year</Link>
              <Link className='btn notFound' to="/byperiod">Chart By Period</Link>
            </div>
          </div>
        </div>
        <div className='bg-img notFound'></div>
      </div>
    );
  }
}

export default NotFound;