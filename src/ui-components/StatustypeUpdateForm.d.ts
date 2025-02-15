/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Statustype } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type StatustypeUpdateFormInputValues = {
    name?: string;
    description?: string;
};
export declare type StatustypeUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StatustypeUpdateFormOverridesProps = {
    StatustypeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type StatustypeUpdateFormProps = React.PropsWithChildren<{
    overrides?: StatustypeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    statustype?: Statustype;
    onSubmit?: (fields: StatustypeUpdateFormInputValues) => StatustypeUpdateFormInputValues;
    onSuccess?: (fields: StatustypeUpdateFormInputValues) => void;
    onError?: (fields: StatustypeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StatustypeUpdateFormInputValues) => StatustypeUpdateFormInputValues;
    onValidate?: StatustypeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function StatustypeUpdateForm(props: StatustypeUpdateFormProps): React.ReactElement;
