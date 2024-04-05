/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type StatustypeCreateFormInputValues = {
    name?: string;
    description?: string;
};
export declare type StatustypeCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StatustypeCreateFormOverridesProps = {
    StatustypeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type StatustypeCreateFormProps = React.PropsWithChildren<{
    overrides?: StatustypeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: StatustypeCreateFormInputValues) => StatustypeCreateFormInputValues;
    onSuccess?: (fields: StatustypeCreateFormInputValues) => void;
    onError?: (fields: StatustypeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StatustypeCreateFormInputValues) => StatustypeCreateFormInputValues;
    onValidate?: StatustypeCreateFormValidationValues;
} & React.CSSProperties>;
export default function StatustypeCreateForm(props: StatustypeCreateFormProps): React.ReactElement;
