import { Hono } from 'hono'
import bookRouter from "./routes/book"


const app = new Hono()

// console.log("Hello via Bun!");
app.route("/book", bookRouter)

app.get('/', (c) => c.text('Hello Bun!'))



Bun.serve({
    fetch: app.fetch,
    port: process.env.PORT || 4000
})  