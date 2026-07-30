import test from 'node:test';
import assert from 'node:assert/strict';
import { cepService } from './cepService.js';

test('retorna erro quando o CEP está vazio', async () => {
  const result = await cepService('');

  assert.equal(result.success, false);
  assert.equal(result.message, 'CEP é obrigatório.');
});

test('retorna erro quando o CEP contém caracteres não numéricos', async () => {
  const result = await cepService('123-456');

  assert.equal(result.success, false);
  assert.equal(result.message, 'CEP deve conter apenas números.');
});

test('retorna erro quando o CEP não tem exatamente 8 dígitos', async () => {
  const result = await cepService('12345');

  assert.equal(result.success, false);
  assert.equal(result.message, 'CEP deve conter exatamente 8 dígitos.');
});
