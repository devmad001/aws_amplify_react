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
export declare type CamerachecklistCreateFormInputValues = {
    name?: string;
    description?: string;
};
export declare type CamerachecklistCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CamerachecklistCreateFormOverridesProps = {
    CamerachecklistCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CamerachecklistCreateFormProps = React.PropsWithChildren<{
    overrides?: CamerachecklistCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CamerachecklistCreateFormInputValues) => CamerachecklistCreateFormInputValues;
    onSuccess?: (fields: CamerachecklistCreateFormInputValues) => void;
    onError?: (fields: CamerachecklistCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CamerachecklistCreateFormInputValues) => CamerachecklistCreateFormInputValues;
    onValidate?: CamerachecklistCreateFormValidationValues;
} & React.CSSProperties>;
export default function CamerachecklistCreateForm(props: CamerachecklistCreateFormProps): React.ReactElement;
