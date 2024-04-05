/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Sensortype } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SensortypeUpdateFormInputValues = {
    name?: string;
};
export declare type SensortypeUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SensortypeUpdateFormOverridesProps = {
    SensortypeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SensortypeUpdateFormProps = React.PropsWithChildren<{
    overrides?: SensortypeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    sensortype?: Sensortype;
    onSubmit?: (fields: SensortypeUpdateFormInputValues) => SensortypeUpdateFormInputValues;
    onSuccess?: (fields: SensortypeUpdateFormInputValues) => void;
    onError?: (fields: SensortypeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SensortypeUpdateFormInputValues) => SensortypeUpdateFormInputValues;
    onValidate?: SensortypeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SensortypeUpdateForm(props: SensortypeUpdateFormProps): React.ReactElement;
