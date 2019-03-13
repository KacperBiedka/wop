import React from 'react';
import classes from './ErrorMessage.module.css';
import MaterialIcon from 'material-icons-react';

const errorMessage = (props) => {
    return (
        <div className={classes.errorDiv + " alert alert-danger"}role="alert">
          <MaterialIcon icon="warning" size="tiny" color="#721c24"/> <span className={classes.errorText}>{props.text}</span>
        </div>
    )
}

export default errorMessage;