import React, {Component} from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: '',
      commentValue: '',
    };

    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleCommentTextAreaChange = this.handleCommentTextAreaChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.sendPostRequest = this.sendPostRequest.bind(this);
  }

  handleNameInputChange(e) {
    this.setState({nameValue: e.target.value});
  }

  handleCommentTextAreaChange(e) {
    this.setState({commentValue: e.target.value});
  }

  sendPostRequest(e) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
    };
    request.open('POST', this.props.link);
    request.setRequestHeader('Content-Type', 'application/json');
    const body = JSON.stringify({
      'name': this.state.nameValue,
      'comment': this.state.commentValue,
    });
    request.send(body);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if (this.state.nameValue.length>0 && this.state.commentValue.length>0) {
      this.sendPostRequest(e);
      this.props.onClick();
    }
  }

  render() {
    const link = this.props.link;
    return (
      <form action={link} onSubmit={this.handleFormSubmit} name ="new_comment" method = "POST" className = "modal__form form">
        <fieldset className = "form__fieldset">
            <label htmlFor = "name" className = "visually-hidden">Имя</label>
            <input type="text" value={this.state.nameValue} onChange={this.handleNameInputChange} name="name" id="name" className="form__field form__field--name" placeholder="Ваше имя" required/>
            <textarea name="text" valuet={this.state.commentValue} onChange={this.handleCommentTextAreaChange} id="text" className = "form__field form__field--message" placeholder="Ваш комментарий" rows="1" maxLength="400" required></textarea>
            <label htmlFor="text" className="visually-hidden">Комментарий</label>
        </fieldset>
        <button type="submit" onClick={this.handleFormSubmit}  className="form__button-submit button">Оставить комментарий</button>
      </form>
    )
  }
}

export default Form;