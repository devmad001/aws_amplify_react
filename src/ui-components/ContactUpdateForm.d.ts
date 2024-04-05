/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Contact } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ContactUpdateFormInputValues = {
    name?: string;
    position?: string;
    handphone?: string;
};
export declare type ContactUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    position?: ValidationFunction<string>;
    handphone?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ContactUpdateFormOverridesProps = {
    ContactUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    position?: PrimitiveOverrideProps<TextFieldProps>;
    handphone?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ContactUpdateFormProps = React.PropsWithChildren<{
    overrides?: ContactUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    contact?: Contact;
    onSubmit?: (fields: ContactUpdateFormInputValues) => ContactUpdateFormInputValues;
    onSuccess?: (fields: ContactUpdateFormInputValues) => void;
    onError?: (fields: ContactUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ContactUpdateFormInputValues) => ContactUpdateFormInputValues;
    onValidate?: ContactUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ContactUpdateForm(props: ContactUpdateFormProps): React.ReactElement;
