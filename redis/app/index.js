const express = require("express")
const redis = require("redis")

const app = express()
const client = redis.createClient({
    host:"redis-server",
    port: 6379,
    password: "foobar"
})
client.set('visits', 0)

app.get("/", (req, res) => {
    client.get("visits", (err, visits ) =>
    {
        res.send(`number of visits: ${ visits }`)
        client.set("visits", parseInt(visits) + 1)
    })
})

app.listen(8080, () => {
    console.log("Running on port 8080")
})