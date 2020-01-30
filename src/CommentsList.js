import React, {Component} from 'react';
import { connect } from 'react-redux';

class CommentsList extends Component {

  getValidDateValue(number){
    const date = new Date(number);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1)<10 ? `0${date.getMonth() + 1}`: date.getMonth() + 1;
    const day = date.getDate()<10 ? `0${date.getDate()}`: date.getDate();
    return `${day}.${month}.${year}`;
  };

  render () {
    const comments = this.props.comments;
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

const mapStateToProps = (state) => {
  return {
      data: state.app.modalData,
  };
};

export default connect(mapStateToProps)(CommentsList);
