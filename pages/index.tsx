import { Field, FieldAttributes, Form, Formik, useField } from "formik";
import {
  TextField,
  TextFieldProps,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { string, object } from "yup";
import React from "react";
import axios from "axios";
function MyTextField({ ...props }: FieldAttributes<{}> & TextFieldProps) {
  const [field, meta] = useField(props);
  const error = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...field}
      {...props}
      helperText={error}
      error={!!error}
      variant="outlined"
    />
  );
}
const issues: string[] = ["Order Did Not Arrive", "Bad Product", "Other"];
const validation = object().shape({
  orderid: string().required("Order Id Is Required"),
  email: string().required("Email Is Required").email("Must Be A Valid Email"),
  issue: string().required().oneOf(issues, "Invalid Issue"),
});
export default function Index() {
  return (
    <div>
      <div style={{ width: "300px" }}>
        <Formik
          initialValues={{ orderid: "", email: "", issue: "" }}
          onSubmit={async (values) => {
            const { data } = await axios.post("/api/issue", values);
            console.log(data);
          }}
          validationSchema={validation}
        >
          {({ values, isValid, dirty, errors }) => (
            <Form
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div>
                <MyTextField
                  name="orderid"
                  placeholder="Order ID"
                  label="Order ID"
                />
              </div>
              <div>
                <MyTextField name="email" placeholder="Email" label="Email" />
              </div>
              <div>
                <Field
                  name="issue"
                  type="select"
                  as={Select}
                  variant="outlined"
                  displayEmpty={false}
                >
                  {issues.map((issue, key) => {
                    return (
                      <MenuItem value={issue} key={key}>
                        {issue}
                      </MenuItem>
                    );
                  })}
                </Field>
              </div>
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!(isValid && dirty)}
                >
                  Submit
                </Button>
              </div>
              <pre>{JSON.stringify(values)}</pre>
              <pre>{JSON.stringify(errors)}</pre>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
