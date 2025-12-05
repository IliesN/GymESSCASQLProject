<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-100">
    <!-- Header -->
    <header class="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Dumbbell class="w-5 h-5 text-white" />
            </div>
            <h1 class="text-xl font-semibold text-balance">GymDatabaseProject</h1>
          </div>
          <nav class="hidden md:flex items-center gap-1">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              ]"
            >
              {{ tab.label }}
            </button>
          </nav>
          <div class="flex items-center gap-3">
            <button @click="logout" class="text-sm text-zinc-400 hover:text-white">Logout</button>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Navigation -->
    <div class="md:hidden border-b border-neutral-800 bg-neutral-950">
      <div class="flex overflow-x-auto px-4 gap-2 py-2">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
            activeTab === tab.id
              ? 'bg-neutral-800 text-white'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- (Dashboard content omitted for brevity in template file, full content included in component script) -->
      <div v-if="activeTab === 'dashboard'" class="space-y-6">
        <div>
          <h2 class="text-2xl font-semibold mb-2">Dashboard</h2>
          <p class="text-neutral-400 text-sm">Overview of gym operations</p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <div class="flex items-center justify-between mb-2">
              <span class="text-neutral-400 text-sm">Total Members</span>
              <Users class="w-4 h-4 text-blue-500" />
            </div>
            <div class="text-3xl font-semibold">{{ stats.totalMembers }}</div>
            <div class="text-xs text-neutral-500 mt-1">{{ stats.activeMembers }} active</div>
          </div>

          <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <div class="flex items-center justify-between mb-2">
              <span class="text-neutral-400 text-sm">Equipment</span>
              <Dumbbell class="w-4 h-4 text-emerald-500" />
            </div>
            <div class="text-3xl font-semibold">{{ stats.totalEquipment }}</div>
            <div class="text-xs text-neutral-500 mt-1">{{ stats.excellentCondition }} excellent</div>
          </div>

          <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <div class="flex items-center justify-between mb-2">
              <span class="text-neutral-400 text-sm">Classes</span>
              <Calendar class="w-4 h-4 text-purple-500" />
            </div>
            <div class="text-3xl font-semibold">{{ stats.totalClasses }}</div>
            <div class="text-xs text-neutral-500 mt-1">This week</div>
          </div>

          <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <div class="flex items-center justify-between mb-2">
              <span class="text-neutral-400 text-sm">Revenue</span>
              <DollarSign class="w-4 h-4 text-amber-500" />
            </div>
            <div class="text-3xl font-semibold">${{ stats.totalRevenue }}</div>
            <div class="text-xs text-neutral-500 mt-1">This month</div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4">Upcoming Classes</h3>
            <div class="space-y-3">
              <div v-for="cls in upcomingClasses" :key="cls.Id_Classes" class="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg">
                <div>
                  <div class="font-medium">{{ cls.ClassName }}</div>
                  <div class="text-sm text-neutral-400">{{ formatDateTime(cls.Schedule) }}</div>
                </div>
                <div class="text-sm text-neutral-400">{{ cls.Capacity }} spots</div>
              </div>
            </div>
          </div>

          <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4">Recent Sales</h3>
            <div class="space-y-3">
              <div v-for="sale in recentSales" :key="sale.Id_Sales" class="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg">
                <div>
                  <div class="font-medium">{{ sale.ProductName }}</div>
                  <div class="text-sm text-neutral-400">{{ sale.Quantity }}x - {{ formatDate(sale.SaleDate) }}</div>
                </div>
                <div class="font-medium text-emerald-500">${{ sale.TotalPrice }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Members -->
      <div v-if="activeTab === 'members'" class="space-y-6">
        <div>
          <h2 class="text-2xl font-semibold mb-2">Members</h2>
          <p class="text-neutral-400 text-sm">Manage gym members and trainers</p>
          <div class="mt-3">
            <button @click="openCreateUser" class="px-3 py-2 bg-emerald-600 rounded-md text-sm">+ New Member</button>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-neutral-800/50 border-b border-neutral-800">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Role</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Speciality</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Join Date</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-800">
                <tr v-for="user in users" :key="user.Id_User" class="hover:bg-neutral-800/30 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="font-medium">{{ user.Name }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">{{ user.Email }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      user.Role === 'Trainer' ? 'bg-blue-500/10 text-blue-400' :
                      user.Role === 'Staff' ? 'bg-purple-500/10 text-purple-400' :
                      'bg-neutral-700 text-neutral-300'
                    ]">
                      {{ user.Role }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">{{ user.Speciality || '-' }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">{{ formatDate(user.JoinDate) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button @click="viewUser(user)" class="mr-2 text-sm text-emerald-400">View</button>
                    <button @click="editUser(user)" class="mr-2 text-sm text-amber-400">Edit</button>
                    <button @click="removeUser(user.Id_User)" class="text-sm text-red-400">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Equipment -->
      <div v-if="activeTab === 'equipment'" class="space-y-6">
        <div>
          <h2 class="text-2xl font-semibold mb-2">Equipment</h2>
          <p class="text-neutral-400 text-sm">Track and manage gym equipment</p>
          <div class="mt-3">
            <button @click="openCreateEquipment" class="px-3 py-2 bg-emerald-600 rounded-md text-sm">+ New Equipment</button>
          </div>
        </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="item in equipment" :key="item.Id_Equipment" class="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-colors">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h3 class="font-semibold">{{ item.Name }}</h3>
                <p class="text-sm text-neutral-400">{{ item.Brand }}</p>
              </div>
              <span :class="[
                'px-2 py-1 text-xs font-medium rounded-full',
                item.Condition_ === 'Excellent' ? 'bg-emerald-500/10 text-emerald-400' :
                item.Condition_ === 'Good' ? 'bg-blue-500/10 text-blue-400' :
                item.Condition_ === 'Fair' ? 'bg-amber-500/10 text-amber-400' :
                'bg-red-500/10 text-red-400'
              ]">
                {{ item.Condition_ }}
              </span>
            </div>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between text-neutral-400">
                <span>Type:</span>
                <span class="text-neutral-200">{{ item.Type }}</span>
              </div>
              <div class="flex justify-between text-neutral-400">
                <span>Price:</span>
                <span class="text-neutral-200">${{ item.Price }}</span>
              </div>
              <div class="flex justify-between text-neutral-400">
                <span>Purchased:</span>
                <span class="text-neutral-200">{{ formatDate(item.PurchaseDate) }}</span>
              </div>
              <div class="flex gap-2 mt-3">
                <button @click="viewEquipment(item)" class="text-emerald-400 text-sm">View</button>
                <button @click="editEquipment(item)" class="text-amber-400 text-sm">Edit</button>
                <button @click="removeEquipment(item.Id_Equipment)" class="text-red-400 text-sm">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Classes -->
      <div v-if="activeTab === 'classes'" class="space-y-6">
        <div>
          <h2 class="text-2xl font-semibold mb-2">Classes</h2>
          <p class="text-neutral-400 text-sm">Schedule and manage fitness classes</p>
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
            </div>
          </div>
        </div>
      </div>

      <!-- Products -->
      <div v-if="activeTab === 'products'" class="space-y-6">
        <div>
          <h2 class="text-2xl font-semibold mb-2">Products</h2>
          <p class="text-neutral-400 text-sm">Manage gym store inventory</p>
          <div class="mt-3">
            <button @click="openCreateProduct" class="px-3 py-2 bg-emerald-600 rounded-md text-sm">+ New Product</button>
          </div>
        </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="product in products" :key="product.Id_Products" class="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-colors">
            <div class="mb-3">
              <h3 class="font-semibold">{{ product.ProductName }}</h3>
              <p class="text-sm text-neutral-400">{{ product.Brand }}</p>
            </div>
            <p class="text-sm text-neutral-400 mb-4 line-clamp-2">{{ product.Description }}</p>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-neutral-400">Category:</span>
                <span class="text-neutral-200">{{ product.Category }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-400">Price:</span>
                <span class="text-emerald-400 font-semibold">${{ product.Price }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-400">Stock:</span>
                <span :class="product.StockQuantity < 20 ? 'text-amber-400' : 'text-neutral-200'">
                  {{ product.StockQuantity }} units
                </span>
              </div>
              <div class="flex gap-2 mt-3">
                <button @click="viewProduct(product)" class="text-emerald-400 text-sm">View</button>
                <button @click="editProduct(product)" class="text-amber-400 text-sm">Edit</button>
                <button @click="removeProduct(product.Id_Products)" class="text-red-400 text-sm">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Memberships -->
      <div v-if="activeTab === 'memberships'" class="space-y-6">
        <div>
          <h2 class="text-2xl font-semibold mb-2">Memberships</h2>
          <p class="text-neutral-400 text-sm">Track member subscriptions</p>
        </div>

        <div class="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-neutral-800/50 border-b border-neutral-800">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Member</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Start Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">End Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Price</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-800">
                <tr v-for="membership in memberships" :key="membership.Id_Memberships" class="hover:bg-neutral-800/30 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="font-medium">{{ getUserName(membership.Id_User) }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">{{ membership.MembershipType }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">{{ formatDate(membership.StartDate) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">{{ formatDate(membership.EndDate) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-400">${{ membership.Price }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400">
                      {{ membership.Status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-neutral-800 mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p class="text-center text-sm text-neutral-500">
          GymDatabaseProject © 2025 - Valentin GONCALVES, Ilies NASR, Angel BOURDIOL
        </p>
      </div>
    </footer>

    <!-- Modals / Forms for CRUD -->
    <!-- User Form / Details -->
    <div v-if="showUserForm || showUserDetails" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black/60" @click="closeUserModals"></div>
      <div class="bg-neutral-900 border border-neutral-800 rounded-lg p-6 w-full max-w-2xl z-10">
        <div v-if="showUserDetails">
          <h3 class="text-lg font-semibold mb-3">Member Details</h3>
          <pre class="text-sm text-neutral-300 bg-neutral-800 p-3 rounded">{{ selectedUser }}</pre>
          <div class="mt-4 flex justify-end"><button @click="closeUserModals" class="px-3 py-2 bg-emerald-600 rounded">Close</button></div>
        </div>
        <div v-if="showUserForm">
          <h3 class="text-lg font-semibold mb-3">{{ editingUser ? 'Edit Member' : 'New Member' }}</h3>
          <div class="grid grid-cols-1 gap-3">
            <input v-model="userForm.Name" placeholder="Name" class="p-2 bg-neutral-800 rounded" />
            <input v-model="userForm.Email" placeholder="Email" class="p-2 bg-neutral-800 rounded" />
            <input v-model="userForm.Phone" placeholder="Phone" class="p-2 bg-neutral-800 rounded" />
            <input v-model="userForm.DoB" type="date" placeholder="DoB" class="p-2 bg-neutral-800 rounded" />
            <select v-model="userForm.Role" class="p-2 bg-neutral-800 rounded">
              <option>Customer</option>
              <option>Trainer</option>
              <option>Staff</option>
            </select>
            <input v-model="userForm.Speciality" placeholder="Speciality" class="p-2 bg-neutral-800 rounded" />
          </div>
          <div class="mt-4 flex gap-2 justify-end">
            <button @click="saveUser" class="px-3 py-2 bg-emerald-600 rounded">Save</button>
            <button @click="closeUserModals" class="px-3 py-2 bg-neutral-700 rounded">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Equipment Form / Details -->
    <div v-if="showEquipmentForm || showEquipmentDetails" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black/60" @click="closeEquipmentModals"></div>
      <div class="bg-neutral-900 border border-neutral-800 rounded-lg p-6 w-full max-w-2xl z-10">
        <div v-if="showEquipmentDetails">
          <h3 class="text-lg font-semibold mb-3">Equipment Details</h3>
          <pre class="text-sm text-neutral-300 bg-neutral-800 p-3 rounded">{{ selectedEquipment }}</pre>
          <div class="mt-4 flex justify-end"><button @click="closeEquipmentModals" class="px-3 py-2 bg-emerald-600 rounded">Close</button></div>
        </div>
        <div v-if="showEquipmentForm">
          <h3 class="text-lg font-semibold mb-3">{{ editingEquipment ? 'Edit Equipment' : 'New Equipment' }}</h3>
          <div class="grid grid-cols-1 gap-3">
            <input v-model="equipmentForm.Name" placeholder="Name" class="p-2 bg-neutral-800 rounded" />
            <input v-model="equipmentForm.Brand" placeholder="Brand" class="p-2 bg-neutral-800 rounded" />
            <input v-model="equipmentForm.Type" placeholder="Type" class="p-2 bg-neutral-800 rounded" />
            <input v-model.number="equipmentForm.Price" placeholder="Price" class="p-2 bg-neutral-800 rounded" />
            <input v-model="equipmentForm.PurchaseDate" type="date" class="p-2 bg-neutral-800 rounded" />
            <select v-model="equipmentForm.Condition_" class="p-2 bg-neutral-800 rounded">
              <option>Excellent</option>
              <option>Good</option>
              <option>Fair</option>
              <option>Poor</option>
            </select>
          </div>
          <div class="mt-4 flex gap-2 justify-end">
            <button @click="saveEquipment" class="px-3 py-2 bg-emerald-600 rounded">Save</button>
            <button @click="closeEquipmentModals" class="px-3 py-2 bg-neutral-700 rounded">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Form / Details -->
    <div v-if="showProductForm || showProductDetails" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black/60" @click="closeProductModals"></div>
      <div class="bg-neutral-900 border border-neutral-800 rounded-lg p-6 w-full max-w-2xl z-10">
        <div v-if="showProductDetails">
          <h3 class="text-lg font-semibold mb-3">Product Details</h3>
          <pre class="text-sm text-neutral-300 bg-neutral-800 p-3 rounded">{{ selectedProduct }}</pre>
          <div class="mt-4 flex justify-end"><button @click="closeProductModals" class="px-3 py-2 bg-emerald-600 rounded">Close</button></div>
        </div>
        <div v-if="showProductForm">
          <h3 class="text-lg font-semibold mb-3">{{ editingProduct ? 'Edit Product' : 'New Product' }}</h3>
          <div class="grid grid-cols-1 gap-3">
            <input v-model="productForm.ProductName" placeholder="Product Name" class="p-2 bg-neutral-800 rounded" />
            <input v-model="productForm.Brand" placeholder="Brand" class="p-2 bg-neutral-800 rounded" />
            <input v-model="productForm.Category" placeholder="Category" class="p-2 bg-neutral-800 rounded" />
            <input v-model.number="productForm.Price" placeholder="Price" class="p-2 bg-neutral-800 rounded" />
            <input v-model.number="productForm.StockQuantity" placeholder="Stock" class="p-2 bg-neutral-800 rounded" />
            <textarea v-model="productForm.Description" placeholder="Description" class="p-2 bg-neutral-800 rounded"></textarea>
          </div>
          <div class="mt-4 flex gap-2 justify-end">
            <button @click="saveProduct" class="px-3 py-2 bg-emerald-600 rounded">Save</button>
            <button @click="closeProductModals" class="px-3 py-2 bg-neutral-700 rounded">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Users, User, Dumbbell, Calendar, DollarSign } from 'lucide-vue-next'
// import data from '../data/fake.json' // kept for reference if needed

// API base (use Vite env VITE_API_BASE to override)
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

// State
const users = ref([])
const equipment = ref([])
const products = ref([])
const classes = ref([])
const memberships = ref([])
const sales = ref([])

const activeTab = ref('dashboard')

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'members', label: 'Members' },
  { id: 'equipment', label: 'Equipment' },
  { id: 'classes', label: 'Classes' },
  { id: 'products', label: 'Products' },
  { id: 'memberships', label: 'Memberships' }
]

// API helper
const api = async (path, opts = {}) => {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  if (res.status === 204) return null
  return res.json()
}

// Normalize dates: convert YYYY-MM-DDTHH:MM:SS.000Z or similar to YYYY-MM-DD
const normalizeDate = (dateStr) => {
  if (!dateStr) return ''
  if (typeof dateStr === 'string') return dateStr.split('T')[0]
  if (dateStr instanceof Date) return dateStr.toISOString().split('T')[0]
  return dateStr
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const formatDateTime = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

const getTrainerName = (userId) => {
  return users.value.find(u => u.Id_User === userId)?.Name || 'Unknown'
}

const getUserName = (userId) => {
  return users.value.find(u => u.Id_User === userId)?.Name || 'Unknown'
}

const logout = () => {
  localStorage.removeItem('isAdmin')
  const ev = new CustomEvent('logout')
  window.dispatchEvent(ev)
}

// Load initial data
const loadAll = async () => {
  try { users.value = await api('/api/users') } catch (e) { console.error('load users', e); users.value = [] }
  try { equipment.value = await api('/api/equipment') } catch (e) { console.error('load equipment', e); equipment.value = [] }
  try { products.value = await api('/api/products') } catch (e) { console.error('load products', e); products.value = [] }
}

onMounted(() => loadAll())

// ------------------ CRUD for Users ------------------
const showUserForm = ref(false)
const showUserDetails = ref(false)
const selectedUser = ref(null)
const editingUser = ref(false)
const userForm = ref({})

const openCreateUser = () => {
  editingUser.value = false
  userForm.value = { Name: '', Email: '', Phone: '', DoB: '', JoinDate: new Date().toISOString().slice(0,10), Role: 'Customer', Speciality: '', Salary: 0 }
  showUserForm.value = true
}

const editUser = (u) => { editingUser.value = true; userForm.value = JSON.parse(JSON.stringify(u)); showUserForm.value = true }
const viewUser = (u) => { selectedUser.value = JSON.parse(JSON.stringify(u)); showUserDetails.value = true }
const closeUserModals = () => { showUserForm.value = false; showUserDetails.value = false; selectedUser.value = null }

const removeUser = async (id) => {
  if (!confirm('Delete this member?')) return
  try {
    await api(`/api/users/${id}`, { method: 'DELETE' })
    users.value = users.value.filter(u => u.Id_User !== id)
  } catch (e) { console.error(e); alert('Delete failed: ' + e.message) }
}

const saveUser = async () => {
  try {
    if (editingUser.value && userForm.value.Id_User) {
      const id = userForm.value.Id_User
      const payload = { ...userForm.value, DoB: normalizeDate(userForm.value.DoB), JoinDate: normalizeDate(userForm.value.JoinDate) }
      await api(`/api/users/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
      const idx = users.value.findIndex(u => u.Id_User === id)
      if (idx !== -1) users.value[idx] = JSON.parse(JSON.stringify(payload))
    } else {
      const payload = { ...userForm.value, DoB: normalizeDate(userForm.value.DoB), JoinDate: normalizeDate(userForm.value.JoinDate) }
      const created = await api('/api/users', { method: 'POST', body: JSON.stringify(payload) })
      users.value.push(created)
    }
    closeUserModals()
  } catch (e) { console.error(e); alert('Save failed: ' + e.message) }
}

// ------------------ CRUD for Equipment ------------------
const showEquipmentForm = ref(false)
const showEquipmentDetails = ref(false)
const selectedEquipment = ref(null)
const editingEquipment = ref(false)
const equipmentForm = ref({})

const openCreateEquipment = () => { editingEquipment.value = false; equipmentForm.value = { Name: '', Type: '', PurchaseDate: new Date().toISOString().slice(0,10), MaintenanceDate: '', Price: 0, Brand: '', Condition_: 'Good' }; showEquipmentForm.value = true }
const editEquipment = (e) => { editingEquipment.value = true; equipmentForm.value = JSON.parse(JSON.stringify(e)); showEquipmentForm.value = true }
const viewEquipment = (e) => { selectedEquipment.value = JSON.parse(JSON.stringify(e)); showEquipmentDetails.value = true }
const closeEquipmentModals = () => { showEquipmentForm.value = false; showEquipmentDetails.value = false; selectedEquipment.value = null }

const removeEquipment = async (id) => {
  if (!confirm('Delete this equipment item?')) return
  try { await api(`/api/equipment/${id}`, { method: 'DELETE' }); equipment.value = equipment.value.filter(e => e.Id_Equipment !== id) } catch (e) { console.error(e); alert('Delete failed: ' + e.message) }
}

const saveEquipment = async () => {
  try {
    if (editingEquipment.value && equipmentForm.value.Id_Equipment) {
      const id = equipmentForm.value.Id_Equipment
      const payload = { ...equipmentForm.value, PurchaseDate: normalizeDate(equipmentForm.value.PurchaseDate), MaintenanceDate: normalizeDate(equipmentForm.value.MaintenanceDate) }
      await api(`/api/equipment/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
      const idx = equipment.value.findIndex(e => e.Id_Equipment === id)
      if (idx !== -1) equipment.value[idx] = JSON.parse(JSON.stringify(payload))
    } else {
      const payload = { ...equipmentForm.value, PurchaseDate: normalizeDate(equipmentForm.value.PurchaseDate), MaintenanceDate: normalizeDate(equipmentForm.value.MaintenanceDate) }
      const created = await api('/api/equipment', { method: 'POST', body: JSON.stringify(payload) })
      equipment.value.push(created)
    }
    closeEquipmentModals()
  } catch (e) { console.error(e); alert('Save failed: ' + e.message) }
}

// ------------------ CRUD for Products ------------------
const showProductForm = ref(false)
const showProductDetails = ref(false)
const selectedProduct = ref(null)
const editingProduct = ref(false)
const productForm = ref({})

const openCreateProduct = () => { editingProduct.value = false; productForm.value = { ProductName: '', Category: '', Description: '', Price: 0, StockQuantity: 0, DateAdded: new Date().toISOString().slice(0,10), Brand: '' }; showProductForm.value = true }
const editProduct = (p) => { editingProduct.value = true; productForm.value = JSON.parse(JSON.stringify(p)); showProductForm.value = true }
const viewProduct = (p) => { selectedProduct.value = JSON.parse(JSON.stringify(p)); showProductDetails.value = true }
const closeProductModals = () => { showProductForm.value = false; showProductDetails.value = false; selectedProduct.value = null }

const removeProduct = async (id) => {
  if (!confirm('Delete this product?')) return
  try { await api(`/api/products/${id}`, { method: 'DELETE' }); products.value = products.value.filter(p => p.Id_Products !== id) } catch (e) { console.error(e); alert('Delete failed: ' + e.message) }
}

const saveProduct = async () => {
  try {
    if (editingProduct.value && productForm.value.Id_Products) {
      const id = productForm.value.Id_Products
      const payload = { ...productForm.value, DateAdded: normalizeDate(productForm.value.DateAdded) }
      await api(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
      const idx = products.value.findIndex(p => p.Id_Products === id)
      if (idx !== -1) products.value[idx] = JSON.parse(JSON.stringify(payload))
    } else {
      const payload = { ...productForm.value, DateAdded: normalizeDate(productForm.value.DateAdded) }
      const created = await api('/api/products', { method: 'POST', body: JSON.stringify(payload) })
      products.value.push(created)
    }
    closeProductModals()
  } catch (e) { console.error(e); alert('Save failed: ' + e.message) }
}

// Stats
const stats = computed(() => ({
  totalMembers: users.value.filter(u => u.Role === 'Customer').length,
  activeMembers: memberships.value.filter(m => m.Status === 'Active').length,
  totalEquipment: equipment.value.length,
  excellentCondition: equipment.value.filter(e => e.Condition_ === 'Excellent').length,
  totalClasses: classes.value.length,
  totalRevenue: sales.value.reduce((sum, sale) => sum + (sale.TotalPrice || 0), 0).toFixed(2)
}))

const upcomingClasses = computed(() => classes.value.slice(0, 3))

const recentSales = computed(() => {
  return sales.value.slice(0, 3).map(sale => ({ ...sale, ProductName: products.value.find(p => p.Id_Products === sale.Id_Products)?.ProductName || 'Unknown' }))
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
