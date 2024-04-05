/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Sopcheckeditem } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SopcheckeditemUpdateFormInputValues = {
    name?: string;
    description?: string;
};
export declare type SopcheckeditemUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SopcheckeditemUpdateFormOverridesProps = {
    SopcheckeditemUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SopcheckeditemUpdateFormProps = React.PropsWithChildren<{
    overrides?: SopcheckeditemUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    sopcheckeditem?: Sopcheckeditem;
    onSubmit?: (fields: SopcheckeditemUpdateFormInputValues) => SopcheckeditemUpdateFormInputValues;
    onSuccess?: (fields: SopcheckeditemUpdateFormInputValues) => void;
    onError?: (fields: SopcheckeditemUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SopcheckeditemUpdateFormInputValues) => SopcheckeditemUpdateFormInputValues;
    onValidate?: SopcheckeditemUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SopcheckeditemUpdateForm(props: SopcheckeditemUpdateFormProps): React.ReactElement;
