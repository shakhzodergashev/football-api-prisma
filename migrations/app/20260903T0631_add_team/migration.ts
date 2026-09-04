#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/94fd784e78c8b0566cae7f306dc421b72f864487b52d801e6e2da651a255ec4d/contract';
import endContract from '../../snapshots/94fd784e78c8b0566cae7f306dc421b72f864487b52d801e6e2da651a255ec4d/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/cebaa695418f82d056c5f3426da0f2777d8996cdf0c44605b37b1fd3aad1e2d1/contract';
import startContract from '../../snapshots/cebaa695418f82d056c5f3426da0f2777d8996cdf0c44605b37b1fd3aad1e2d1/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'team',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
