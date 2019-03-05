import React, { Component } from 'react';
import { connect } from 'react-redux';

import { actionTheFirst } from './actions/actionTheFirst';

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  actionTheFirst: () => dispatch(actionTheFirst())
})

class App extends Component {

  handleClick = (event) => {
    this.props.actionTheFirst();
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Test redux action</button>
        <pre>
        {
          JSON.stringify(this.props)
        }
        </pre>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
