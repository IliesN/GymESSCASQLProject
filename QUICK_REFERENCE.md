# Quick Reference - Classes Feature & Auto-Refresh Implementation

## What Was Implemented

### 1. Backend - Classes CRUD API (server.js)
Complete REST API for managing classes with 5 endpoints:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/classes` | List all classes |
| GET | `/api/classes/:id` | Get specific class |
| POST | `/api/classes` | Create new class |
| PUT | `/api/classes/:id` | Update class |
| DELETE | `/api/classes/:id` | Delete class |

**Supported Fields:**
- `ClassName` (string)
- `Schedule` (datetime)
- `Capacity` (integer)
- `DifficultyLevel` (Beginner, Intermediate, Advanced)
- `Room` (string)
- `Id_User` (trainer ID, foreign key to users)

### 2. Frontend - Auto-Refresh on Tab Switch

**How it works:**
- Added `watch()` on the `activeTab` reactive property
- Whenever the user switches tabs, the watcher triggers `loadAll()`
- `loadAll()` fetches fresh data from all 4 endpoints:
  - `/api/users`
  - `/api/equipment`
  - `/api/products`
  - `/api/classes`

**Location in code:**
```javascript
watch(activeTab, () => {
  loadAll()  // Refreshes all data when tab changes
})
```

### 3. Frontend - Classes Management UI

**Features:**
- ✅ View all classes in a grid layout
- ✅ Create new classes with "+ New Class" button
- ✅ Edit existing classes
- ✅ Delete classes with confirmation
- ✅ View class details in modal
- ✅ Classes appear in dashboard statistics
- ✅ Trainer names auto-populated from users with role='Trainer'

**Classes Tab Location:** Visible in the main navigation, between "Equipment" and "Products"

---

## Usage Examples

### Create a Class via API
```bash
POST http://localhost:3000/api/classes
Content-Type: application/json

{
  "ClassName": "Yoga Class",
  "Schedule": "2025-12-20T18:00:00",
  "Capacity": 25,
  "DifficultyLevel": "Beginner",
  "Room": "Room A",
  "Id_User": 1
}
```

### Update a Class via API
```bash
PUT http://localhost:3000/api/classes/1
Content-Type: application/json

{
  "ClassName": "Advanced Yoga",
  "Schedule": "2025-12-20T19:00:00",
  "Capacity": 20,
  "DifficultyLevel": "Advanced",
  "Room": "Room B",
  "Id_User": 2
}
```

### Delete a Class via API
```bash
DELETE http://localhost:3000/api/classes/1
```

---

## File Changes Summary

| File | Changes |
|------|---------|
| `backend/server.js` | Added 5 endpoints for Classes CRUD (~90 lines) |
| `frontend/webapp_client/src/components/AdminDashboard.vue` | Added watch, API call, state, methods, and UI (~150 lines) |

---

## Testing the Feature

### Test 1: Create and View Classes
1. Start backend server: `npm start` (in backend folder)
2. Start frontend dev server: `npm run dev` (in webapp_client folder)
3. Navigate to Classes tab
4. Click "+ New Class"
5. Fill in form and save
6. Verify class appears in the grid

### Test 2: Auto-Refresh on Tab Switch
1. Create a class in the Classes tab
2. Switch to Equipment tab (observe data refreshes)
3. Switch back to Classes tab
4. Verify the newly created class is visible

### Test 3: Edit and Delete
1. Click Edit on a class card
2. Modify any field and save
3. Click Delete on another class and confirm
4. Switch tabs and back to verify changes persisted

### Test 4: Real-time Sync (Multi-window)
1. Open app in two browser windows
2. Create a class in window 1
3. Switch tabs in window 2
4. Verify the new class appears in window 2 (auto-refresh)

---

## Database Requirements

The `Classes` table must exist with this structure:
```sql
CREATE TABLE Classes(
   Id_Classes INT AUTO_INCREMENT PRIMARY KEY,
   ClassName VARCHAR(50),
   Schedule DATETIME,
   Capacity INT,
   DifficultyLevel VARCHAR(50),
   Room VARCHAR(50),
   Id_User INT NOT NULL,
   FOREIGN KEY(Id_User) REFERENCES User_(Id_User)
);
```

---

## Error Handling

The implementation includes:
- ✅ Try-catch blocks on all API calls
- ✅ Console logging for debugging
- ✅ User-friendly error alerts
- ✅ Graceful fallback for missing data
- ✅ Confirmation dialogs for destructive operations

---

## Notes

- The implementation follows the exact same pattern as existing CRUD operations (Users, Equipment, Products)
- All date/time fields are automatically formatted for consistency
- The component maintains full backward compatibility
- The Classes tab is fully integrated into the dashboard statistics
- Trainer dropdown only shows users with role='Trainer'
