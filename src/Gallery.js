import React, { Component } from 'react';
import PhotoPreview from './PhotoPreview';
import Modal from './Modal';
import { modalFetchData, openModal } from './actions'
import { connect } from 'react-redux';


class Gallery extends Component {
    render() {
        const items = this.props.items;
        return (
            <>
                <ul className = "gallery__list">
                    {items.map((item) => {
                        return (<PhotoPreview
                                    key={item.id}
                                    url={item.url}
                                    id = {item.id}
                                    onClick={
                                        (e) =>
                                        this.props.modalFetchData(e)
                                        .then(this.props.openModal())
                                    }
                                />)
                        })}
                </ul>
                {this.props.isModalOpen && <Modal/>}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isModalOpen: state.app.isModalOpen
    };
  };

const mapDispatchToProps = (dispatch) => {
    const urlPrefix = 'https://boiling-refuge-66454.herokuapp.com/images/';
    return {
        modalFetchData: async (e) => dispatch(modalFetchData(`${urlPrefix}${e.target.id}`)),
        openModal: () => dispatch(openModal()),
  };
};

export default connect( mapStateToProps, mapDispatchToProps)(Gallery);