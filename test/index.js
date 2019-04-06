import test from 'ava'
import main from '../dist/index.js'

test('foo', t => {
  main()
  t.pass()
})

test('bar', async t => {
  const bar = Promise.resolve('bar')
  t.is(await bar, 'bar')
})
