import React, { Component } from 'react';

class PhotoPreview extends Component {
    render() {
        return (
            <li className = "gallery__item" onClick = {this.props.onClick} onKeyDown = {this.props.onKeyDown}>
               <img src = {this.props.url} id = {this.props.id} alt = {"Случайная фотография"} className = "gallery__item-preview" width = {"280"} height = {"172"}/>
            </li>
        );
    }
};

export default PhotoPreview;