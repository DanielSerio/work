import type { AppError } from "../error/app-error.types";
import type { CompanyEntity } from "../models/company/entity.types";
import type { AppResponse } from "../utility";

interface ListResponseBasis<Status extends number, Type, ErrorType> extends AppResponse<Type> {
  status: Status;
  message: string;
  data: Type | null;
  error?: ErrorType;
};

export interface ListSuccessResponse<Type> extends ListResponseBasis<200, Type, AppError> {
  message: string;
  data: Type;
}

export interface ListFailureResponse<Status extends number = 500> extends ListResponseBasis<Status, any, AppError<any, Status>> {
  message: string;
  data: null;
  error: AppError<any, Status>;
}
export type ListResponse<Type, ErrStatus extends number> = ListSuccessResponse<Type> | ListFailureResponse<ErrStatus>;

export type CompanyListResponse = ListResponse<CompanyEntity[], 400 | 500>;
