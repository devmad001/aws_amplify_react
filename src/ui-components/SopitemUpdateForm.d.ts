/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Sopitem } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SopitemUpdateFormInputValues = {
    name?: string;
    order?: number;
};
export declare type SopitemUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    order?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SopitemUpdateFormOverridesProps = {
    SopitemUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    order?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SopitemUpdateFormProps = React.PropsWithChildren<{
    overrides?: SopitemUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    sopitem?: Sopitem;
    onSubmit?: (fields: SopitemUpdateFormInputValues) => SopitemUpdateFormInputValues;
    onSuccess?: (fields: SopitemUpdateFormInputValues) => void;
    onError?: (fields: SopitemUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SopitemUpdateFormInputValues) => SopitemUpdateFormInputValues;
    onValidate?: SopitemUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SopitemUpdateForm(props: SopitemUpdateFormProps): React.ReactElement;
