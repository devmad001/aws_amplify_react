/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Severitytype } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SeveritytypeUpdateFormInputValues = {
    name?: string;
    description?: string;
};
export declare type SeveritytypeUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SeveritytypeUpdateFormOverridesProps = {
    SeveritytypeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SeveritytypeUpdateFormProps = React.PropsWithChildren<{
    overrides?: SeveritytypeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    severitytype?: Severitytype;
    onSubmit?: (fields: SeveritytypeUpdateFormInputValues) => SeveritytypeUpdateFormInputValues;
    onSuccess?: (fields: SeveritytypeUpdateFormInputValues) => void;
    onError?: (fields: SeveritytypeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SeveritytypeUpdateFormInputValues) => SeveritytypeUpdateFormInputValues;
    onValidate?: SeveritytypeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SeveritytypeUpdateForm(props: SeveritytypeUpdateFormProps): React.ReactElement;
