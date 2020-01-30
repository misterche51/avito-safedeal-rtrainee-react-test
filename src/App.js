import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from './actions';

import Header from './Header';
import Gallery from './Gallery';
import Footer from './Footer';
import UserInfo from './UserInfo';

class App extends Component {

  componentDidMount() {
    this.props.fetchData('https://boiling-refuge-66454.herokuapp.com/images');
  }

  render () {
    if (this.props.hasErrored) {
      return (<UserInfo/>)
    } else if (this.props.isLoading) {
        return (<UserInfo status={"loading"}/>)
      }
    return (
      <>
        <Header/>
          <Gallery items = {this.props.items}/>
        <Footer/>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      items: state.app.items,
      hasErrored: state.app.itemsHasErrored,
      isLoading: state.app.itemsIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: (url) => dispatch(itemsFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
