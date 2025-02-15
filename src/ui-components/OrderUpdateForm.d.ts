/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Order } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type OrderUpdateFormInputValues = {
    customerID?: string;
    accountRepresentativeID?: string;
    productID?: string;
    status?: string;
    amount?: number;
    date?: string;
};
export declare type OrderUpdateFormValidationValues = {
    customerID?: ValidationFunction<string>;
    accountRepresentativeID?: ValidationFunction<string>;
    productID?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    amount?: ValidationFunction<number>;
    date?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type OrderUpdateFormOverridesProps = {
    OrderUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    customerID?: PrimitiveOverrideProps<TextFieldProps>;
    accountRepresentativeID?: PrimitiveOverrideProps<TextFieldProps>;
    productID?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type OrderUpdateFormProps = React.PropsWithChildren<{
    overrides?: OrderUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    order?: Order;
    onSubmit?: (fields: OrderUpdateFormInputValues) => OrderUpdateFormInputValues;
    onSuccess?: (fields: OrderUpdateFormInputValues) => void;
    onError?: (fields: OrderUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OrderUpdateFormInputValues) => OrderUpdateFormInputValues;
    onValidate?: OrderUpdateFormValidationValues;
} & React.CSSProperties>;
export default function OrderUpdateForm(props: OrderUpdateFormProps): React.ReactElement;
