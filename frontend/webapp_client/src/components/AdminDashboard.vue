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

// Mock data (copied from provided template)
const users = ref([
  { Id_User: 1, Name: 'John Smith', Email: 'john.smith@gym.com', Phone: '555-1111', DoB: '1990-04-12', JoinDate: '2020-01-10', Role: 'Trainer', Speciality: 'Strength Training', Salary: 3200.00 },
  { Id_User: 2, Name: 'Emily Johnson', Email: 'emily.johnson@gym.com', Phone: '555-2222', DoB: '1985-07-08', JoinDate: '2019-06-15', Role: 'Trainer', Speciality: 'Yoga', Salary: 3100.00 },
  { Id_User: 3, Name: 'Sarah Miller', Email: 'sarah.miller@gym.com', Phone: '555-3333', DoB: '1993-03-22', JoinDate: '2023-02-01', Role: 'Customer', Speciality: '', Salary: 0.00 },
  { Id_User: 4, Name: 'David Lee', Email: 'david.lee@gym.com', Phone: '555-4444', DoB: '1998-09-14', JoinDate: '2024-03-10', Role: 'Customer', Speciality: '', Salary: 0.00 },
  { Id_User: 5, Name: 'Olivia Brown', Email: 'olivia.brown@gym.com', Phone: '555-5555', DoB: '1992-12-25', JoinDate: '2024-04-18', Role: 'Staff', Speciality: '', Salary: 2500.00 },
  { Id_User: 6, Name: 'Mark Taylor', Email: 'mark.taylor@gym.com', Phone: '555-6666', DoB: '1987-10-03', JoinDate: '2018-08-12', Role: 'Trainer', Speciality: 'Cardio Fitness', Salary: 3300.00 },
  { Id_User: 7, Name: 'Sophia Davis', Email: 'sophia.davis@gym.com', Phone: '555-7777', DoB: '1995-06-29', JoinDate: '2024-05-02', Role: 'Customer', Speciality: '', Salary: 0.00 },
  { Id_User: 8, Name: 'Liam Wilson', Email: 'liam.wilson@gym.com', Phone: '555-8888', DoB: '1999-11-20', JoinDate: '2024-07-19', Role: 'Customer', Speciality: '', Salary: 0.00 },
  { Id_User: 9, Name: 'Ava Martinez', Email: 'ava.martinez@gym.com', Phone: '555-9999', DoB: '1988-02-15', JoinDate: '2022-11-10', Role: 'Trainer', Speciality: 'Pilates', Salary: 3150.00 },
  { Id_User: 10, Name: 'Noah Anderson', Email: 'noah.anderson@gym.com', Phone: '555-0000', DoB: '1991-05-23', JoinDate: '2021-09-01', Role: 'Staff', Speciality: '', Salary: 2600.00 }
])

const equipment = ref([
  { Id_Equipment: 1, Name: 'Treadmill Pro X', Type: 'Cardio', PurchaseDate: '2022-03-10', MaintenanceDate: '2025-05-12', Price: 2200.00, Brand: 'NordicTrack', Condition_: 'Excellent' },
  { Id_Equipment: 2, Name: 'Bench Press 2000', Type: 'Strength', PurchaseDate: '2021-07-05', MaintenanceDate: '2024-10-01', Price: 900.00, Brand: 'Rogue', Condition_: 'Good' },
  { Id_Equipment: 3, Name: 'Yoga Mats', Type: 'Flexibility', PurchaseDate: '2023-01-18', MaintenanceDate: '2025-01-01', Price: 250.00, Brand: 'Lululemon', Condition_: 'Good' },
  { Id_Equipment: 4, Name: 'Stationary Bike', Type: 'Cardio', PurchaseDate: '2020-09-14', MaintenanceDate: '2024-09-14', Price: 1400.00, Brand: 'Peloton', Condition_: 'Fair' },
  { Id_Equipment: 5, Name: 'Dumbbell Set', Type: 'Strength', PurchaseDate: '2022-11-25', MaintenanceDate: '2025-02-10', Price: 750.00, Brand: 'Bowflex', Condition_: 'Excellent' },
  { Id_Equipment: 6, Name: 'Rowing Machine', Type: 'Cardio', PurchaseDate: '2023-04-05', MaintenanceDate: '2025-04-05', Price: 1800.00, Brand: 'Concept2', Condition_: 'Excellent' },
  { Id_Equipment: 7, Name: 'Pull-Up Bar', Type: 'Strength', PurchaseDate: '2022-02-14', MaintenanceDate: '2024-12-14', Price: 200.00, Brand: 'Rogue', Condition_: 'Good' },
  { Id_Equipment: 8, Name: 'Kettlebells', Type: 'Strength', PurchaseDate: '2021-11-30', MaintenanceDate: '2025-01-15', Price: 600.00, Brand: 'TRX', Condition_: 'Good' },
  { Id_Equipment: 9, Name: 'Resistance Bands', Type: 'Flexibility', PurchaseDate: '2023-05-10', MaintenanceDate: '2025-06-01', Price: 150.00, Brand: 'TheraBand', Condition_: 'New' },
  { Id_Equipment: 10, Name: 'Stepper Machine', Type: 'Cardio', PurchaseDate: '2022-10-25', MaintenanceDate: '2024-10-25', Price: 1300.00, Brand: 'Precor', Condition_: 'Good' }
])

