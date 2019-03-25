import React, { Component } from 'react'

export default class Default extends Component {
  render() {
    return (
      <div className="container m-5">
        <div className="row">
          <div className="col-10 mx-auto text-center pt-5">
            <h1>404</h1>
            <h2>Sorry,</h2>
            <h2>We couldn't find <span className="text-danger">{this.props.location.pathname}</span> </h2>
          </div>
        </div>
      </div>
    )
  }
}