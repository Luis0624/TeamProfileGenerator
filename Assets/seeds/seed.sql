USE employer_DB;

INSERT INTO department (name)
VALUES
("IT"),
("Finance"),
("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES
("Cyber Security Engineer", 150000, 1),
("Software Engineer", 120000, 1),
("Analyst", 100000, 2),
("Accountant", 200000, 2),
("Manager", 100000, 3),
("Assistant", 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("John", "Doe", 1, 2),
("Jon", "Doe", 2, null),
("Joe", "Doe", 3, null),
("Jane", "Doe", 4, null),
("Janet", "Doe", 5, null);