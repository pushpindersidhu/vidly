import React from "react";
import Input from "./common/input";

function LoginForm() {
  const [account, setAccount] = React.useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({});

  function validate() {
    const errors = {};

    const { username, password } = account;

    if (username.trim() === "") errors.username = "Username is required.";

    if (password.trim() === "") errors.password = "Password is required.";

    return Object.keys(errors).length === 0 ? null : errors;
  }

  function validateProperty(name, value) {
    if (name === "username") {
      if (value.trim() === "") return "Username is required.";
    }

    if (name === "password") {
      if (value.trim() === "") return "Password is required.";
    }
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
