import type { AppError } from "../error/app-error.types";
import type { CompanyEntity } from "../models/company/entity.types";
import type { AppResponse } from "../utility";

interface ItemResponseBasis<Status extends number, Type, ErrorType> extends AppResponse<Type> {
  status: Status;
  message: string;
  data: Type | null;
  error?: ErrorType;
};

export interface ItemSuccessResponse<Type> extends ItemResponseBasis<200, Type, AppError> {
  message: string;
  data: Type;
}

export interface ItemFailureResponse<Status extends number = 500> extends ItemResponseBasis<Status, any, AppError<any, Status>> {
  message: string;
  data: null;
  error: AppError<any, Status>;
}
export type ItemResponse<Type, ErrStatus extends number> = ItemSuccessResponse<Type> | ItemFailureResponse<ErrStatus>;

export type CompanyItemResponse = ItemResponse<CompanyEntity, 400 | 404 | 500>;
