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
export declare type SopitemCreateFormInputValues = {
    name?: string;
    order?: number;
};
export declare type SopitemCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    order?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SopitemCreateFormOverridesProps = {
    SopitemCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    order?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SopitemCreateFormProps = React.PropsWithChildren<{
    overrides?: SopitemCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SopitemCreateFormInputValues) => SopitemCreateFormInputValues;
    onSuccess?: (fields: SopitemCreateFormInputValues) => void;
    onError?: (fields: SopitemCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SopitemCreateFormInputValues) => SopitemCreateFormInputValues;
    onValidate?: SopitemCreateFormValidationValues;
} & React.CSSProperties>;
export default function SopitemCreateForm(props: SopitemCreateFormProps): React.ReactElement;
