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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Users, User, Dumbbell, Calendar, DollarSign } from 'lucide-vue-next'
import data from '../data/fake.json'

// Create reactive refs from imported JSON data
const users = ref(data.users)
const equipment = ref(data.equipment)
const products = ref(data.products)
const classes = ref(data.classes)
const memberships = ref(data.memberships)
const sales = ref(data.sales)

const activeTab = ref('dashboard')

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'members', label: 'Members' },
  { id: 'equipment', label: 'Equipment' },
  { id: 'classes', label: 'Classes' },
  { id: 'products', label: 'Products' },
  { id: 'memberships', label: 'Memberships' }
]

const stats = computed(() => ({
  totalMembers: users.value.filter(u => u.Role === 'Customer').length,
  activeMembers: memberships.value.filter(m => m.Status === 'Active').length,
  totalEquipment: equipment.value.length,
  excellentCondition: equipment.value.filter(e => e.Condition_ === 'Excellent').length,
  totalClasses: classes.value.length,
  totalRevenue: sales.value.reduce((sum, sale) => sum + sale.TotalPrice, 0).toFixed(2)
}))

const upcomingClasses = computed(() => classes.value.slice(0, 3))

const recentSales = computed(() => {
  return sales.value.slice(0, 3).map(sale => ({
    ...sale,
    ProductName: products.value.find(p => p.Id_Products === sale.Id_Products)?.ProductName || 'Unknown'
  }))
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const formatDateTime = (dateString) => {
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
