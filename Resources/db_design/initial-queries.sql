CREATE TABLE Projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(255),
    project_location VARCHAR(255),
    start_date DATE,
    end_date DATE,
    contract_amount DECIMAL(10,2),
    project_manager_id INT,
    client_id INT,
    FOREIGN KEY (project_manager_id) REFERENCES Users(user_id),
    FOREIGN KEY (client_id) REFERENCES Users(user_id)
);

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(50),
    role_id INT,
    full_name VARCHAR(100),
    email VARCHAR(100),
    phone_number VARCHAR(20),
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

CREATE TABLE Roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50)
);

CREATE TABLE Bill_of_Quantities (
    boq_item_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    item_name VARCHAR(255),
    quantity DECIMAL(10,2),
    unit VARCHAR(50),
    unit_cost DECIMAL(10,2),
    Amount DECIMAL(10,2),
    FOREIGN KEY (project_id) REFERENCES Projects(project_id)
);

CREATE TABLE Milestones (
    milestone_id INT AUTO_INCREMENT PRIMARY KEY,
    milestone_name VARCHAR(255),
    milestone_start_date DATE,
    milestone_end_date DATE,
    milestone_budget DECIMAL(10,2)
);

CREATE TABLE Takeoff (
    takeoff_id INT AUTO_INCREMENT PRIMARY KEY,
    takeoff_name VARCHAR(255),
    boq_item_id INT,
    milestone_id INT,
    takeoff_quantity DECIMAL(10,2),
    FOREIGN KEY (boq_item_id) REFERENCES Bill_of_Quantities(boq_item_id),
    FOREIGN KEY (milestone_id) REFERENCES Milestones(milestone_id)
);

CREATE TABLE Resources (
    resource_id INT AUTO_INCREMENT PRIMARY KEY,
    resource_name VARCHAR(255),
    resource_type ENUM('Equipment', 'Labour', 'Material'),
    resource_unit VARCHAR(50),
    resource_cost_per_unit DECIMAL(10,2)
);

CREATE TABLE Allocation_resource (
    allocation_id INT AUTO_INCREMENT PRIMARY KEY,
    takeoff_id INT,
    resource_id INT,
    conversionRate DECIMAL(10,2),
    allocation_amount DECIMAL(10,2),
    FOREIGN KEY (takeoff_id) REFERENCES Takeoff(takeoff_id),
    FOREIGN KEY (resource_id) REFERENCES Resources(resource_id)
);
