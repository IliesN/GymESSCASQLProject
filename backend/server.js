// Minimal Express server skeleton for future backend work
// This file is intentionally minimal — frontend CRUD uses local data only for now.
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send({ status: 'Backend skeleton running' })
})

// Placeholder API routes (no implementation yet)
app.get('/api/health', (req, res) => res.json({ ok: true }))

app.listen(port, () => {
  console.log(`Server skeleton listening on port ${port}`)
})
