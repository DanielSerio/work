export interface CodedEntityBasis {
  id?: number | null;
  createdAt?: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  code: string;
  name: string;
}

export interface CodedEntityInsert extends CodedEntityBasis {
  [k: string]: string | undefined;
  id?: never;
  createdAt?: never;
  updatedAt?: never;
  deletedAt?: never;
  code: string;
  name: string;
}

export interface CodedEntityRecord extends CodedEntityBasis {
  [k: string]: string | number | Date | null;
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  code: string;
  name: string;
}


export interface TemporaryCodedEntityRecord extends CodedEntityBasis {
  [k: string]: string | Date | null | undefined;
  createdAt?: never;
  updatedAt?: never;
  deletedAt?: never;
  id: null;
  code: string;
  name: string;
}
