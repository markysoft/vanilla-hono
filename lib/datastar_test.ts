import { assert, assertEquals } from '@std/assert'
import { datastarMiddleware, readSignals } from './datastar.tsx'
import type { Context } from 'hono'

Deno.test('readSignals returns empty object when Datastar-Request header is not true', () => {
  const c = {
    req: {
      method: 'GET',
      header: (name: string) => (name === 'Datastar-Request' ? undefined : undefined),
      query: (_name: string) => undefined,
    },
  } as unknown as Context

  const result = readSignals(c)
  assertEquals(result, {})
})

Deno.test('readSignals parses JSON from datastar query when Datastar-Request header is true', () => {
  const payload = { foo: 'bar', count: 3 }

  const c = {
    req: {
      method: 'GET',
      header: (name: string) => (name === 'Datastar-Request' ? 'true' : undefined),
      query: (name: string) => (name === 'datastar' ? JSON.stringify(payload) : undefined),
    },
  } as unknown as Context

  const result = readSignals(c)
  assertEquals(result, payload)
})

Deno.test('readSignals returns empty object when datastar query is invalid JSON', () => {
  const c = {
    req: {
      method: 'GET',
      header: (name: string) => (name === 'Datastar-Request' ? 'true' : undefined),
      query: (name: string) => (name === 'datastar' ? '{invalid json' : undefined),
    },
  } as unknown as Context

  const result = readSignals(c)
  assertEquals(result, {})
})

Deno.test('datastarMiddleware sets signals and isDatastar for Datastar requests', async () => {
  const payload = { hello: 'world' }
  const contextVars: Record<string, unknown> = {}
  let nextCalled = false

  const c = {
    req: {
      method: 'GET',
      header: (name: string) => (name === 'Datastar-Request' ? 'true' : undefined),
      query: (name: string) => (name === 'datastar' ? JSON.stringify(payload) : undefined),
    },
    set: (key: string, value: unknown) => {
      contextVars[key] = value
    },
  } as unknown as Context

  const next = () => {
    nextCalled = true
    return Promise.resolve()
  }

  await datastarMiddleware(c, next)

  assert(nextCalled)
  assertEquals(contextVars.signals, payload)
  assertEquals(contextVars.isDatastar, true)
})

Deno.test('datastarMiddleware sets isDatastar false when header is not true', async () => {
  const contextVars: Record<string, unknown> = {}
  let nextCalled = false

  const c = {
    req: {
      method: 'GET',
      header: (_name: string) => undefined,
      query: (_name: string) => undefined,
    },
    set: (key: string, value: unknown) => {
      contextVars[key] = value
    },
  } as unknown as Context

  const next = () => {
    nextCalled = true
    return Promise.resolve()
  }

  await datastarMiddleware(c, next)

  assert(nextCalled)
  assertEquals(contextVars.signals, {})
  assertEquals(contextVars.isDatastar, false)
})
