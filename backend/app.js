import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "404 - NOT FOUND IN THE SYSTEM (OF A DOWN)" })
})

export default app