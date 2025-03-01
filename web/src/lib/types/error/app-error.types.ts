import { type ZodError } from 'zod';


export type AppError<Ent = any, Status extends number = 500> = Error & Partial<ZodError<Ent>> & { status: Status; };

export type AppServerError<Ent = any, Status extends number = 500> = AppError<Ent, Status>;
export type AppClientError<Ent = any, Status extends number = 400 | 404> = AppError<Ent, Status>;