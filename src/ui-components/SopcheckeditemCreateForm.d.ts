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
export declare type SopcheckeditemCreateFormInputValues = {
    name?: string;
    description?: string;
};
export declare type SopcheckeditemCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SopcheckeditemCreateFormOverridesProps = {
    SopcheckeditemCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SopcheckeditemCreateFormProps = React.PropsWithChildren<{
    overrides?: SopcheckeditemCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SopcheckeditemCreateFormInputValues) => SopcheckeditemCreateFormInputValues;
    onSuccess?: (fields: SopcheckeditemCreateFormInputValues) => void;
    onError?: (fields: SopcheckeditemCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SopcheckeditemCreateFormInputValues) => SopcheckeditemCreateFormInputValues;
    onValidate?: SopcheckeditemCreateFormValidationValues;
} & React.CSSProperties>;
export default function SopcheckeditemCreateForm(props: SopcheckeditemCreateFormProps): React.ReactElement;
