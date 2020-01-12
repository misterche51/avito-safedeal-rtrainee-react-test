import React, {Component} from "react";

class CommentsList extends Component {
  constructor(props) {
    super(props);

    this.getValidDateValue = this.getValidDateValue.bind(this);
};

getValidDateValue(number){
  const date = new Date(number);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1)<10 ? `0${date.getMonth() + 1}`: date.getMonth() + 1;
  const day = date.getDate()<10 ? `0${date.getDate()}`: date.getDate();
  return `${day}.${month}.${year}`;
};

  render () {
    const {comments} = this.props;

    return (
      <div className = "modal__comments">
        {comments.map((comment) => {
                        return (
                        <div className="modal__comments-item comment" key={comment.id}>
                                  <span className="comment__date">{this.getValidDateValue(comment.date)}</span>
                                  <p className="comment__message">{comment.text}</p>
                                </div>
                                )
                    })}
      </div>
    )
  }
};

export default CommentsList;