import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../../assets/images/PageNotFound.jpg';

const NotFoundPage = () => {
  return <div>
            <img style={{with:"100%"}} src={PageNotFound}  />
            <p style={{textAlign:"center"}}>
              <Link to="/">Go to Home </Link>
            </p>
          </div>;;
}

export default NotFoundPage;