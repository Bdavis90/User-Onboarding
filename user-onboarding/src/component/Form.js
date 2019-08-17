import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function LoginForm({ values, errors, touched, status }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

  return (
    <div>
      <Form className="form-container">
        <Field
          className="form-input"
          type="text"
          name="name"
          placeholder="Name"
        />
        {touched.name && errors.name && <p>{errors.name}</p>}
        <Field
          className="form-input"
          type="text"
          name="email"
          placeholder="Email"
        />
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field
          className="form-input"
          type="password"
          name="password"
          placeholder="Password"
        />
        {touched.password && errors.password && <p>{errors.password}</p>}
        <label>
          Terms of Service
          <Field type="checkbox" name="tos" checked={values.tos} />
        </label>
        {touched.checkbox && errors.checkbox && <p>{errors.name}</p>}
        <button type="submit">Submit</button>
      </Form>
      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please enter a name"),
    email: Yup.string()
      .email("Email not valid")
      .required("Please enter a email"),
    password: Yup.string()
      .min(7, "Password must be 7 characters long")
      .required("Please enter a password")
  }),

  handleSubmit(values, { resetForm, setStatus }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        console.log(res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.error(err));
  }
})(LoginForm);

export default FormikLoginForm;
