import React, {Component} from 'react';

class UserInfo extends Component {
    render() {
      const errorStatus = this.props.status;
      if (errorStatus!=="loading") {
        return (
          <div className="info">
            <p className="info__content">{"Что-то пошло не так, пожалуйста, перезагрузите страницу"}</p>
          </div>
        )
      } return (
        <div className="info">
          <p className="info__content">{"Загрузка..."}</p>
        </div>
      )
    }
  }

  export default UserInfo;