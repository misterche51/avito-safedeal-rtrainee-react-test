import React, {Component} from "react";
// // import {render} from "react-dom";
// import PropTypes from "prop-types";
import PhotoPreview from './PhotoPreview';
import Modal from './Modal';


class Gallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            currentItem: null,
        };

        this.handlerPhotoPreviewClick = this.handlerPhotoPreviewClick.bind(this);
        this.handlerEscapeKeyDown = this.handlerEscapeKeyDown.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.grabId = this.grabId.bind(this);
    };

    grabId(id) {
        return `https://boiling-refuge-66454.herokuapp.com/images/${id}` ;
    }

    toggleModal() {
        this.setState(() => ({isModalOpen: !this.state.isModalOpen}));
    };

    handlerPhotoPreviewClick(e) {
            e.preventDefault();
            e.persist();
            this.setState({currentItem: e.target.id});
            this.toggleModal();
    }

    handlerEscapeKeyDown(e) {
        if (e.keyCode === 27 &&
            e.target !== document.querySelector('.form__field--name') &&
            e.target !== document.querySelector('.form__field--message')) {
            e.preventDefault();
            this.toggleModal();
        }
    }

    render () {
        const {items} = this.props;
        const requestLink = this.grabId(this.state.currentItem);

        return (
            <>
                <ul className = "gallery__list">
                    {items.map((item) => {
                        return (<PhotoPreview
                                    key={item.id}
                                    url={item.url}
                                    id = {item.id}
                                    onClick={this.handlerPhotoPreviewClick}
                                />)
                    })}
                </ul>
                {
                    this.state.isModalOpen &&
                    <Modal onClose = {this.toggleModal}
                            onKeyDown={this.handlerEscapeKeyDown}
                            link = {requestLink}
                    />
                }
            </>
        )
    }
};


export default Gallery;