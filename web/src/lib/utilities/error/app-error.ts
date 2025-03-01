import type { ZodIssue } from "astro/zod";
import type { AppError } from "../../types/error/app-error.types";

interface AppErrorParams<Status extends number = 500> {
  status: Status;
  message: string;
  name?: string;
  cause?: unknown;
  stack?: string | undefined;
  issues?: ZodIssue[] | undefined;
}

class AppErrorData<Ent = any, Status extends number = 500> extends Error implements AppError<Ent, Status> {
  status!: Status;
  name!: string;
  message!: string;
  cause?: unknown;
  stack?: string;
  issues?: ZodIssue[];

  get json(): AppError<Ent, Status> {
    return {
      status: this.status,
      name: this.name,
      message: this.message,
      cause: this.cause,
      stack: this.stack,
      issues: this.issues
    };
  }

  constructor(params: AppErrorParams<Status>) {
    super(params.message);
    this._init(params);
  }

  private _errorNameSwitch = (status: number) => {
    switch (status) {
      case 400:
        return 'ClientError';
      case 404:
        return 'NotFoundError';
      case 500:
      default:
        return 'InternalServerError';
    }
  };

  private _setName = (status: number, name?: string) => {
    if (name) {
      this.name = name;
    } else {
      this.name = this._errorNameSwitch(status);
    }
  };

  private _init = (params: AppErrorParams<Status>) => {
    this._setName(params.status, params.name);
    this.status = params.status;

    Object.assign(params, this);
  };
}

/**
 * Creates an instance of `AppErrorData` and returns its JSON representation.
 * @param params - The `params` parameter in the `createError` function is of type
 * `AppErrorParams<Status>`. This means it expects an object with properties defined by the
 * `AppErrorParams` interface, where `Status` is a number.
 */
export function createError<Ent = any, Status extends number = 500>(params: AppErrorParams<Status>) {
  return new AppErrorData<Ent, Status>(params).json;
}