const products = ref([
  { Id_Products: 1, ProductName: 'Gym T-Shirt', Category: 'Apparel', Description: 'Breathable cotton gym shirt', Price: 25.00, StockQuantity: 50, DateAdded: '2025-04-10', Brand: 'Nike' },
  { Id_Products: 2, ProductName: 'Protein Powder', Category: 'Supplement', Description: 'Whey protein 2lb', Price: 45.00, StockQuantity: 30, DateAdded: '2025-03-12', Brand: 'Optimum Nutrition' },
  { Id_Products: 3, ProductName: 'Yoga Mat Deluxe', Category: 'Equipment', Description: 'Non-slip thick yoga mat', Price: 35.00, StockQuantity: 20, DateAdded: '2025-02-28', Brand: 'Lululemon' },
  { Id_Products: 4, ProductName: 'Water Bottle', Category: 'Accessory', Description: 'Insulated stainless steel bottle', Price: 15.00, StockQuantity: 40, DateAdded: '2025-01-20', Brand: 'HydroFlask' },
  { Id_Products: 5, ProductName: 'Gym Bag', Category: 'Accessory', Description: 'Spacious and durable gym bag', Price: 40.00, StockQuantity: 25, DateAdded: '2025-05-05', Brand: 'Under Armour' },
  { Id_Products: 6, ProductName: 'Resistance Bands Set', Category: 'Equipment', Description: 'Pack of 5 strength bands', Price: 30.00, StockQuantity: 30, DateAdded: '2025-04-01', Brand: 'TheraBand' },
  { Id_Products: 7, ProductName: 'Pre-Workout Drink', Category: 'Supplement', Description: 'Energy-boosting pre-workout mix', Price: 28.00, StockQuantity: 20, DateAdded: '2025-03-18', Brand: 'C4' },
  { Id_Products: 8, ProductName: 'Foam Roller', Category: 'Accessory', Description: 'High-density muscle recovery roller', Price: 22.00, StockQuantity: 35, DateAdded: '2025-02-10', Brand: 'TriggerPoint' },
  { Id_Products: 9, ProductName: 'Sweat Towel', Category: 'Apparel', Description: 'Soft absorbent towel', Price: 10.00, StockQuantity: 60, DateAdded: '2025-01-30', Brand: 'Adidas' },
  { Id_Products: 10, ProductName: 'Protein Bar', Category: 'Supplement', Description: 'High-protein snack bar', Price: 3.50, StockQuantity: 100, DateAdded: '2025-05-15', Brand: 'Quest' }
])

const classes = ref([
  { Id_Classes: 1, ClassName: 'Morning Yoga', Schedule: '2025-10-10 08:00:00', Capacity: 15, DifficultyLevel: 'Beginner', Room: 'Room A', Id_User: 2 },
  { Id_Classes: 2, ClassName: 'HIIT Blast', Schedule: '2025-10-10 10:00:00', Capacity: 20, DifficultyLevel: 'Advanced', Room: 'Room B', Id_User: 1 },
  { Id_Classes: 3, ClassName: 'Cardio Burn', Schedule: '2025-10-11 09:00:00', Capacity: 25, DifficultyLevel: 'Intermediate', Room: 'Room C', Id_User: 6 },
  { Id_Classes: 4, ClassName: 'Pilates Flow', Schedule: '2025-10-12 07:00:00', Capacity: 12, DifficultyLevel: 'Beginner', Room: 'Room D', Id_User: 9 }
])

const memberships = ref([
  { Id_Memberships: 1, StartDate: '2025-01-01', EndDate: '2025-12-31', Price: 600.00, MembershipType: 'Annual', Status: 'Active', PaymentMethod: 'Card', Id_User: 3 },
  { Id_Memberships: 2, StartDate: '2025-05-01', EndDate: '2025-10-31', Price: 300.00, MembershipType: '6-Month', Status: 'Active', PaymentMethod: 'Online', Id_User: 4 },
  { Id_Memberships: 3, StartDate: '2025-03-15', EndDate: '2025-09-15', Price: 350.00, MembershipType: '6-Month', Status: 'Active', PaymentMethod: 'Card', Id_User: 7 },
  { Id_Memberships: 4, StartDate: '2025-07-01', EndDate: '2026-06-30', Price: 650.00, MembershipType: 'Annual', Status: 'Active', PaymentMethod: 'Cash', Id_User: 8 }
])

const sales = ref([
  { Id_Sales: 1, Id_Products: 1, Id_User: 3, Quantity: 2, TotalPrice: 50.00, PaymentMethod: 'Card', SaleDate: '2025-06-12', BillingAddress: '123 Maple St' },
  { Id_Sales: 2, Id_Products: 2, Id_User: 3, Quantity: 1, TotalPrice: 45.00, PaymentMethod: 'Online', SaleDate: '2025-07-10', BillingAddress: '123 Maple St' },
  { Id_Sales: 3, Id_Products: 3, Id_User: 4, Quantity: 1, TotalPrice: 35.00, PaymentMethod: 'Cash', SaleDate: '2025-08-01', BillingAddress: '89 Elm St' },
  { Id_Sales: 4, Id_Products: 4, Id_User: 7, Quantity: 3, TotalPrice: 45.00, PaymentMethod: 'Card', SaleDate: '2025-09-14', BillingAddress: '77 Oak Ave' },
  { Id_Sales: 5, Id_Products: 5, Id_User: 8, Quantity: 1, TotalPrice: 40.00, PaymentMethod: 'Cash', SaleDate: '2025-09-28', BillingAddress: '45 Birch Rd' }
])

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
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
