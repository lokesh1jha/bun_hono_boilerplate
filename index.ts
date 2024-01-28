import { Hono } from 'hono'
import bookRouter from "./routes/book"
import { streamText } from 'hono/streaming'
import { logger } from 'hono/logger'

const app = new Hono()

app.use('*', logger())

// console.log("Hello via Bun!");
app.route("/book", bookRouter)

app.get('/stream', (c) => {
    return streamText(c, async (stream) => {
        for (let i = 1; i <= 10; i++) {
            await stream.sleep(1000)
            await stream.writeln(i.toString());
        }
      // Write a text with a new line ('\n').
      await stream.writeln('Hello')
      // Wait 1 second.
      await stream.sleep(1000)
      // Write a text without a new line.
      await stream.write(`Hono!`)
    })
  })

app.get('/', (c) => c.text('Hello Bun!'))

Bun.serve({
    fetch: app.fetch,
    port: process.env.PORT || 4000
})  