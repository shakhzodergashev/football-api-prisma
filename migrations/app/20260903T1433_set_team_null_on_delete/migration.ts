#!/usr/bin/env -S node

import type { Contract as Start } from '../../snapshots/04504ce29ce28638f6e230b935bbe62ae3bbc173e89f96b801c320b66da6bdf0/contract';

import startContract from '../../snapshots/04504ce29ce28638f6e230b935bbe62ae3bbc173e89f96b801c320b66da6bdf0/contract.json' with { type: 'json' };

import type { Contract as End } from '../../snapshots/3e76e5504342d1ac47cd5c975740e8dec79d8ce51c2bae6ffea3f5bc01e042fc/contract';

import endContract from '../../snapshots/3e76e5504342d1ac47cd5c975740e8dec79d8ce51c2bae6ffea3f5bc01e042fc/contract.json' with { type: 'json' };

import {
  Migration,
  MigrationCLI,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
  return [
    this.dropConstraint({
      schema: 'public',
      table: 'player',
      constraint: 'player_teamId_fkey',
      kind: 'foreignKey',
    }),

    this.addForeignKey({
      schema: 'public',
      table: 'player',
      foreignKey: {
        columns: ['teamId'],
        references: {
          schema: 'public',
          table: 'team',
          columns: ['id'],
        },
        name: 'player_teamId_fkey',
        onDelete: 'setNull',
      },
    }),
  ];
}
}

MigrationCLI.run(import.meta.url, M);