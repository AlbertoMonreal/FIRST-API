import { FieldDef } from 'pg';

export interface DBQueryResult {
  rows: Array<any>;
  rowCount: number;
  result: {
    command: string;
    oid: number;
    fields: FieldDef[];
  };
}
