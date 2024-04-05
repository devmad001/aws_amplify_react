/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Bypass } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function BypassUpdateForm(props) {
  const {
    id: idProp,
    bypass: bypassModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    site_id: "",
    start_time: "",
    end_time: "",
  };
  const [site_id, setSite_id] = React.useState(initialValues.site_id);
  const [start_time, setStart_time] = React.useState(initialValues.start_time);
  const [end_time, setEnd_time] = React.useState(initialValues.end_time);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = bypassRecord
      ? { ...initialValues, ...bypassRecord }
      : initialValues;
    setSite_id(cleanValues.site_id);
    setStart_time(cleanValues.start_time);
    setEnd_time(cleanValues.end_time);
    setErrors({});
  };
  const [bypassRecord, setBypassRecord] = React.useState(bypassModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Bypass, idProp)
        : bypassModelProp;
      setBypassRecord(record);
    };
    queryData();
  }, [idProp, bypassModelProp]);
  React.useEffect(resetStateValues, [bypassRecord]);
  const validations = {
    site_id: [],
    start_time: [{ type: "Required" }],
    end_time: [],
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
          site_id,
          start_time,
          end_time,
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
          await DataStore.save(
            Bypass.copyOf(bypassRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "BypassUpdateForm")}
      {...rest}
    >
      <TextField
        label="Site id"
        isRequired={false}
        isReadOnly={false}
        value={site_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              site_id: value,
              start_time,
              end_time,
            };
            const result = onChange(modelFields);
            value = result?.site_id ?? value;
          }
          if (errors.site_id?.hasError) {
            runValidationTasks("site_id", value);
          }
          setSite_id(value);
        }}
        onBlur={() => runValidationTasks("site_id", site_id)}
        errorMessage={errors.site_id?.errorMessage}
        hasError={errors.site_id?.hasError}
        {...getOverrideProps(overrides, "site_id")}
      ></TextField>
      <TextField
        label="Start time"
        isRequired={true}
        isReadOnly={false}
        value={start_time}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              site_id,
              start_time: value,
              end_time,
            };
            const result = onChange(modelFields);
            value = result?.start_time ?? value;
          }
          if (errors.start_time?.hasError) {
            runValidationTasks("start_time", value);
          }
          setStart_time(value);
        }}
        onBlur={() => runValidationTasks("start_time", start_time)}
        errorMessage={errors.start_time?.errorMessage}
        hasError={errors.start_time?.hasError}
        {...getOverrideProps(overrides, "start_time")}
      ></TextField>
      <TextField
        label="End time"
        isRequired={false}
        isReadOnly={false}
        value={end_time}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              site_id,
              start_time,
              end_time: value,
            };
            const result = onChange(modelFields);
            value = result?.end_time ?? value;
          }
          if (errors.end_time?.hasError) {
            runValidationTasks("end_time", value);
          }
          setEnd_time(value);
        }}
        onBlur={() => runValidationTasks("end_time", end_time)}
        errorMessage={errors.end_time?.errorMessage}
        hasError={errors.end_time?.hasError}
        {...getOverrideProps(overrides, "end_time")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || bypassModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || bypassModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
