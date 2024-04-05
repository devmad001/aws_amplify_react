/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Incidenttype } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type IncidenttypeUpdateFormInputValues = {
    name?: string;
    description?: string;
};
export declare type IncidenttypeUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type IncidenttypeUpdateFormOverridesProps = {
    IncidenttypeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type IncidenttypeUpdateFormProps = React.PropsWithChildren<{
    overrides?: IncidenttypeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    incidenttype?: Incidenttype;
    onSubmit?: (fields: IncidenttypeUpdateFormInputValues) => IncidenttypeUpdateFormInputValues;
    onSuccess?: (fields: IncidenttypeUpdateFormInputValues) => void;
    onError?: (fields: IncidenttypeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: IncidenttypeUpdateFormInputValues) => IncidenttypeUpdateFormInputValues;
    onValidate?: IncidenttypeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function IncidenttypeUpdateForm(props: IncidenttypeUpdateFormProps): React.ReactElement;
