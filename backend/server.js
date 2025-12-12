// Express backend with MySQL CRUD routes
const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
// const path = require('path')
// const fs = require('fs')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.MYSQL_DATABASE || 'gymproject',
  port: process.env.MYSQL_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// Old in-memory code (commented out)
/*
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
*/

app.get('/', (req, res) => res.json({ status: 'backend-express-mysql', port }))
app.get('/api/health', (req, res) => res.json({ ok: true }))

// Generic helpers
const parseId = (s) => parseInt(s, 10) || 0

// Format DATE fields from MySQL to YYYY-MM-DD
const formatDateFields = (obj, dateFields) => {
  if (!obj) return obj
  const copy = { ...obj }
  dateFields.forEach(field => {
    if (copy[field] instanceof Date) {
      const date = copy[field]
      copy[field] = date.toISOString().split('T')[0]
    } else if (typeof copy[field] === 'string' && copy[field].includes('T')) {
      copy[field] = copy[field].split('T')[0]
    }
  })
  return copy
}

const formatDateArray = (arr, dateFields) => {
  return arr.map(obj => formatDateFields(obj, dateFields))
}

// Normalize date input to YYYY-MM-DD
const normalizeDate = (dateStr) => {
  if (!dateStr) return null
  if (typeof dateStr === 'string') return dateStr.split('T')[0]
  if (dateStr instanceof Date) return dateStr.toISOString().split('T')[0]
  return dateStr
}

// ==================== USERS ====================
// GET /api/users - list all users
app.get('/api/users', async (req, res) => {
  try {
    const conn = await pool.getConnection()
    const [rows] = await conn.query('SELECT * FROM user_')
    conn.release()
    const formatted = formatDateArray(rows, ['DoB', 'JoinDate'])
    res.json(formatted)
  } catch (err) {
    console.error('GET /api/users error:', err)
    res.status(500).json({ error: err.message })
  }
})

// GET /api/users/:id - get user by id
app.get('/api/users/:id', async (req, res) => {
  try {
    const id = parseId(req.params.id)
    const conn = await pool.getConnection()
    const [rows] = await conn.query('SELECT * FROM user_ WHERE Id_User = ?', [id])
    conn.release()
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' })
    res.json(formatDateFields(rows[0], ['DoB', 'JoinDate']))
  } catch (err) {
    console.error('GET /api/users/:id error:', err)
    res.status(500).json({ error: err.message })
  }
})

