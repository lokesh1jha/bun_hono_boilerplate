import { Hono } from 'hono'
import bookRouter from "./routes/book.ts"
import { streamText } from 'hono/streaming'
import { logger } from 'hono/logger'
import Top from "./page.tsx"

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


  app.get('/public', (c) => {
    const messages = ['Good Morning', 'Good Evening', 'Good Night']
    return c.html(<Top messages={messages} />)
  })

app.get('/', (c) => c.text('Hello Bun!'))


export default app;