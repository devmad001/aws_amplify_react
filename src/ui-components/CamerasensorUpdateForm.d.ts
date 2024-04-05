/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Camerasensor } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CamerasensorUpdateFormInputValues = {
    name?: string;
    description?: string;
};
export declare type CamerasensorUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CamerasensorUpdateFormOverridesProps = {
    CamerasensorUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CamerasensorUpdateFormProps = React.PropsWithChildren<{
    overrides?: CamerasensorUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    camerasensor?: Camerasensor;
    onSubmit?: (fields: CamerasensorUpdateFormInputValues) => CamerasensorUpdateFormInputValues;
    onSuccess?: (fields: CamerasensorUpdateFormInputValues) => void;
    onError?: (fields: CamerasensorUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CamerasensorUpdateFormInputValues) => CamerasensorUpdateFormInputValues;
    onValidate?: CamerasensorUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CamerasensorUpdateForm(props: CamerasensorUpdateFormProps): React.ReactElement;
