CREATE TABLE Equipment(
   Id_Equipment INT AUTO_INCREMENT,
   Name VARCHAR(50),
   Type VARCHAR(50),
   PurchaseDate DATE,
   MaintenanceDate DATE,
   Price DECIMAL(10,2),
   Brand VARCHAR(50),
   Condition_ VARCHAR(50),
   PRIMARY KEY(Id_Equipment)
);

CREATE TABLE User_(
   Id_User INT AUTO_INCREMENT,
   Name VARCHAR(50),
   Email VARCHAR(50),
   Phone VARCHAR(50),
   DoB DATE,
   JoinDate DATE,
   Role VARCHAR(50),
   Speciality VARCHAR(50),
   Salary DECIMAL(10,2),
   PRIMARY KEY(Id_User)
);

CREATE TABLE Products(
   Id_Products INT AUTO_INCREMENT,
   ProductName VARCHAR(50),
   Category VARCHAR(50),
   Description TEXT,
   Price DECIMAL(10,2),
   StockQuantity INT,
   DateAdded DATE,
   Brand VARCHAR(50),
   PRIMARY KEY(Id_Products)
);

CREATE TABLE Sales(
   Id_Sales INT AUTO_INCREMENT,
   Id_Products INT,
   Id_User INT,
   Quantity INT,
   TotalPrice DECIMAL(10,2),
   PaymentMethod VARCHAR(50),
   SaleDate DATE,
   BillingAddress TEXT,
   PRIMARY KEY(Id_Sales),
   FOREIGN KEY(Id_Products) REFERENCES Products(Id_Products),
   FOREIGN KEY(Id_User) REFERENCES User_(Id_User)
);

CREATE TABLE Classes(
   Id_Classes INT AUTO_INCREMENT,
   ClassName VARCHAR(50),
   Schedule DATETIME,
   Capacity INT,
   DifficultyLevel VARCHAR(50),
   Room VARCHAR(50),
   Id_User INT NOT NULL,
   PRIMARY KEY(Id_Classes),
   FOREIGN KEY(Id_User) REFERENCES User_(Id_User)
);

CREATE TABLE Memberships(
   Id_Memberships INT AUTO_INCREMENT,
   StartDate DATE,
   EndDate DATE,
   Price DECIMAL(10,2),
   MembershipType VARCHAR(50),
   Status VARCHAR(50),
   PaymentMethod VARCHAR(50),
   Id_User INT NOT NULL,
   PRIMARY KEY(Id_Memberships),
   UNIQUE(Id_User),
   FOREIGN KEY(Id_User) REFERENCES User_(Id_User)
);

CREATE TABLE Use_(
   Id_Classes INT,
   Id_Equipment INT,
   PRIMARY KEY(Id_Classes, Id_Equipment),
   FOREIGN KEY(Id_Classes) REFERENCES Classes(Id_Classes),
   FOREIGN KEY(Id_Equipment) REFERENCES Equipment(Id_Equipment)
);

CREATE TABLE Book(
   Id_Classes INT,
   Id_User INT,
   Date_ DATETIME,
   PRIMARY KEY(Id_Classes, Id_User),
   FOREIGN KEY(Id_Classes) REFERENCES Classes(Id_Classes),
   FOREIGN KEY(Id_User) REFERENCES User_(Id_User)
);
