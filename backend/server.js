// Express backend skeleton with simple in-memory CRUD routes
const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Try to load frontend fake data if available (optional)
let users = []
let equipment = []
let products = []
try {
  const frontendFake = path.join(__dirname, '..', 'frontend', 'webapp_client', 'src', 'data', 'fake.json')
  if (fs.existsSync(frontendFake)) {
    const raw = fs.readFileSync(frontendFake, 'utf8')
    const json = JSON.parse(raw)
    users = json.users || []
    equipment = json.equipment || []
    products = json.products || []
  }
} catch (e) {
  // ignore loading errors; start with empty arrays
}

app.get('/', (req, res) => res.json({ status: 'backend-express-skeleton', port }))
app.get('/api/health', (req, res) => res.json({ ok: true }))

// Generic helpers
const parseId = (s) => parseInt(s, 10) || 0

// USERS
app.get('/api/users', (req, res) => res.json(users))
app.get('/api/users/:id', (req, res) => {
  const id = parseId(req.params.id)
  const u = users.find(x => x.Id_User === id)
  if (!u) return res.status(404).json({ error: 'Not found' })
  res.json(u)
})
app.post('/api/users', (req, res) => {
  const payload = req.body || {}
  const maxId = users.reduce((m, x) => Math.max(m, x.Id_User || 0), 0)
  const newUser = { ...payload, Id_User: maxId + 1 }
  users.push(newUser)
  res.status(201).json(newUser)
})
app.put('/api/users/:id', (req, res) => {
  const id = parseId(req.params.id)
  const idx = users.findIndex(x => x.Id_User === id)
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
  users[idx] = { ...users[idx], ...req.body }
  res.json(users[idx])
})
app.delete('/api/users/:id', (req, res) => {
  const id = parseId(req.params.id)
  users = users.filter(x => x.Id_User !== id)
  res.status(204).end()
})

// EQUIPMENT
app.get('/api/equipment', (req, res) => res.json(equipment))
app.get('/api/equipment/:id', (req, res) => {
  const id = parseId(req.params.id)
  const e = equipment.find(x => x.Id_Equipment === id)
  if (!e) return res.status(404).json({ error: 'Not found' })
  res.json(e)
})
app.post('/api/equipment', (req, res) => {
  const payload = req.body || {}
  const maxId = equipment.reduce((m, x) => Math.max(m, x.Id_Equipment || 0), 0)
  const newItem = { ...payload, Id_Equipment: maxId + 1 }
  equipment.push(newItem)
  res.status(201).json(newItem)
})
app.put('/api/equipment/:id', (req, res) => {
  const id = parseId(req.params.id)
  const idx = equipment.findIndex(x => x.Id_Equipment === id)
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
  equipment[idx] = { ...equipment[idx], ...req.body }
  res.json(equipment[idx])
})
app.delete('/api/equipment/:id', (req, res) => {
  const id = parseId(req.params.id)
  equipment = equipment.filter(x => x.Id_Equipment !== id)
  res.status(204).end()
})

// PRODUCTS
app.get('/api/products', (req, res) => res.json(products))
app.get('/api/products/:id', (req, res) => {
  const id = parseId(req.params.id)
  const p = products.find(x => x.Id_Products === id)
  if (!p) return res.status(404).json({ error: 'Not found' })
  res.json(p)
})
app.post('/api/products', (req, res) => {
  const payload = req.body || {}
  const maxId = products.reduce((m, x) => Math.max(m, x.Id_Products || 0), 0)
  const newItem = { ...payload, Id_Products: maxId + 1 }
  products.push(newItem)
  res.status(201).json(newItem)
})
app.put('/api/products/:id', (req, res) => {
  const id = parseId(req.params.id)
  const idx = products.findIndex(x => x.Id_Products === id)
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
  products[idx] = { ...products[idx], ...req.body }
  res.json(products[idx])
})
app.delete('/api/products/:id', (req, res) => {
  const id = parseId(req.params.id)
  products = products.filter(x => x.Id_Products !== id)
  res.status(204).end()
})

app.listen(port, () => {
  console.log(`Express backend skeleton listening on port ${port}`)
})
