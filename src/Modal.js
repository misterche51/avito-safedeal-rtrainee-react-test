import React, {Component} from "react";
import CommentsList from './CommentsList';
import UserInfo from './UserInfo';
import Form from './Form';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestLink: this.props.link,
            error: null,
            isLoaded: false,
            item: { id: null,
                    comments: [{id:1, text: ""}]
        }
      }
    };


    componentDidMount(){
        fetch(this.state.requestLink)
        .then(res => res.json())
        .then(
            (result) => {
            this.setState({
                isLoaded: true,
                item: result
                })
            },
            (error) => {
            this.setState({
                isLoaded: true,
                error
            });
            }
        );
        document.addEventListener("keydown", this.props.onKeyDown, false);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.props.onKeyDown, false);
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
                <div className = "overlay overlay--active" onClick = {this.props.onClose}></div>
                <div className = "modal modal--active" >
                    <div className = "modal__photo photo">
                        <div className = "photo__wrapper">
                            <div className = "photo__inner">
                                <img src={this.state.item.url} alt={"Та фотография, что тебя заинтересовала"} className = "photo__img"/>
                            </div>
                        </div>
                    </div>
                    <div className = "modal__wrapper">
                        <CommentsList comments = {this.state.item.comments}/>
                        <Form link = {`${this.state.requestLink}/comments`} onClick = {this.props.onClose}/>
                    </div>
                    <button type="button" onClick = {this.props.onClose} className = "modal__close-button"></button>
                </div>
                </>
            )
        }
    };

export default Modal;