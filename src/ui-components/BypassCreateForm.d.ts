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
export declare type BypassCreateFormInputValues = {
    site_id?: string;
    start_time?: string;
    end_time?: string;
};
export declare type BypassCreateFormValidationValues = {
    site_id?: ValidationFunction<string>;
    start_time?: ValidationFunction<string>;
    end_time?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BypassCreateFormOverridesProps = {
    BypassCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    site_id?: PrimitiveOverrideProps<TextFieldProps>;
    start_time?: PrimitiveOverrideProps<TextFieldProps>;
    end_time?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BypassCreateFormProps = React.PropsWithChildren<{
    overrides?: BypassCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: BypassCreateFormInputValues) => BypassCreateFormInputValues;
    onSuccess?: (fields: BypassCreateFormInputValues) => void;
    onError?: (fields: BypassCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BypassCreateFormInputValues) => BypassCreateFormInputValues;
    onValidate?: BypassCreateFormValidationValues;
} & React.CSSProperties>;
export default function BypassCreateForm(props: BypassCreateFormProps): React.ReactElement;
