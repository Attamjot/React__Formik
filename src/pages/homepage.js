import React, { Component } from "react";
import { Formik, Field, Form, useField, FieldArray } from "formik";
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem
} from "@material-ui/core";

import * as yup from "yup";

const MyRadio = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const MyTextField = ({ placeholder, autoComplete, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...field}
      placeholder={placeholder}
      helperText={errorText}
      error={!!errorText}
      autoComplete={autoComplete}
    />
  );
};

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required()
    .max(10),
  pets: yup.array().of(
    yup.object({
      name: yup.string().required()
    })
  )
});

class Homepage extends Component {
  render() {
    return (
      <div className="container homepage">
        <h2 style={{ textAlign: "center" }}>Formik Application ( Ben awad )</h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            isTall: false,
            cookies: [],
            yogurt: "",
            pets: [{ type: "cat", name: "Jarvis", id: "" + Math.random() }]
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            console.log("Data", data);
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ values, errors, isSubmitting }) => (
            <Form>
              {/* <Field placeholder="First Name" name="firstName" type="input" as={TextField} autoComplete="off"/> */}
              <MyTextField
                placeholder="First Name"
                name="firstName"
                autoComplete="off"
              />

              <div>
                <Field
                  placeholder="Last Name"
                  name="lastName"
                  type="input"
                  as={TextField}
                  autoComplete="off"
                />
              </div>
              <label>
                IsTall: <Field name="isTall" type="checkbox" as={Checkbox} />
              </label>
              <div>
                Cookies:
                <Field
                  name="cookies"
                  type="checkbox"
                  value="chocolate chip"
                  as={Checkbox}
                />
                <Field
                  name="cookies"
                  type="checkbox"
                  value="snickers doodle"
                  as={Checkbox}
                />
                <Field
                  name="cookies"
                  type="checkbox"
                  value="sugar"
                  as={Checkbox}
                />
              </div>
              <div>Yogurt</div>
              <MyRadio name="yogurt" type="radio" value="peach" label="peach" />
              <MyRadio
                name="yogurt"
                type="radio"
                value="blueberry"
                label="blueberry"
              />
              <MyRadio name="yogurt" type="radio" value="apple" label="apple" />
              <div>
                <FieldArray name="pets">
                  {arrayHelpers => (
                    <div>
                      <Button
                        onClick={() => {
                          arrayHelpers.push({
                            type: "frog",
                            name: "",
                            id: "" + Math.random()
                          });
                        }}
                      >
                        Add pet
                      </Button>
                      {values.pets.map((pet, index) => {
                        const name = `pets.${index}.name`;

                        return (
                          <div key={pet.id}>
                            <MyTextField placeholder="pet name" name={name} />
                            <Field
                              name={`pets.${index}.type`}
                              type="select"
                              as={Select}
                            >
                              <MenuItem value="cat">cat</MenuItem>
                              <MenuItem value="dog">dog</MenuItem>
                              <MenuItem value="frog">frog</MenuItem>
                            </Field>
                            <Button
                              onClick={() => {
                                arrayHelpers.remove(index);
                              }}
                            >
                              X
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </FieldArray>
              </div>
              <div>
                <Button disabled={isSubmitting} type="submit">
                  Submit
                </Button>
              </div>

              <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default Homepage;
