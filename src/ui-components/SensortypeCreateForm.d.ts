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
export declare type SensortypeCreateFormInputValues = {
    name?: string;
};
export declare type SensortypeCreateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SensortypeCreateFormOverridesProps = {
    SensortypeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SensortypeCreateFormProps = React.PropsWithChildren<{
    overrides?: SensortypeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SensortypeCreateFormInputValues) => SensortypeCreateFormInputValues;
    onSuccess?: (fields: SensortypeCreateFormInputValues) => void;
    onError?: (fields: SensortypeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SensortypeCreateFormInputValues) => SensortypeCreateFormInputValues;
    onValidate?: SensortypeCreateFormValidationValues;
} & React.CSSProperties>;
export default function SensortypeCreateForm(props: SensortypeCreateFormProps): React.ReactElement;
