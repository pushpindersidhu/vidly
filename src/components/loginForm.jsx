import React from "react";
import Joi, { schema } from "joi-browser";
import Input from "./common/input";

function LoginForm() {
  const [account, setAccount] = React.useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({});

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  function validate() {
    const options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(account, schema, options);

    if (!error) return null;

    const errors = {};
    for (const item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  }

  function validateProperty(name, value) {
    const obj = { [name]: value };
    const propertySchema = { [name]: schema[name]}
    const {error} = Joi.validate(obj, propertySchema)
    return error ? error.details[0].message : null;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    const error = validateProperty(name, value);
    if (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    } else {
      setErrors((prevErrors) => {
        const errors = prevErrors;
        errors[name] && delete errors[name];
        return errors;
      });
    }

    setAccount((pervAccount) => ({ ...pervAccount, [name]: value }));
  }

  console.log(errors);
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          label="Username"
          type="text"
          error={errors.username}
          value={account.username}
          onChange={handleChange}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          error={errors.password}
          value={account.password}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
