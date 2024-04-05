/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Nvr } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type NvrUpdateFormInputValues = {
    name?: string;
    url?: string;
    path?: string;
    auth?: string;
};
export declare type NvrUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    url?: ValidationFunction<string>;
    path?: ValidationFunction<string>;
    auth?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NvrUpdateFormOverridesProps = {
    NvrUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    url?: PrimitiveOverrideProps<TextFieldProps>;
    path?: PrimitiveOverrideProps<TextFieldProps>;
    auth?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NvrUpdateFormProps = React.PropsWithChildren<{
    overrides?: NvrUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    nvr?: Nvr;
    onSubmit?: (fields: NvrUpdateFormInputValues) => NvrUpdateFormInputValues;
    onSuccess?: (fields: NvrUpdateFormInputValues) => void;
    onError?: (fields: NvrUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NvrUpdateFormInputValues) => NvrUpdateFormInputValues;
    onValidate?: NvrUpdateFormValidationValues;
} & React.CSSProperties>;
export default function NvrUpdateForm(props: NvrUpdateFormProps): React.ReactElement;
