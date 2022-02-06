import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const { data } = this.state;
    const options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (const item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = (name, value) => {
    const obj = { [name]: value };
    const propertySchema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, propertySchema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState((prevState) => {});
    if (errors) return;

    this.doSubmit();
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    const error = this.validateProperty(name, value);
    if (error) {
      this.setState((prevState) => ({
        errors: { ...prevState.errors, [name]: error },
      }));
    } else {
      this.setState((prevState) => {
        const errors = prevState.errors;
        errors[name] && delete errors[name];
        return errors;
      });
    }
    this.setState((prevState) => ({
      data: { ...prevState.data, [name]: value },
    }));
  };

  renderButton = (label) => {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        type={type}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        error={errors[name]}
        options={options}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
      />
    );
  };
}

export default Form;
