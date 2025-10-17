INSERT INTO User_ (Name, Email, Phone, DoB, JoinDate, Role, Speciality, Salary) VALUES
('John Smith', 'john.smith@gym.com', '555-1111', '1990-04-12', '2020-01-10', 'Trainer', 'Strength Training', 3200.00),
('Emily Johnson', 'emily.johnson@gym.com', '555-2222', '1985-07-08', '2019-06-15', 'Trainer', 'Yoga', 3100.00),
('Sarah Miller', 'sarah.miller@gym.com', '555-3333', '1993-03-22', '2023-02-01', 'Customer', '', 0.00),
('David Lee', 'david.lee@gym.com', '555-4444', '1998-09-14', '2024-03-10', 'Customer', '', 0.00),
('Olivia Brown', 'olivia.brown@gym.com', '555-5555', '1992-12-25', '2024-04-18', 'Staff', '', 2500.00),
('Mark Taylor', 'mark.taylor@gym.com', '555-6666', '1987-10-03', '2018-08-12', 'Trainer', 'Cardio Fitness', 3300.00),
('Sophia Davis', 'sophia.davis@gym.com', '555-7777', '1995-06-29', '2024-05-02', 'Customer', '', 0.00),
('Liam Wilson', 'liam.wilson@gym.com', '555-8888', '1999-11-20', '2024-07-19', 'Customer', '', 0.00),
('Ava Martinez', 'ava.martinez@gym.com', '555-9999', '1988-02-15', '2022-11-10', 'Trainer', 'Pilates', 3150.00),
('Noah Anderson', 'noah.anderson@gym.com', '555-0000', '1991-05-23', '2021-09-01', 'Staff', '', 2600.00);

INSERT INTO Equipment (Name, Type, PurchaseDate, MaintenanceDate, Price, Brand, Condition_) VALUES
('Treadmill Pro X', 'Cardio', '2022-03-10', '2025-05-12', 2200.00, 'NordicTrack', 'Excellent'),
('Bench Press 2000', 'Strength', '2021-07-05', '2024-10-01', 900.00, 'Rogue', 'Good'),
('Yoga Mats', 'Flexibility', '2023-01-18', '2025-01-01', 250.00, 'Lululemon', 'Good'),
('Stationary Bike', 'Cardio', '2020-09-14', '2024-09-14', 1400.00, 'Peloton', 'Fair'),
('Dumbbell Set', 'Strength', '2022-11-25', '2025-02-10', 750.00, 'Bowflex', 'Excellent'),
('Rowing Machine', 'Cardio', '2023-04-05', '2025-04-05', 1800.00, 'Concept2', 'Excellent'),
('Pull-Up Bar', 'Strength', '2022-02-14', '2024-12-14', 200.00, 'Rogue', 'Good'),
('Kettlebells', 'Strength', '2021-11-30', '2025-01-15', 600.00, 'TRX', 'Good'),
('Resistance Bands', 'Flexibility', '2023-05-10', '2025-06-01', 150.00, 'TheraBand', 'New'),
('Stepper Machine', 'Cardio', '2022-10-25', '2024-10-25', 1300.00, 'Precor', 'Good');

INSERT INTO Products (ProductName, Category, Description, Price, StockQuantity, DateAdded, Brand) VALUES
('Gym T-Shirt', 'Apparel', 'Breathable cotton gym shirt', 25.00, 50, '2025-04-10', 'Nike'),
('Protein Powder', 'Supplement', 'Whey protein 2lb', 45.00, 30, '2025-03-12', 'Optimum Nutrition'),
('Yoga Mat Deluxe', 'Equipment', 'Non-slip thick yoga mat', 35.00, 20, '2025-02-28', 'Lululemon'),
('Water Bottle', 'Accessory', 'Insulated stainless steel bottle', 15.00, 40, '2025-01-20', 'HydroFlask'),
('Gym Bag', 'Accessory', 'Spacious and durable gym bag', 40.00, 25, '2025-05-05', 'Under Armour'),
('Resistance Bands Set', 'Equipment', 'Pack of 5 strength bands', 30.00, 30, '2025-04-01', 'TheraBand'),
('Pre-Workout Drink', 'Supplement', 'Energy-boosting pre-workout mix', 28.00, 20, '2025-03-18', 'C4'),
('Foam Roller', 'Accessory', 'High-density muscle recovery roller', 22.00, 35, '2025-02-10', 'TriggerPoint'),
('Sweat Towel', 'Apparel', 'Soft absorbent towel', 10.00, 60, '2025-01-30', 'Adidas'),
('Protein Bar', 'Supplement', 'High-protein snack bar', 3.50, 100, '2025-05-15', 'Quest');

INSERT INTO Classes (ClassName, Schedule, Capacity, DifficultyLevel, Room, Id_User) VALUES
('Morning Yoga', '2025-10-10 08:00:00', 15, 'Beginner', 'Room A', 2),
('HIIT Blast', '2025-10-10 10:00:00', 20, 'Advanced', 'Room B', 1),
('Cardio Burn', '2025-10-11 09:00:00', 25, 'Intermediate', 'Room C', 6),
('Pilates Flow', '2025-10-12 07:00:00', 12, 'Beginner', 'Room D', 9);

INSERT INTO Memberships (StartDate, EndDate, Price, MembershipType, Status, PaymentMethod, Id_User) VALUES
('2025-01-01', '2025-12-31', 600.00, 'Annual', 'Active', 'Card', 3),
('2025-05-01', '2025-10-31', 300.00, '6-Month', 'Active', 'Online', 4),
('2025-03-15', '2025-09-15', 350.00, '6-Month', 'Active', 'Card', 7),
('2025-07-01', '2026-06-30', 650.00, 'Annual', 'Active', 'Cash', 8);

INSERT INTO Sales (Id_Products, Id_User, Quantity, TotalPrice, PaymentMethod, SaleDate, BillingAddress) VALUES
(1, 3, 2, 50.00, 'Card', '2025-06-12', '123 Maple St'),
(2, 3, 1, 45.00, 'Online', '2025-07-10', '123 Maple St'),
(3, 4, 1, 35.00, 'Cash', '2025-08-01', '89 Elm St'),
(4, 7, 3, 45.00, 'Card', '2025-09-14', '77 Oak Ave'),
(5, 8, 1, 40.00, 'Cash', '2025-09-28', '45 Birch Rd'),
(6, 3, 1, 30.00, 'Card', '2025-08-20', '123 Maple St'),
(7, 4, 2, 56.00, 'Online', '2025-09-03', '89 Elm St'),
(8, 7, 1, 22.00, 'Cash', '2025-10-01', '77 Oak Ave'),
(9, 8, 4, 40.00, 'Card', '2025-09-29', '45 Birch Rd'),
(10, 3, 10, 35.00, 'Cash', '2025-09-20', '123 Maple St');

INSERT INTO Use_ (Id_Classes, Id_Equipment) VALUES
(1, 3),
(2, 1),
(2, 2),
(3, 4),
(3, 5),
(4, 6),
(4, 7),
(1, 8),
(2, 9),
(3, 10);

INSERT INTO Book (Id_Classes, Id_User, Date_) VALUES
(1, 3, '2025-10-08 10:00:00'),
(1, 7, '2025-10-08 10:05:00'),
(2, 4, '2025-10-08 11:00:00'),
(3, 8, '2025-10-08 11:15:00'),
(4, 3, '2025-10-09 09:00:00'),
(2, 7, '2025-10-09 09:30:00');
