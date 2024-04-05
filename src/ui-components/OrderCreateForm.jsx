/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Order } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function OrderCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    customerID: "",
    accountRepresentativeID: "",
    productID: "",
    status: "",
    amount: "",
    date: "",
  };
  const [customerID, setCustomerID] = React.useState(initialValues.customerID);
  const [accountRepresentativeID, setAccountRepresentativeID] = React.useState(
    initialValues.accountRepresentativeID
  );
  const [productID, setProductID] = React.useState(initialValues.productID);
  const [status, setStatus] = React.useState(initialValues.status);
  const [amount, setAmount] = React.useState(initialValues.amount);
  const [date, setDate] = React.useState(initialValues.date);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setCustomerID(initialValues.customerID);
    setAccountRepresentativeID(initialValues.accountRepresentativeID);
    setProductID(initialValues.productID);
    setStatus(initialValues.status);
    setAmount(initialValues.amount);
    setDate(initialValues.date);
    setErrors({});
  };
  const validations = {
    customerID: [{ type: "Required" }],
    accountRepresentativeID: [{ type: "Required" }],
    productID: [{ type: "Required" }],
    status: [{ type: "Required" }],
    amount: [{ type: "Required" }],
    date: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          customerID,
          accountRepresentativeID,
          productID,
          status,
          amount,
          date,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new Order(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "OrderCreateForm")}
      {...rest}
    >
      <TextField
        label="Customer id"
        isRequired={true}
        isReadOnly={false}
        value={customerID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              customerID: value,
              accountRepresentativeID,
              productID,
              status,
              amount,
              date,
            };
            const result = onChange(modelFields);
            value = result?.customerID ?? value;
          }
          if (errors.customerID?.hasError) {
            runValidationTasks("customerID", value);
          }
          setCustomerID(value);
        }}
        onBlur={() => runValidationTasks("customerID", customerID)}
        errorMessage={errors.customerID?.errorMessage}
        hasError={errors.customerID?.hasError}
        {...getOverrideProps(overrides, "customerID")}
      ></TextField>
      <TextField
        label="Account representative id"
        isRequired={true}
        isReadOnly={false}
        value={accountRepresentativeID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              customerID,
              accountRepresentativeID: value,
              productID,
              status,
              amount,
              date,
            };
            const result = onChange(modelFields);
            value = result?.accountRepresentativeID ?? value;
          }
          if (errors.accountRepresentativeID?.hasError) {
            runValidationTasks("accountRepresentativeID", value);
          }
          setAccountRepresentativeID(value);
        }}
        onBlur={() =>
          runValidationTasks("accountRepresentativeID", accountRepresentativeID)
        }
        errorMessage={errors.accountRepresentativeID?.errorMessage}
        hasError={errors.accountRepresentativeID?.hasError}
        {...getOverrideProps(overrides, "accountRepresentativeID")}
      ></TextField>
      <TextField
        label="Product id"
        isRequired={true}
        isReadOnly={false}
        value={productID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              customerID,
              accountRepresentativeID,
              productID: value,
              status,
              amount,
              date,
            };
            const result = onChange(modelFields);
            value = result?.productID ?? value;
          }
          if (errors.productID?.hasError) {
            runValidationTasks("productID", value);
          }
          setProductID(value);
        }}
        onBlur={() => runValidationTasks("productID", productID)}
        errorMessage={errors.productID?.errorMessage}
        hasError={errors.productID?.hasError}
        {...getOverrideProps(overrides, "productID")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={true}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              customerID,
              accountRepresentativeID,
              productID,
              status: value,
              amount,
              date,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <TextField
        label="Amount"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={amount}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              customerID,
              accountRepresentativeID,
              productID,
              status,
              amount: value,
              date,
            };
            const result = onChange(modelFields);
            value = result?.amount ?? value;
          }
          if (errors.amount?.hasError) {
            runValidationTasks("amount", value);
          }
          setAmount(value);
        }}
        onBlur={() => runValidationTasks("amount", amount)}
        errorMessage={errors.amount?.errorMessage}
        hasError={errors.amount?.hasError}
        {...getOverrideProps(overrides, "amount")}
      ></TextField>
      <TextField
        label="Date"
        isRequired={true}
        isReadOnly={false}
        value={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              customerID,
              accountRepresentativeID,
              productID,
              status,
              amount,
              date: value,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
