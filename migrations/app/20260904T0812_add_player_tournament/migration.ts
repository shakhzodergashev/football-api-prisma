#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/3e76e5504342d1ac47cd5c975740e8dec79d8ce51c2bae6ffea3f5bc01e042fc/contract';
import startContract from '../../snapshots/3e76e5504342d1ac47cd5c975740e8dec79d8ce51c2bae6ffea3f5bc01e042fc/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/6c24c7464fe2f862ec3303521a4a49d4099318be0188222602b4b47c094f6b58/contract';
import endContract from '../../snapshots/6c24c7464fe2f862ec3303521a4a49d4099318be0188222602b4b47c094f6b58/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  col,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
  return [
    this.createTable({
      schema: 'public',
      table: 'tournament',
      columns: [
        col('id', 'SERIAL', {
          notNull: true,
          codecRef: { codecId: 'pg/int4@1' },
        }),
        col('name', 'text', {
          notNull: true,
          codecRef: { codecId: 'pg/text@1' },
        }),
      ],
      constraints: [primaryKey(['id'])],
    }),

    this.createTable({
      schema: 'public',
      table: 'playerTournament',
      columns: [
        col('playerId', 'int4', {
          notNull: true,
          codecRef: { codecId: 'pg/int4@1' },
        }),
        col('tournamentId', 'int4', {
          notNull: true,
          codecRef: { codecId: 'pg/int4@1' },
        }),
      ],
      constraints: [primaryKey(['playerId', 'tournamentId'])],
    }),

    this.createIndex({
  schema: 'public',
  table: 'playerTournament',
  index: 'playerTournament_playerId_idx_710cf1aa',
columns: ['playerId'],
  
}),

this.createIndex({
  schema: 'public',
  table: 'playerTournament',
  index: 'playerTournament_tournamentId_idx_d0bd97a6',
columns: ['tournamentId'],
}),

    this.addForeignKey({
      schema: 'public',
      table: 'playerTournament',
      foreignKey: {
        name: 'playerTournament_playerId_fkey',
        columns: ['playerId'],
        references: {
          schema: 'public',
          table: 'player',
          columns: ['id'],
        },
      },
    }),

    this.addForeignKey({
      schema: 'public',
      table: 'playerTournament',
      foreignKey: {
        name: 'playerTournament_tournamentId_fkey',
        columns: ['tournamentId'],
        references: {
          schema: 'public',
          table: 'tournament',
          columns: ['id'],
        },
      },
    }),
  ];
}
}

MigrationCLI.run(import.meta.url, M);
