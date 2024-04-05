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
export declare type SiteCreateFormInputValues = {
    customer_name?: string;
};
export declare type SiteCreateFormValidationValues = {
    customer_name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SiteCreateFormOverridesProps = {
    SiteCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    customer_name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SiteCreateFormProps = React.PropsWithChildren<{
    overrides?: SiteCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SiteCreateFormInputValues) => SiteCreateFormInputValues;
    onSuccess?: (fields: SiteCreateFormInputValues) => void;
    onError?: (fields: SiteCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SiteCreateFormInputValues) => SiteCreateFormInputValues;
    onValidate?: SiteCreateFormValidationValues;
} & React.CSSProperties>;
export default function SiteCreateForm(props: SiteCreateFormProps): React.ReactElement;
