/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Camerachecklist } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CamerachecklistUpdateFormInputValues = {
    name?: string;
    description?: string;
};
export declare type CamerachecklistUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CamerachecklistUpdateFormOverridesProps = {
    CamerachecklistUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CamerachecklistUpdateFormProps = React.PropsWithChildren<{
    overrides?: CamerachecklistUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    camerachecklist?: Camerachecklist;
    onSubmit?: (fields: CamerachecklistUpdateFormInputValues) => CamerachecklistUpdateFormInputValues;
    onSuccess?: (fields: CamerachecklistUpdateFormInputValues) => void;
    onError?: (fields: CamerachecklistUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CamerachecklistUpdateFormInputValues) => CamerachecklistUpdateFormInputValues;
    onValidate?: CamerachecklistUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CamerachecklistUpdateForm(props: CamerachecklistUpdateFormProps): React.ReactElement;
