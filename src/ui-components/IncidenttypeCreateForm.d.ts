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
export declare type IncidenttypeCreateFormInputValues = {
    name?: string;
    description?: string;
};
export declare type IncidenttypeCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type IncidenttypeCreateFormOverridesProps = {
    IncidenttypeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type IncidenttypeCreateFormProps = React.PropsWithChildren<{
    overrides?: IncidenttypeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: IncidenttypeCreateFormInputValues) => IncidenttypeCreateFormInputValues;
    onSuccess?: (fields: IncidenttypeCreateFormInputValues) => void;
    onError?: (fields: IncidenttypeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: IncidenttypeCreateFormInputValues) => IncidenttypeCreateFormInputValues;
    onValidate?: IncidenttypeCreateFormValidationValues;
} & React.CSSProperties>;
export default function IncidenttypeCreateForm(props: IncidenttypeCreateFormProps): React.ReactElement;
