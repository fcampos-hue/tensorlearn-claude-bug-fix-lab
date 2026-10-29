import test from 'node:test';
import assert from 'node:assert/strict';
import { getClaim } from '../../src/claims.mjs';

// Incident: viewer user-4 received claim-B, owned by user-42 (ownerId was prefix-matched).
test('viewer user-4 does not receive claim-B owned by user-42', () => {
  const claims = [{ id: 'claim-B', ownerId: 'user-42', status: 'pending' }];
  assert.equal(getClaim(claims, 'user-4', 'claim-B'), null);
});

test('the exact owner user-42 still receives claim-B', () => {
  const claim = { id: 'claim-B', ownerId: 'user-42', status: 'pending' };
  assert.equal(getClaim([claim], 'user-42', 'claim-B'), claim);
});
