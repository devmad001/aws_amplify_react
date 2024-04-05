/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Site } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SiteUpdateFormInputValues = {
    customer_name?: string;
};
export declare type SiteUpdateFormValidationValues = {
    customer_name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SiteUpdateFormOverridesProps = {
    SiteUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    customer_name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SiteUpdateFormProps = React.PropsWithChildren<{
    overrides?: SiteUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    site?: Site;
    onSubmit?: (fields: SiteUpdateFormInputValues) => SiteUpdateFormInputValues;
    onSuccess?: (fields: SiteUpdateFormInputValues) => void;
    onError?: (fields: SiteUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SiteUpdateFormInputValues) => SiteUpdateFormInputValues;
    onValidate?: SiteUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SiteUpdateForm(props: SiteUpdateFormProps): React.ReactElement;
