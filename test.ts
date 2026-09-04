import { db } from './src/prisma/db.js';

const player = await db.orm.public.Player.create({
  name: 'Kylian',
  surname: 'Mbappe',
  teamId: 1,
});

console.log(player);