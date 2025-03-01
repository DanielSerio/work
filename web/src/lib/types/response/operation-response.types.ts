import type { AppError } from "../error/app-error.types";
import type { CompanyEntity } from "../models/company/entity.types";
import type { AppResponse } from "../utility";

interface OperationResponseBasis<Status extends number, Type, ErrorType> extends AppResponse<Type> {
  status: Status;
  message: string;
  data: Type | null;
  error?: ErrorType;
};

export interface OperationSuccessResponse<Type> extends OperationResponseBasis<200, Type, AppError> {
  message: string;
  data: Type;
}

export interface OperationFailureResponse<Status extends number = 500> extends OperationResponseBasis<Status, any, AppError<any, Status>> {
  message: string;
  data: null;
  error: AppError<any, Status>;
}

export type OperationResponse<Type, ErrStatus extends number> = OperationSuccessResponse<Type> | OperationFailureResponse<ErrStatus>;

export type CompanyOperationResponse = OperationResponse<CompanyEntity, 400 | 500>;
