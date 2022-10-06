import React from 'react';
import { ErrorMessage, useField } from 'formik';

const TextField = ({ ...props }) => {
    const [field, meta] = useField(props)

    return (
        <div>
            <input className={`form-control ${meta.touched && meta.error && 'is-invalid'}`} {...field} {...props} autoComplete="off" />
            <ErrorMessage component='div' name={field.name} style={{ color: "red" }} />
        </div>
    );
}

export default TextField;
