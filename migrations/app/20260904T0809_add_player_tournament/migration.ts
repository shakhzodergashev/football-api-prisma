#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/6c24c7464fe2f862ec3303521a4a49d4099318be0188222602b4b47c094f6b58/contract';
import endContract from '../../snapshots/6c24c7464fe2f862ec3303521a4a49d4099318be0188222602b4b47c094f6b58/contract.json' with { type: 'json' };
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
        table: 'playerTournament',
        columns: [
          col('playerId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('tournamentId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['playerId', 'tournamentId'])],
      }),
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
      this.createTable({
        schema: 'public',
        table: 'tournament',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
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
          references: { schema: 'public', table: 'player', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'playerTournament',
        foreignKey: {
          name: 'playerTournament_tournamentId_fkey',
          columns: ['tournamentId'],
          references: { schema: 'public', table: 'tournament', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'player',
        foreignKey: {
          name: 'player_teamId_fkey',
          columns: ['teamId'],
          references: { schema: 'public', table: 'team', columns: ['id'] },
          onDelete: 'setNull',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
