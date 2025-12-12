# Detailed Code Changes - Classes CRUD & Auto-Refresh

## Backend Changes (server.js)

### Location: After DELETE /api/products/:id endpoint

```javascript
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
```

---

## Frontend Changes (AdminDashboard.vue)

### Change 1: Update Import Statement
**Location:** Top of script setup section
**Before:**
```javascript
import { ref, computed, onMounted } from 'vue'
```

**After:**
```javascript
import { ref, computed, onMounted, watch } from 'vue'
```

---

### Change 2: Update loadAll() Function
**Location:** In script setup, before onMounted hook
**Before:**
```javascript
const loadAll = async () => {
  try { users.value = await api('/api/users') } catch (e) { console.error('load users', e); users.value = [] }
  try { equipment.value = await api('/api/equipment') } catch (e) { console.error('load equipment', e); equipment.value = [] }
  try { products.value = await api('/api/products') } catch (e) { console.error('load products', e); products.value = [] }
}

onMounted(() => loadAll())
```

**After:**
```javascript
const loadAll = async () => {
  try { users.value = await api('/api/users') } catch (e) { console.error('load users', e); users.value = [] }
  try { equipment.value = await api('/api/equipment') } catch (e) { console.error('load equipment', e); equipment.value = [] }
  try { products.value = await api('/api/products') } catch (e) { console.error('load products', e); products.value = [] }
  try { classes.value = await api('/api/classes') } catch (e) { console.error('load classes', e); classes.value = [] }
}

onMounted(() => loadAll())

// Watch for tab changes and reload data
watch(activeTab, () => {
  loadAll()
})
```

---

### Change 3: Add Classes CRUD Methods
**Location:** After saveProduct() method, before the Stats computed property

```javascript
// ------------------ CRUD for Classes ------------------
const showClassForm = ref(false)
const showClassDetails = ref(false)
const selectedClass = ref(null)
const editingClass = ref(false)
const classForm = ref({})

const openCreateClass = () => {
  editingClass.value = false
  classForm.value = { ClassName: '', Schedule: new Date().toISOString().slice(0, 16), Capacity: 20, DifficultyLevel: 'Intermediate', Room: '', Id_User: users.value.filter(u => u.Role === 'Trainer').length > 0 ? users.value.find(u => u.Role === 'Trainer')?.Id_User : '' }
  showClassForm.value = true
}

const editClass = (c) => { editingClass.value = true; classForm.value = JSON.parse(JSON.stringify(c)); showClassForm.value = true }
const viewClass = (c) => { selectedClass.value = JSON.parse(JSON.stringify(c)); showClassDetails.value = true }
const closeClassModals = () => { showClassForm.value = false; showClassDetails.value = false; selectedClass.value = null }

const removeClass = async (id) => {
  if (!confirm('Delete this class?')) return
  try { await api(`/api/classes/${id}`, { method: 'DELETE' }); classes.value = classes.value.filter(c => c.Id_Classes !== id) } catch (e) { console.error(e); alert('Delete failed: ' + e.message) }
}

const saveClass = async () => {
  try {
    if (editingClass.value && classForm.value.Id_Classes) {
      const id = classForm.value.Id_Classes
      const payload = { ...classForm.value }
      await api(`/api/classes/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
      const idx = classes.value.findIndex(c => c.Id_Classes === id)
      if (idx !== -1) classes.value[idx] = JSON.parse(JSON.stringify(payload))
    } else {
      const payload = { ...classForm.value }
      const created = await api('/api/classes', { method: 'POST', body: JSON.stringify(payload) })
      classes.value.push(created)
    }
    closeClassModals()
  } catch (e) { console.error(e); alert('Save failed: ' + e.message) }
}
```

---

### Change 4: Update Classes Tab UI
**Location:** In template, Classes section (line ~298)

**Before:**
```vue
<!-- Classes -->
<div v-if="activeTab === 'classes'" class="space-y-6">
  <div>
    <h2 class="text-2xl font-semibold mb-2">Classes</h2>
    <p class="text-neutral-400 text-sm">Schedule and manage fitness classes</p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div v-for="cls in classes" :key="cls.Id_Classes" class="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
      <!-- existing content without action buttons -->
    </div>
  </div>
