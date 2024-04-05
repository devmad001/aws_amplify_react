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
export declare type IncidentCreateFormInputValues = {
    name?: string;
    description?: string;
    site_id?: string;
};
export declare type IncidentCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    site_id?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type IncidentCreateFormOverridesProps = {
    IncidentCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    site_id?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type IncidentCreateFormProps = React.PropsWithChildren<{
    overrides?: IncidentCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: IncidentCreateFormInputValues) => IncidentCreateFormInputValues;
    onSuccess?: (fields: IncidentCreateFormInputValues) => void;
    onError?: (fields: IncidentCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: IncidentCreateFormInputValues) => IncidentCreateFormInputValues;
    onValidate?: IncidentCreateFormValidationValues;
} & React.CSSProperties>;
export default function IncidentCreateForm(props: IncidentCreateFormProps): React.ReactElement;
