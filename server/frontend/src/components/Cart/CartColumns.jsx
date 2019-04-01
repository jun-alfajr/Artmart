import React from 'react';
import {cartCols} from '../../data';
import {Row} from 'react-bootstrap';

export default function CartColumns() {
  return (
    <div className="container-fluid text-center d-none d-lg-block">
      <Row>{cartCols.map(colName => 
        <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">{colName}</p>
        </div>)}
      </Row>
    </div>
  )
}