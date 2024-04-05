/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Sensor } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SensorUpdateFormInputValues = {
    name?: string;
    channel?: string;
    latitude?: number;
    longitude?: number;
};
export declare type SensorUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    channel?: ValidationFunction<string>;
    latitude?: ValidationFunction<number>;
    longitude?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SensorUpdateFormOverridesProps = {
    SensorUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    channel?: PrimitiveOverrideProps<TextFieldProps>;
    latitude?: PrimitiveOverrideProps<TextFieldProps>;
    longitude?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SensorUpdateFormProps = React.PropsWithChildren<{
    overrides?: SensorUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    sensor?: Sensor;
    onSubmit?: (fields: SensorUpdateFormInputValues) => SensorUpdateFormInputValues;
    onSuccess?: (fields: SensorUpdateFormInputValues) => void;
    onError?: (fields: SensorUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SensorUpdateFormInputValues) => SensorUpdateFormInputValues;
    onValidate?: SensorUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SensorUpdateForm(props: SensorUpdateFormProps): React.ReactElement;
