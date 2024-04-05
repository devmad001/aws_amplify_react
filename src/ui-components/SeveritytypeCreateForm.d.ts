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
export declare type SeveritytypeCreateFormInputValues = {
    name?: string;
    description?: string;
};
export declare type SeveritytypeCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SeveritytypeCreateFormOverridesProps = {
    SeveritytypeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SeveritytypeCreateFormProps = React.PropsWithChildren<{
    overrides?: SeveritytypeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SeveritytypeCreateFormInputValues) => SeveritytypeCreateFormInputValues;
    onSuccess?: (fields: SeveritytypeCreateFormInputValues) => void;
    onError?: (fields: SeveritytypeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SeveritytypeCreateFormInputValues) => SeveritytypeCreateFormInputValues;
    onValidate?: SeveritytypeCreateFormValidationValues;
} & React.CSSProperties>;
export default function SeveritytypeCreateForm(props: SeveritytypeCreateFormProps): React.ReactElement;
