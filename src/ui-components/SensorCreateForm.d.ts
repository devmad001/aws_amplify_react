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
export declare type SensorCreateFormInputValues = {
    name?: string;
    channel?: string;
    latitude?: number;
    longitude?: number;
};
export declare type SensorCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    channel?: ValidationFunction<string>;
    latitude?: ValidationFunction<number>;
    longitude?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SensorCreateFormOverridesProps = {
    SensorCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    channel?: PrimitiveOverrideProps<TextFieldProps>;
    latitude?: PrimitiveOverrideProps<TextFieldProps>;
    longitude?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SensorCreateFormProps = React.PropsWithChildren<{
    overrides?: SensorCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SensorCreateFormInputValues) => SensorCreateFormInputValues;
    onSuccess?: (fields: SensorCreateFormInputValues) => void;
    onError?: (fields: SensorCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SensorCreateFormInputValues) => SensorCreateFormInputValues;
    onValidate?: SensorCreateFormValidationValues;
} & React.CSSProperties>;
export default function SensorCreateForm(props: SensorCreateFormProps): React.ReactElement;
