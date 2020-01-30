import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { closeModal } from './actions';
import { connect } from 'react-redux';

const validate = values => {
  const errors = {};
  if (!values.name) {
      errors.name = "Обязательно укажите Ваше имя";
  }
  if (!values.text) {
      errors.text = "Вы забыли написать комментарий";
  }
  return errors;
};

const renderField = ({
  input,
  type,
  name,
  placeholder,
  className,
  meta: { touched, error}
}) => (
  <>
    {<input {...input} type={type} name={name} id={name} className={className} placeholder={placeholder}/>}
    {touched &&
        (error && <span className="form__warning warning">{error}</span>)}

  </>
);

let Form = props => {

    const { handleSubmit } = props;

    const sendPostRequest = (values) => {
      const request = new XMLHttpRequest();
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return;
        }
      };
      request.open('POST', `https://boiling-refuge-66454.herokuapp.com/images/${props.id}/comments`);
      request.setRequestHeader('Content-Type', 'application/json');
      const body = JSON.stringify({
        'name': values.name,
        'comment': values.text,
      });
      request.send(body);
      props.closeModalHandler();
    }

    const submit = (values) => sendPostRequest(values);

    return (
      <form onSubmit = {handleSubmit(submit)} className = "modal__form form">
        <fieldset className = "form__fieldset">
          <div className = "form__unit">
            <label htmlFor = "name" className = "visually-hidden">Имя</label>
            <Field type="text" component={renderField} name="name" id="name" className="form__field form__field--name" placeholder="Ваше имя"/>
          </div>
          <div className = "form__unit">
            <Field type="text" component={renderField} name="text" id="text" className="form__field form__field--message" placeholder ="Ваш комментарий" required/>
            <label htmlFor="text" className="visually-hidden">Комментарий</label>
          </div>
        </fieldset>
        <button type="submit" className="form__button-submit button">Оставить комментарий</button>
      </form>
    )
}

const mapStateToProps = (state) => {
  return {
      id: state.app.modalData.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      closeModalHandler: () => dispatch(closeModal()),        };
};




Form = reduxForm({
  form: 'post',
  validate,
})(Form);

export default connect( mapStateToProps, mapDispatchToProps)(Form);