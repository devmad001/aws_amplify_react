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
export declare type NvrCreateFormInputValues = {
    name?: string;
    url?: string;
    path?: string;
    auth?: string;
};
export declare type NvrCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    url?: ValidationFunction<string>;
    path?: ValidationFunction<string>;
    auth?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NvrCreateFormOverridesProps = {
    NvrCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    url?: PrimitiveOverrideProps<TextFieldProps>;
    path?: PrimitiveOverrideProps<TextFieldProps>;
    auth?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NvrCreateFormProps = React.PropsWithChildren<{
    overrides?: NvrCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: NvrCreateFormInputValues) => NvrCreateFormInputValues;
    onSuccess?: (fields: NvrCreateFormInputValues) => void;
    onError?: (fields: NvrCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NvrCreateFormInputValues) => NvrCreateFormInputValues;
    onValidate?: NvrCreateFormValidationValues;
} & React.CSSProperties>;
export default function NvrCreateForm(props: NvrCreateFormProps): React.ReactElement;
