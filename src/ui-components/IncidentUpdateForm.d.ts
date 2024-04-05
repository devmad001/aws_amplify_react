/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Incident } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type IncidentUpdateFormInputValues = {
    name?: string;
    description?: string;
    site_id?: string;
};
export declare type IncidentUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    site_id?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type IncidentUpdateFormOverridesProps = {
    IncidentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    site_id?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type IncidentUpdateFormProps = React.PropsWithChildren<{
    overrides?: IncidentUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    incident?: Incident;
    onSubmit?: (fields: IncidentUpdateFormInputValues) => IncidentUpdateFormInputValues;
    onSuccess?: (fields: IncidentUpdateFormInputValues) => void;
    onError?: (fields: IncidentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: IncidentUpdateFormInputValues) => IncidentUpdateFormInputValues;
    onValidate?: IncidentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function IncidentUpdateForm(props: IncidentUpdateFormProps): React.ReactElement;
