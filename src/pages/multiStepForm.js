import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  FormGroup,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  CircularProgress
} from "@material-ui/core";
import { TextField, CheckboxWithLabel } from "formik-material-ui";

import { Formik, Form, Field } from "formik";

import * as yup from "yup";

const sleep = time =>
  new Promise(resolve => {
    setTimeout(() => resolve(), time);
  });

const multiStepForm = () => {
  return (
    <div className="container formpage">
      <Card>
        <CardContent>
          <Typography variant="h4" style={{ textAlign: "center" }}>
            Multi-Step Form
          </Typography>
          <FormikStepper
            initialValues={{
              firstName: "",
              lastName: "",
              millionaire: false,
              money: 0,
              description: ""
            }}
            onSubmit={async (values, formikHelpers) => {
              // With promise ( onSubmit handler demands a promise if you want to perform async actions )
              // return new Promise((resolve, reject) => {
              //   setTimeout(() => {
              //     const output = JSON.stringify(values, null, 4);
              //     alert(output);
              //     formikHelpers.resetForm();
              //     resolve();
              //   }, 2000);
              // });
              //  OR
              console.log("parent submit");
              await sleep(3000);
              const output = JSON.stringify(values, null, 4);
              alert(output);
            }}
          >
            <FormikStep
              label="Personal Data"
              validationSchema={yup.object().shape({
                firstName: yup
                  .string()
                  .required("First Name is a required field.")
                  .min(3, "Please enter atleast 3 characters to form a name.")
              })}
            >
              <Box marginBottom={2}></Box>
              <FormGroup>
                <Field
                  name="firstName"
                  component={TextField}
                  label="First Name"
                />
              </FormGroup>
              <Box marginBottom={2}>
                <FormGroup>
                  <Field
                    name="lastName"
                    component={TextField}
                    label="Last Name"
                  />
                </FormGroup>
              </Box>
              <Box marginBottom={2}>
                <FormGroup>
                  <Field
                    name="millionaire"
                    type="checkbox"
                    component={CheckboxWithLabel}
                    Label={{ label: "I am a millionaire" }}
                  />
                </FormGroup>
              </Box>
            </FormikStep>
            <FormikStep
              label="Bank Accounts"
              validationSchema={yup.object().shape({
                money: yup.mixed().when("millionaire", {
                  is: true,
                  then: yup
                    .number()
                    .required()
                    .min(
                      1000000,
                      "Because you said you are millionaire you need to have 1 million"
                    ),
                  otherwise: yup.number().required()
                })
              })}
            >
              <Box marginBottom={2}>
                <FormGroup>
                  <Field
                    name="money"
                    type="number"
                    component={TextField}
                    label="All the money i have"
                  />
                </FormGroup>
              </Box>
            </FormikStep>
            <FormikStep label="More info">
              <Box marginBottom={2}>
                <FormGroup>
                  <Field
                    name="description"
                    component={TextField}
                    label="Description"
                  />
                </FormGroup>
              </Box>
            </FormikStep>
          </FormikStepper>
        </CardContent>
      </Card>
    </div>
  );
};

export function FormikStep({ children }) {
  return <> {children} </>;
}

export function FormikStepper({ children, ...props }) {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLasStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLasStep()) {
          /* as the parent onSubmit returns a promise, so to handle it we are making use of async / await */
          await props.onSubmit(values, helpers);
          setCompleted(true);
          // helpers.resetForm();
          // setStep(0);
        } else {
          setStep(s => s + 1);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => {
              return (
                <Step
                  key={child.props.label}
                  completed={step > index || completed}
                >
                  <StepLabel>{child.props.label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {currentChild}

          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep(s => s - 1)}
                >
                  Back
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting
                  ? "Submitting..."
                  : isLasStep()
                  ? "Submit"
                  : "Next"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
export default multiStepForm;
