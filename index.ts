console.log("Hello via Bun!");

Bun.serve({
    fetch: (request) => {
        return new Response("Hello Bun !!")
    },
    port: process.env.PORT || 4000
})