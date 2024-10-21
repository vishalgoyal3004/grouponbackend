import axios from "axios"
import cors from "cors"
import express from "express"
import NodeCache from "node-cache"
import rateLimit from "express-rate-limit"

const PORT = 4000
const nodeApp = express()
const limitRate = rateLimit({
  windowMs: 10 * 6000,
  max: 70,
  message: "Request Limit reached, Try later",
})
const cache = new NodeCache({ catchTime: 3600 })
nodeApp.use(cors())
nodeApp.use(express.json())
nodeApp.use("/", limitRate)

nodeApp.get("/", (req, res) => {
  res.send("Wikipedia is running")
})

nodeApp.get("/search", async (req, res) => {
  try {
    const article = req.query.article
    const cachedKey = `wikipedia-${article}`
    const cachedArticle = cache.get(cachedKey)
    if (cachedArticle) return res.json(cachedArticle)
    var searchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&generator=prefixsearch&prop=pageprops|pageimages|description|extracts|info&exintro&explaintext&redirects=&ppprop=displaytitle&piprop=thumbnail&pithumbsize=120&pilimit=30&gpssearch=${encodeURIComponent(
      article
    )}&format=json`
    const fulldata = await axios.get(searchUrl)
    const dataResponse = fulldata.data.query.pages
    cache.set(cachedKey, dataResponse)
    res.json(dataResponse)
  } catch (error) {
    console.log("error", error)
    res.status(500).send({
      error: "Something went wrong while fetching data from Wikipedia",
    })
  }
})

nodeApp.listen(PORT, () => {
  console.log(`Server smashing on PORT ${PORT}`)
})
