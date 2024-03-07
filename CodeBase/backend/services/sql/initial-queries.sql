CREATE TABLE IF NOT EXISTS Roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(100) UNIQUE
);

CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role_id INT,
    first_name VARCHAR(60),
    last_name VARCHAR(60),
    email VARCHAR(100),
    phone_number VARCHAR(20),
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

CREATE TABLE IF NOT EXISTS Projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    project_hash_id VARCHAR(100) DEFAULT NULL,
    project_name VARCHAR(255),
    project_location VARCHAR(255),
    start_date DATE,
    end_date DATE,
    contract_amount DECIMAL(10,2),
    over_head_cost_factor DECIMAL(5,2),
    project_manager_id INT,
    client_id INT,
    FOREIGN KEY (project_manager_id) REFERENCES Users(user_id),
    FOREIGN KEY (client_id) REFERENCES Users(user_id)
);

CREATE TABLE IF NOT EXISTS Bill_of_Quantities (
    boq_item_id INT AUTO_INCREMENT PRIMARY KEY,
    boq_hash_id VARCHAR(100) DEFAULT NULL,
    project_id INT,
    boq_item_no VARCHAR(30),
    item_name TEXT,
    unit_of_measurement VARCHAR(50),
    contract_quantity DECIMAL(10,2),
    unit_price_rate DECIMAL(10,2),
    Contract_Amount DECIMAL(10,2),
    price_adjustment DECIMAL(5,2),
    Actual_quantity DECIMAL(10,2),
    Actual_Amount DECIMAL(10,2),
    variation INT,
    FOREIGN KEY (project_id) REFERENCES Projects(project_id)
);

CREATE TABLE IF NOT EXISTS Milestones (
    milestone_id INT AUTO_INCREMENT PRIMARY KEY,
    milestone_hash_id VARCHAR(100) DEFAULT NULL,
    project_id INT,
    milestone_name VARCHAR(255),
    milestone_start_date DATE,
    milestone_end_date DATE,
    milestone_budget DECIMAL(10,2),
    milestone_cost DECIMAL(10,2),
    milestone_revenue DECIMAL(10,2),
    FOREIGN KEY (project_id) REFERENCES Projects(project_id)
);

CREATE TABLE IF NOT EXISTS Members (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    member_hash_id VARCHAR(100) DEFAULT NULL,
    member_name VARCHAR(255),
    boq_item_id INT,
    milestone_id INT,
    member_quantity DECIMAL(10,2),
    executed_quantity DECIMAL(10,2),
    member_amount DECIMAL(10,2),
    executed_amount DECIMAL(10,2),
    FOREIGN KEY (boq_item_id) REFERENCES Bill_of_Quantities(boq_item_id),
    FOREIGN KEY (milestone_id) REFERENCES Milestones(milestone_id)
);

CREATE TABLE IF NOT EXISTS Resource_type (
    resource_type_id INT AUTO_INCREMENT PRIMARY KEY,
    resource_type_name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Main_catagory (
    main_catagory_id INT AUTO_INCREMENT PRIMARY KEY,
    main_catagory_name VARCHAR(255),
    resource_type_id INT,
    FOREIGN KEY (resource_type_id) REFERENCES Resource_type(resource_type_id)
);

CREATE TABLE IF NOT EXISTS Sub_catagory (
    sub_catagory_id INT AUTO_INCREMENT PRIMARY KEY,
    sub_catagory_name VARCHAR(255),
    main_catagory_id INT,
    FOREIGN KEY (main_catagory_id) REFERENCES Main_catagory(main_catagory_id)
);

CREATE TABLE IF NOT EXISTS Micro_catagory (
    mini_catagory_id INT AUTO_INCREMENT PRIMARY KEY,
    mini_catagory_name VARCHAR(255),
    sub_catagory_id INT,
    FOREIGN KEY (sub_catagory_id) REFERENCES Sub_catagory(sub_catagory_id)
);

CREATE TABLE IF NOT EXISTS Resources (
    resource_id INT AUTO_INCREMENT PRIMARY KEY,
    resource_name VARCHAR(255),
    mini_catagory_id INT,
    market_price_rate DECIMAL(10,2),
    default_resource_unit VARCHAR(50),
    FOREIGN KEY (mini_catagory_id) REFERENCES Micro_catagory(mini_catagory_id)
);

CREATE TABLE IF NOT EXISTS Allocation_resource (
    allocation_id INT AUTO_INCREMENT PRIMARY KEY,
    allocation_hash_id VARCHAR(100) DEFAULT NULL,
    member_id INT,
    resource_id INT,
    utilization_factor DECIMAL(5,2),
    output_factor DECIMAL(5,2),
    resource_quantity_per_contract_unit DECIMAL(10,2),
    production_cost_per_Contract_unit DECIMAL(10,2),
    FOREIGN KEY (member_id) REFERENCES Members(member_id),
    FOREIGN KEY (resource_id) REFERENCES Resources(resource_id)
);
-- Inserting role names
INSERT IGNORE INTO Roles (role_name) VALUES
('Admin'),
('Consultant'),
('Project Manager'),
('Site Engineer'),
('CEO'),
('Client');

-- Insert the initial user 'admin' if it doesn't already exist
INSERT IGNORE INTO Users (username, password, role_id, first_name, last_name, email, phone_number) 
VALUES ('admin', '$2b$10$p7gFeMPp9CpvZiHC9IH65.6g08AnE33XByf.NuG0SGkt7wxV9up4G', 1, 'admin', 'admin', 'admin@admin.com', '0000000000');


