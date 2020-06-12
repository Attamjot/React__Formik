import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Box,
  Button
} from "@material-ui/core";
import { Formik, Form, Field, useField, ErrorMessage } from "formik";
import { initialValues } from "../config/initialValues";
import * as yup from "yup";

const validationSchema = yup.object({
  fullName: yup
    .string()
    .required("Your name is mandatory!!!")
    .min(2)
    .max(100),
  initialInvestment: yup
    .number()
    .required()
    .min(100),
  investmentRisk: yup
    .array(yup.string().oneOf(["High", "Medium", "Low"]))
    .min(1),
  commentAboutInvestmentRisk: yup.mixed().when("investmentRisk", {
    is: investmentRisk => investmentRisk.find(ir => ir === "High"),
    then: yup
      .string()
      .required()
      .min(20)
      .max(100),
    otherwise: yup
      .string()
      .min(20)
      .max(100)
  }),
  dependents: yup
    .number()
    .required()
    .min(0)
    .max(5),
  acceptedTermsAndConditions: yup.boolean().oneOf([true])
});
class Formpage extends React.Component {
  render() {
    return (
      <div className="container formpage">
        <Card>
          <CardContent>
            <Typography variant="h4">New Account</Typography>
            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={(values, formikHelpers) => {
                return new Promise(resolve => {
                  setTimeout(() => {
                    console.log(values);
                    console.log(formikHelpers);
                    formikHelpers.resetForm();
                    resolve();
                  }, 2000);
                });
              }}
            >
              {({ values, errors, isSubmitting, isValidating }) => (
                <Form>
                  <Box marginBottom={3}>
                    <FormGroup>
                      {/* With formik component */}
                      {/* <Field name="fullName" as={TextField} label="Full Name" /> */}
                      {/* With custom formik component */}
                      <MyTextField name="fullName" label="Full Name" />
                    </FormGroup>
                    {/* <ErrorMessage name="fullName" /> */}
                  </Box>
                  <Box marginBottom={3}>
                    <FormGroup>
                      <Field
                        name="initialInvestment"
                        type="number"
                        as={TextField}
                        label="Initial Investment"
                      />
                    </FormGroup>
                    <ErrorMessage name="initialInvestment" />
                  </Box>
                  <Box marginBottom={3}>
                    <FormGroup>
                      <MyCheckbox
                        name="investmentRisk"
                        value="High"
                        label="High - Super Risky"
                      />
                      <MyCheckbox
                        name="investmentRisk"
                        value="Medium"
                        label="Medium - Risky"
                      />
                      <MyCheckbox
                        name="investmentRisk"
                        value="Low"
                        label="Low - Safe"
                      />
                    </FormGroup>
                    <ErrorMessage name="investmentRisk" />
                  </Box>
                  <Box marginBottom={3}>
                    <FormGroup>
                      <Field
                        name="commentAboutInvestmentRisk"
                        as={TextField}
                        multiline
                        rows={3}
                        rowsMax={5}
                      />
                    </FormGroup>
                    <ErrorMessage name="commentAboutInvestmentRisk" />
                  </Box>
                  <Box marginBottom={3}>
                    <FormGroup>
                      <Field name="dependents" as={TextField} select>
                        <MenuItem value="-1">Select...</MenuItem>
                        <MenuItem value="0">0</MenuItem>
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                      </Field>
                    </FormGroup>
                    <ErrorMessage name="dependents" />
                  </Box>
                  <Box marginBottom={3}>
                    <FormGroup>
                      <MyCheckbox
                        name="acceptedTermsAndConditions"
                        label="Accept terms & conditions"
                      />
                    </FormGroup>
                    <ErrorMessage name="acceptedTermsAndConditions" />
                  </Box>
                  <Button type="submit" disabled={isSubmitting || isValidating}>
                    Submit
                  </Button>
                  <br />
                  Data:
                  <pre>{JSON.stringify(values, null, 4)}</pre>
                  Errors:
                  <pre>{JSON.stringify(errors, null, 4)}</pre>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export function MyCheckbox(props) {
  const [field] = useField({
    name: props.name,
    type: "checkbox",
    value: props.value
  });

  return (
    <FormControlLabel
      control={<Checkbox {...props} {...field} />}
      label={props.label}
    />
  );
}

export function MyTextField(props) {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...field}
      {...props}
      helperText={errorText}
      error={!!errorText}
    />
  );
}

export default Formpage;
