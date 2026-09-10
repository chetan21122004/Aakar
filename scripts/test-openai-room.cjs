const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')

// Verify request shape and error handling without using credentials or paid API calls.
const source = fs.readFileSync('lib/openai-see-in-room.ts', 'utf8').replace('import "server-only"', '')
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
let calls = 0
let status = 200
const sandbox = {
  exports: {}, Buffer, Uint8Array, Blob, FormData, AbortSignal,
  process: { env: { OPENAI_API_KEY: 'test-placeholder' } },
  fetch: async (url, request) => {
    calls++
    assert.equal(url, 'https://api.openai.com/v1/images/edits')
    assert.equal(request.body.getAll('image[]').length, 2)
    assert.equal(request.body.get('n'), '1')
    assert.equal(request.body.get('quality'), 'low')
    assert.equal(request.body.get('model'), 'gpt-image-2.5-sunburst')
    return { ok: status === 200, status, json: async () => ({ data: [{ b64_json: 'mock-output' }] }) }
  },
}
vm.runInNewContext(compiled, sandbox)
const input = { room: { mimeType: 'image/jpeg', data: 'aGk=' }, product: { mimeType: 'image/webp', data: 'aGk=' }, productName: 'Console', category: 'Furniture' }
;(async () => {
  const output = await sandbox.exports.composeFurnitureInRoom(input)
  assert.equal(output.data, 'mock-output')
  assert.equal(output.mimeType, 'image/png')
  status = 429
  await assert.rejects(sandbox.exports.composeFurnitureInRoom(input), /capacity/)
  assert.equal(calls, 2, 'No automatic paid retries')
  sandbox.process.env.OPENAI_API_KEY = ''
  await assert.rejects(sandbox.exports.composeFurnitureInRoom(input), /not configured/)
  assert.equal(calls, 2, 'Missing keys must not send a request')
  console.log('PASS: two-image payload, response, quota error, no retries, missing key')
})().catch(error => { console.error(error); process.exitCode = 1 })
