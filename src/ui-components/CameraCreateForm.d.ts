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
export declare type CameraCreateFormInputValues = {
    name?: string;
    latitude?: number;
    longitude?: number;
    rtsp_stream?: string;
    rtsp_params?: string;
};
export declare type CameraCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    latitude?: ValidationFunction<number>;
    longitude?: ValidationFunction<number>;
    rtsp_stream?: ValidationFunction<string>;
    rtsp_params?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CameraCreateFormOverridesProps = {
    CameraCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    latitude?: PrimitiveOverrideProps<TextFieldProps>;
    longitude?: PrimitiveOverrideProps<TextFieldProps>;
    rtsp_stream?: PrimitiveOverrideProps<TextFieldProps>;
    rtsp_params?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CameraCreateFormProps = React.PropsWithChildren<{
    overrides?: CameraCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CameraCreateFormInputValues) => CameraCreateFormInputValues;
    onSuccess?: (fields: CameraCreateFormInputValues) => void;
    onError?: (fields: CameraCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CameraCreateFormInputValues) => CameraCreateFormInputValues;
    onValidate?: CameraCreateFormValidationValues;
} & React.CSSProperties>;
export default function CameraCreateForm(props: CameraCreateFormProps): React.ReactElement;
