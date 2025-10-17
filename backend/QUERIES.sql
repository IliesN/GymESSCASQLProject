-- List all active memberships with customer names
SELECT u.Name, m.MembershipType, m.StartDate, m.EndDate
FROM Memberships m
JOIN User_ u ON m.Id_User = u.Id_User
WHERE m.Status = 'Active';

-- Show total sales per customer
SELECT u.Name, SUM(s.TotalPrice) AS TotalSpent
FROM Sales s
JOIN User_ u ON s.Id_User = u.Id_User
GROUP BY u.Name;

-- Display all classes with assigned trainer
SELECT c.ClassName, c.Schedule, u.Name AS Trainer
FROM Classes c
JOIN User_ u ON c.Id_User = u.Id_User;

-- Equipment used per class
SELECT cl.ClassName, e.Name AS Equipment
FROM Use_ u
JOIN Classes cl ON u.Id_Classes = cl.Id_Classes
JOIN Equipment e ON u.Id_Equipment = e.Id_Equipment;
