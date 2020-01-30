import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from './actions';

import CommentsList from './CommentsList';
import UserInfo from './UserInfo';
import Form  from './FormRedux';

class Modal extends Component {
    constructor(props){
        super(props);
        this.escapeKeyDownHandler = this.escapeKeyDownHandler.bind(this);
      }

    escapeKeyDownHandler(e){
        e.keyCode===27 && this.props.closeModalHandler();
    }

    componentDidMount(){
        document.addEventListener("keydown", this.escapeKeyDownHandler);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.escapeKeyDownHandler);
    }

    render () {
        const { modalIsLoading, modalHasErrored } = this.props;
        const { data } = this.props;
        const {comments}  = data;

        if (modalHasErrored) {
            return (<UserInfo/>)
        } else if (modalIsLoading) {
            return (<UserInfo status={"loading"}/>)
        }

        return (
            <>
                <div className = "overlay" onClick={this.props.closeModalHandler}></div>
                <div className = "modal">
                    <div className = "modal__photo photo">
                        <div className = "photo__wrapper">
                            <div className = "photo__inner">
                                <img src={data.url} alt={"Та фотография, что тебя заинтересовала"} className = "photo__img"/>
                            </div>
                        </div>
                    </div>
                    <div className = "modal__wrapper">
                        <CommentsList comments = {comments}/>
                        <Form/>
                    </div>
                    <button type="button" className = "modal__close-button" onClick={this.props.closeModalHandler}></button>
                </div>
            </>
            )
        }
    };

    const mapStateToProps = (state) => {
        return {
            isModalOpen: state.app.isModalOpen,
            data: state.app.modalData,
            modalIsLoading: state.app.modalIsLoading,
            modalHasErrored: state.app.modalHasErrored,
        };
      };

    const mapDispatchToProps = (dispatch) => {
        return {
            closeModalHandler: () => dispatch(closeModal()),
        };
      };

export default connect( mapStateToProps, mapDispatchToProps)(Modal);