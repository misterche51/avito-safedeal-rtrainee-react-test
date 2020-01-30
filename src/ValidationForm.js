import React from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = "Обязательно укажите Ваше имя";
    }
    if (!values.text) {
        errors.text = "Вы забыли написать комментарий"
    }
    return errors;
}