</div>
```

**After:**
```vue
<!-- Classes -->
<div v-if="activeTab === 'classes'" class="space-y-6">
  <div>
    <h2 class="text-2xl font-semibold mb-2">Classes</h2>
    <p class="text-neutral-400 text-sm">Schedule and manage fitness classes</p>
    <div class="mt-3">
      <button @click="openCreateClass" class="px-3 py-2 bg-emerald-600 rounded-md text-sm">+ New Class</button>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div v-for="cls in classes" :key="cls.Id_Classes" class="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h3 class="text-lg font-semibold">{{ cls.ClassName }}</h3>
          <p class="text-sm text-neutral-400 mt-1">{{ cls.Room }}</p>
        </div>
        <span :class="[
          'px-3 py-1 text-xs font-medium rounded-full',
          cls.DifficultyLevel === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400' :
          cls.DifficultyLevel === 'Intermediate' ? 'bg-amber-500/10 text-amber-400' :
          'bg-red-500/10 text-red-400'
        ]">
          {{ cls.DifficultyLevel }}
        </span>
      </div>
      <div class="space-y-3">
        <div class="flex items-center gap-2 text-sm text-neutral-400">
          <Calendar class="w-4 h-4" />
          <span>{{ formatDateTime(cls.Schedule) }}</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-neutral-400">
          <Users class="w-4 h-4" />
          <span>Capacity: {{ cls.Capacity }} people</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-neutral-400">
          <User class="w-4 h-4" />
          <span>Trainer: {{ getTrainerName(cls.Id_User) }}</span>
        </div>
        <div class="flex gap-2 mt-3">
          <button @click="viewClass(cls)" class="text-emerald-400 text-sm">View</button>
          <button @click="editClass(cls)" class="text-amber-400 text-sm">Edit</button>
          <button @click="removeClass(cls.Id_Classes)" class="text-red-400 text-sm">Delete</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

### Change 5: Add Classes Modal/Form
**Location:** After Product modal (around line 480)

```vue
<!-- Class Form / Details -->
<div v-if="showClassForm || showClassDetails" class="fixed inset-0 flex items-center justify-center z-50">
  <div class="absolute inset-0 bg-black/60" @click="closeClassModals"></div>
  <div class="bg-neutral-900 border border-neutral-800 rounded-lg p-6 w-full max-w-2xl z-10">
    <div v-if="showClassDetails">
      <h3 class="text-lg font-semibold mb-3">Class Details</h3>
      <pre class="text-sm text-neutral-300 bg-neutral-800 p-3 rounded">{{ selectedClass }}</pre>
      <div class="mt-4 flex justify-end"><button @click="closeClassModals" class="px-3 py-2 bg-emerald-600 rounded">Close</button></div>
    </div>
    <div v-if="showClassForm">
      <h3 class="text-lg font-semibold mb-3">{{ editingClass ? 'Edit Class' : 'New Class' }}</h3>
      <div class="grid grid-cols-1 gap-3">
        <input v-model="classForm.ClassName" placeholder="Class Name" class="p-2 bg-neutral-800 rounded" />
        <input v-model="classForm.Schedule" type="datetime-local" class="p-2 bg-neutral-800 rounded" />
        <input v-model.number="classForm.Capacity" placeholder="Capacity" type="number" class="p-2 bg-neutral-800 rounded" />
        <select v-model="classForm.DifficultyLevel" class="p-2 bg-neutral-800 rounded">
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <input v-model="classForm.Room" placeholder="Room" class="p-2 bg-neutral-800 rounded" />
        <select v-model.number="classForm.Id_User" class="p-2 bg-neutral-800 rounded">
          <option value="" disabled>Select Trainer</option>
          <option v-for="trainer in users.filter(u => u.Role === 'Trainer')" :key="trainer.Id_User" :value="trainer.Id_User">
            {{ trainer.Name }}
          </option>
        </select>
      </div>
      <div class="mt-4 flex gap-2 justify-end">
        <button @click="saveClass" class="px-3 py-2 bg-emerald-600 rounded">Save</button>
        <button @click="closeClassModals" class="px-3 py-2 bg-neutral-700 rounded">Cancel</button>
      </div>
    </div>
  </div>
</div>
```

---

## Summary of Changes

| File | Type | Changes |
|------|------|---------|
| server.js | Backend | Added ~90 lines for Classes CRUD endpoints |
| AdminDashboard.vue | Frontend | Added watch, updated loadAll, added CRUD methods, updated UI, added modal |
| Total | - | ~150 lines added |

All changes maintain consistency with the existing code patterns and follow the same error handling and data management practices.
