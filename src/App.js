import React,  {Component} from 'react';
// import ReactDOM from 'react-dom';
import Header from './Header';
import Gallery from './Gallery';
import Footer from './Footer';
import UserInfo from './UserInfo';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://boiling-refuge-66454.herokuapp.com/images")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  render () {
    const {error, isLoaded} = this.state;
        if (error) {
            return (<UserInfo/>)
        } else if (!isLoaded) {
            return (<UserInfo status={"loading"}/>)
        }
          return (
            <>
              <Header/>
              <Gallery items = {this.state.items}/>
              <Footer/>
            </>
          )
  }
}

export default App;
