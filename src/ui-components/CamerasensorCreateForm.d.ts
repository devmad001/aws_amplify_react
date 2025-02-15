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
export declare type CamerasensorCreateFormInputValues = {
    name?: string;
    description?: string;
};
export declare type CamerasensorCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CamerasensorCreateFormOverridesProps = {
    CamerasensorCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CamerasensorCreateFormProps = React.PropsWithChildren<{
    overrides?: CamerasensorCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CamerasensorCreateFormInputValues) => CamerasensorCreateFormInputValues;
    onSuccess?: (fields: CamerasensorCreateFormInputValues) => void;
    onError?: (fields: CamerasensorCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CamerasensorCreateFormInputValues) => CamerasensorCreateFormInputValues;
    onValidate?: CamerasensorCreateFormValidationValues;
} & React.CSSProperties>;
export default function CamerasensorCreateForm(props: CamerasensorCreateFormProps): React.ReactElement;
