import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { timing } from 'hono/timing'
import { jsxRenderer } from 'hono/jsx-renderer'
import home from './routes/home/index.tsx'
import healthz from './routes/healthz.ts'
import { datastarMiddleware } from './lib/datastar.tsx'
import { ErrorArticle } from './routes/home/components/ErrorArticle.tsx'

console.log('Starting...')
const app = new Hono()

app.use(logger())
app.use(timing())
app.use('*', datastarMiddleware)
app.use(
  '*',
  jsxRenderer(({ children }) => <html>{children}</html>, { docType: true }),
)

app.get('/favicon.ico', (c) => c.body(null, 204))
app.route('/', home)
app.route('/healthz', healthz)

app.notFound((c) => c.text('No such route, try another!', 404))

app.onError((err: Error, c) => {
  console.error(`${err}`)
  console.error(`${err.stack}`)
  const message = err instanceof Error ? err.message : JSON.stringify(err)
  return c.html(<ErrorArticle message={message} />)
})
Deno.serve({ port: 3000 }, app.fetch)