// POST /api/users - create user
app.post('/api/users', async (req, res) => {
  try {
    let { Name, Email, Phone, DoB, JoinDate, Role, Speciality, Salary } = req.body
    DoB = normalizeDate(DoB)
    JoinDate = normalizeDate(JoinDate)
    const conn = await pool.getConnection()
    const query = 'INSERT INTO user_ (Name, Email, Phone, DoB, JoinDate, Role, Speciality, Salary) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    const [result] = await conn.query(query, [Name, Email, Phone, DoB, JoinDate, Role, Speciality, Salary || 0])
    conn.release()
    res.status(201).json(formatDateFields({ Id_User: result.insertId, Name, Email, Phone, DoB, JoinDate, Role, Speciality, Salary }, ['DoB', 'JoinDate']))
  } catch (err) {
    console.error('POST /api/users error:', err)
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/users/:id - update user
app.put('/api/users/:id', async (req, res) => {
  try {
    const id = parseId(req.params.id)
    let { Name, Email, Phone, DoB, JoinDate, Role, Speciality, Salary } = req.body
    DoB = normalizeDate(DoB)
    JoinDate = normalizeDate(JoinDate)
    const conn = await pool.getConnection()
    
    // Fetch existing to merge
    const [existing] = await conn.query('SELECT * FROM user_ WHERE Id_User = ?', [id])
    if (existing.length === 0) {
      conn.release()
      return res.status(404).json({ error: 'Not found' })
    }
    
    const merged = { ...existing[0], Name, Email, Phone, DoB, JoinDate, Role, Speciality, Salary }
    const query = 'UPDATE user_ SET Name=?, Email=?, Phone=?, DoB=?, JoinDate=?, Role=?, Speciality=?, Salary=? WHERE Id_User=?'
    await conn.query(query, [merged.Name, merged.Email, merged.Phone, merged.DoB, merged.JoinDate, merged.Role, merged.Speciality, merged.Salary, id])
    conn.release()
    res.json(formatDateFields(merged, ['DoB', 'JoinDate']))
  } catch (err) {
    console.error('PUT /api/users/:id error:', err)
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/users/:id - delete user
app.delete('/api/users/:id', async (req, res) => {
  try {
    const id = parseId(req.params.id)
    const conn = await pool.getConnection()
    await conn.query('DELETE FROM user_ WHERE Id_User = ?', [id])
    conn.release()
    res.status(204).end()
  } catch (err) {
    console.error('DELETE /api/users/:id error:', err)
    res.status(500).json({ error: err.message })
  }
})

// ==================== EQUIPMENT ====================
// GET /api/equipment - list all equipment
app.get('/api/equipment', async (req, res) => {
  try {
    const conn = await pool.getConnection()
    const [rows] = await conn.query('SELECT * FROM equipment')
    conn.release()
    const formatted = formatDateArray(rows, ['PurchaseDate', 'MaintenanceDate'])
    res.json(formatted)
  } catch (err) {
    console.error('GET /api/equipment error:', err)
    res.status(500).json({ error: err.message })
  }
})

// GET /api/equipment/:id - get equipment by id
app.get('/api/equipment/:id', async (req, res) => {
  try {
    const id = parseId(req.params.id)
    const conn = await pool.getConnection()
    const [rows] = await conn.query('SELECT * FROM equipment WHERE Id_Equipment = ?', [id])
    conn.release()
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' })
    res.json(formatDateFields(rows[0], ['PurchaseDate', 'MaintenanceDate']))
  } catch (err) {
    console.error('GET /api/equipment/:id error:', err)
    res.status(500).json({ error: err.message })
  }
})

// POST /api/equipment - create equipment
app.post('/api/equipment', async (req, res) => {
  try {
    let { Name, Type, PurchaseDate, MaintenanceDate, Price, Brand, Condition_ } = req.body
    PurchaseDate = normalizeDate(PurchaseDate)
    MaintenanceDate = normalizeDate(MaintenanceDate)
    const conn = await pool.getConnection()
    const query = 'INSERT INTO equipment (Name, Type, PurchaseDate, MaintenanceDate, Price, Brand, Condition_) VALUES (?, ?, ?, ?, ?, ?, ?)'
    const [result] = await conn.query(query, [Name, Type, PurchaseDate, MaintenanceDate, Price, Brand, Condition_])
    conn.release()
    res.status(201).json(formatDateFields({ Id_Equipment: result.insertId, Name, Type, PurchaseDate, MaintenanceDate, Price, Brand, Condition_ }, ['PurchaseDate', 'MaintenanceDate']))
  } catch (err) {
    console.error('POST /api/equipment error:', err)
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/equipment/:id - update equipment
app.put('/api/equipment/:id', async (req, res) => {
  try {
    const id = parseId(req.params.id)
    let { Name, Type, PurchaseDate, MaintenanceDate, Price, Brand, Condition_ } = req.body
    PurchaseDate = normalizeDate(PurchaseDate)
    MaintenanceDate = normalizeDate(MaintenanceDate)
    const conn = await pool.getConnection()
    
    const [existing] = await conn.query('SELECT * FROM equipment WHERE Id_Equipment = ?', [id])
    if (existing.length === 0) {
      conn.release()
      return res.status(404).json({ error: 'Not found' })
    }
    
    const merged = { ...existing[0], Name, Type, PurchaseDate, MaintenanceDate, Price, Brand, Condition_ }
    const query = 'UPDATE equipment SET Name=?, Type=?, PurchaseDate=?, MaintenanceDate=?, Price=?, Brand=?, Condition_=? WHERE Id_Equipment=?'
    await conn.query(query, [merged.Name, merged.Type, merged.PurchaseDate, merged.MaintenanceDate, merged.Price, merged.Brand, merged.Condition_, id])
    conn.release()
    res.json(formatDateFields(merged, ['PurchaseDate', 'MaintenanceDate']))
  } catch (err) {
    console.error('PUT /api/equipment/:id error:', err)
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/equipment/:id - delete equipment
app.delete('/api/equipment/:id', async (req, res) => {
  try {
    const id = parseId(req.params.id)
    const conn = await pool.getConnection()
    await conn.query('DELETE FROM equipment WHERE Id_Equipment = ?', [id])
    conn.release()
    res.status(204).end()
  } catch (err) {
    console.error('DELETE /api/equipment/:id error:', err)
    res.status(500).json({ error: err.message })
  }
})

// ==================== PRODUCTS ====================
// GET /api/products - list all products
app.get('/api/products', async (req, res) => {
  try {
    const conn = await pool.getConnection()
    const [rows] = await conn.query('SELECT * FROM products')
    conn.release()
    const formatted = formatDateArray(rows, ['DateAdded'])
    res.json(formatted)
  } catch (err) {
    console.error('GET /api/products error:', err)
    res.status(500).json({ error: err.message })
  }
})

// GET /api/products/:id - get product by id
app.get('/api/products/:id', async (req, res) => {
  try {
    const id = parseId(req.params.id)
    const conn = await pool.getConnection()
    const [rows] = await conn.query('SELECT * FROM products WHERE Id_Products = ?', [id])
    conn.release()
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' })
    res.json(formatDateFields(rows[0], ['DateAdded']))
  } catch (err) {
    console.error('GET /api/products/:id error:', err)
    res.status(500).json({ error: err.message })
  }
})

// POST /api/products - create product
app.post('/api/products', async (req, res) => {
  try {
    let { ProductName, Category, Description, Price, StockQuantity, DateAdded, Brand } = req.body
    DateAdded = normalizeDate(DateAdded)
    const conn = await pool.getConnection()
    const query = 'INSERT INTO products (ProductName, Category, Description, Price, StockQuantity, DateAdded, Brand) VALUES (?, ?, ?, ?, ?, ?, ?)'
    const [result] = await conn.query(query, [ProductName, Category, Description, Price, StockQuantity, DateAdded, Brand])
    conn.release()
    res.status(201).json(formatDateFields({ Id_Products: result.insertId, ProductName, Category, Description, Price, StockQuantity, DateAdded, Brand }, ['DateAdded']))
  } catch (err) {
    console.error('POST /api/products error:', err)
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/products/:id - update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const id = parseId(req.params.id)
    let { ProductName, Category, Description, Price, StockQuantity, DateAdded, Brand } = req.body
    DateAdded = normalizeDate(DateAdded)
    const conn = await pool.getConnection()
    
    const [existing] = await conn.query('SELECT * FROM products WHERE Id_Products = ?', [id])
    if (existing.length === 0) {
      conn.release()
      return res.status(404).json({ error: 'Not found' })
    }
    
    const merged = { ...existing[0], ProductName, Category, Description, Price, StockQuantity, DateAdded, Brand }
    const query = 'UPDATE products SET ProductName=?, Category=?, Description=?, Price=?, StockQuantity=?, DateAdded=?, Brand=? WHERE Id_Products=?'
    await conn.query(query, [merged.ProductName, merged.Category, merged.Description, merged.Price, merged.StockQuantity, merged.DateAdded, merged.Brand, id])
    conn.release()
    res.json(formatDateFields(merged, ['DateAdded']))
  } catch (err) {
    console.error('PUT /api/products/:id error:', err)
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/products/:id - delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const id = parseId(req.params.id)
    const conn = await pool.getConnection()
    await conn.query('DELETE FROM products WHERE Id_Products = ?', [id])
    conn.release()
    res.status(204).end()
  } catch (err) {
    console.error('DELETE /api/products/:id error:', err)
    res.status(500).json({ error: err.message })
  }
})

// ==================== CLASSES ====================
// GET /api/classes - list all classes
app.get('/api/classes', async (req, res) => {
  try {
    const conn = await pool.getConnection()
    const [rows] = await conn.query('SELECT * FROM classes')
    conn.release()
    const formatted = formatDateArray(rows, ['Schedule'])
    res.json(formatted)
  } catch (err) {
    console.error('GET /api/classes error:', err)
    res.status(500).json({ error: err.message })
  }
})

// GET /api/classes/:id - get class by id
app.get('/api/classes/:id', async (req, res) => {
  try {
    const id = parseId(req.params.id)
    const conn = await pool.getConnection()
    const [rows] = await conn.query('SELECT * FROM classes WHERE Id_Classes = ?', [id])
    conn.release()
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' })
    res.json(formatDateFields(rows[0], ['Schedule']))
  } catch (err) {
    console.error('GET /api/classes/:id error:', err)
    res.status(500).json({ error: err.message })
  }
})

// POST /api/classes - create class
app.post('/api/classes', async (req, res) => {
  try {
    let { ClassName, Schedule, Capacity, DifficultyLevel, Room, Id_User } = req.body
    Schedule = normalizeDate(Schedule)
    const conn = await pool.getConnection()
    const query = 'INSERT INTO classes (ClassName, Schedule, Capacity, DifficultyLevel, Room, Id_User) VALUES (?, ?, ?, ?, ?, ?)'
    const [result] = await conn.query(query, [ClassName, Schedule, Capacity, DifficultyLevel, Room, Id_User])
    conn.release()
    res.status(201).json(formatDateFields({ Id_Classes: result.insertId, ClassName, Schedule, Capacity, DifficultyLevel, Room, Id_User }, ['Schedule']))
  } catch (err) {
    console.error('POST /api/classes error:', err)
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/classes/:id - update class
app.put('/api/classes/:id', async (req, res) => {
  try {
    const id = parseId(req.params.id)
    let { ClassName, Schedule, Capacity, DifficultyLevel, Room, Id_User } = req.body
    Schedule = normalizeDate(Schedule)
    const conn = await pool.getConnection()
    
    const [existing] = await conn.query('SELECT * FROM classes WHERE Id_Classes = ?', [id])
    if (existing.length === 0) {
      conn.release()
      return res.status(404).json({ error: 'Not found' })
    }
    
    const merged = { ...existing[0], ClassName, Schedule, Capacity, DifficultyLevel, Room, Id_User }
    const query = 'UPDATE classes SET ClassName=?, Schedule=?, Capacity=?, DifficultyLevel=?, Room=?, Id_User=? WHERE Id_Classes=?'
    await conn.query(query, [merged.ClassName, merged.Schedule, merged.Capacity, merged.DifficultyLevel, merged.Room, merged.Id_User, id])
    conn.release()
    res.json(formatDateFields(merged, ['Schedule']))
  } catch (err) {
    console.error('PUT /api/classes/:id error:', err)
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/classes/:id - delete class
app.delete('/api/classes/:id', async (req, res) => {
  try {
    const id = parseId(req.params.id)
    const conn = await pool.getConnection()
    await conn.query('DELETE FROM classes WHERE Id_Classes = ?', [id])
    conn.release()
    res.status(204).end()
  } catch (err) {
    console.error('DELETE /api/classes/:id error:', err)
    res.status(500).json({ error: err.message })
  }
})

// ==================== MEMBERSHIPS ====================
// GET /api/memberships - list all memberships
app.get('/api/memberships', async (req, res) => {
  try {
    const conn = await pool.getConnection()
    const [rows] = await conn.query('SELECT * FROM memberships')
    conn.release()
    const formatted = formatDateArray(rows, ['StartDate', 'EndDate'])
    res.json(formatted)
  } catch (err) {
    console.error('GET /api/memberships error:', err)
    res.status(500).json({ error: err.message })
  }
})

// ==================== SALES ====================
// GET /api/sales - list all sales
app.get('/api/sales', async (req, res) => {
  try {
    const conn = await pool.getConnection()
    const [rows] = await conn.query('SELECT * FROM sales')
    conn.release()
    const formatted = formatDateArray(rows, ['SaleDate'])
    res.json(formatted)
  } catch (err) {
    console.error('GET /api/sales error:', err)
    res.status(500).json({ error: err.message })
  }
})

app.listen(port, () => {
  console.log(`Express backend (MySQL) listening on port ${port}`)
})
