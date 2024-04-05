/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Bypass } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type BypassUpdateFormInputValues = {
    site_id?: string;
    start_time?: string;
    end_time?: string;
};
export declare type BypassUpdateFormValidationValues = {
    site_id?: ValidationFunction<string>;
    start_time?: ValidationFunction<string>;
    end_time?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BypassUpdateFormOverridesProps = {
    BypassUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    site_id?: PrimitiveOverrideProps<TextFieldProps>;
    start_time?: PrimitiveOverrideProps<TextFieldProps>;
    end_time?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BypassUpdateFormProps = React.PropsWithChildren<{
    overrides?: BypassUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    bypass?: Bypass;
    onSubmit?: (fields: BypassUpdateFormInputValues) => BypassUpdateFormInputValues;
    onSuccess?: (fields: BypassUpdateFormInputValues) => void;
    onError?: (fields: BypassUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BypassUpdateFormInputValues) => BypassUpdateFormInputValues;
    onValidate?: BypassUpdateFormValidationValues;
} & React.CSSProperties>;
export default function BypassUpdateForm(props: BypassUpdateFormProps): React.ReactElement;
