import { test } from 'node:test';
import assert from 'node:assert';
import bcrypt from 'bcrypt';
import { compareHash } from './authentification.js';

test('compareHash retourne true pour un mot de passe correct', async () => {
  const motDePasse = 'monMotDePasse123';
  const hash = await bcrypt.hash(motDePasse, 10);

  const result = await compareHash(motDePasse, hash);
  assert.strictEqual(result, true);
});

test('compareHash lève une erreur pour un mot de passe incorrect', async () => {
  const hash = await bcrypt.hash('bonMotDePasse', 10);

  await assert.rejects(
    () => compareHash('mauvaisMotDePasse', hash),
    { status: 401 }
  );
});