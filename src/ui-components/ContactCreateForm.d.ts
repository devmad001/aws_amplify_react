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
export declare type ContactCreateFormInputValues = {
    name?: string;
    position?: string;
    handphone?: string;
};
export declare type ContactCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    position?: ValidationFunction<string>;
    handphone?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ContactCreateFormOverridesProps = {
    ContactCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    position?: PrimitiveOverrideProps<TextFieldProps>;
    handphone?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ContactCreateFormProps = React.PropsWithChildren<{
    overrides?: ContactCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ContactCreateFormInputValues) => ContactCreateFormInputValues;
    onSuccess?: (fields: ContactCreateFormInputValues) => void;
    onError?: (fields: ContactCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ContactCreateFormInputValues) => ContactCreateFormInputValues;
    onValidate?: ContactCreateFormValidationValues;
} & React.CSSProperties>;
export default function ContactCreateForm(props: ContactCreateFormProps): React.ReactElement;
