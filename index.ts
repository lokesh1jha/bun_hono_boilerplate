import { Hono } from 'hono'

const app = new Hono()

// console.log("Hello via Bun!");

app.get('/', (c) => c.text('Hello Bun!'))


Bun.serve({
    fetch: app.fetch,
    port: process.env.PORT || 4000
})  