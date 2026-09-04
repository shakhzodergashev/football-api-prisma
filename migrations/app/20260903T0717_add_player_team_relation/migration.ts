#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/04504ce29ce28638f6e230b935bbe62ae3bbc173e89f96b801c320b66da6bdf0/contract';
import endContract from '../../snapshots/04504ce29ce28638f6e230b935bbe62ae3bbc173e89f96b801c320b66da6bdf0/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/94fd784e78c8b0566cae7f306dc421b72f864487b52d801e6e2da651a255ec4d/contract';
import startContract from '../../snapshots/94fd784e78c8b0566cae7f306dc421b72f864487b52d801e6e2da651a255ec4d/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'player',
        column: col('teamId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
      }),
      this.createIndex({
        schema: 'public',
        table: 'player',
        index: 'player_teamId_idx_f2b72ab3',
        columns: ['teamId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'player',
        foreignKey: {
          name: 'player_teamId_fkey',
          columns: ['teamId'],
          references: { schema: 'public', table: 'team', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
