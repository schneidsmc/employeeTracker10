


INSERT INTO department(department_name)
VALUES ("Parks and Recreation"),
        ("Animal Control"),
        ("Building Services");

INSERT INTO roles(title, salary, department_id)
VALUES ("Deparment Manager", 100000, 1),
        ("Deputy Parks Director", 90000, 1),
        ("Office Manager", 80000, 1),
        ("Parks Specialist", 70000, 1),
        ("Deputy Animal Control Director", 60000, 2),
        ("Shoe-shiner", 50000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ron", "Swanson", 1, NULL),
        ("Leslie", "Knope", 2, 1),
        ("Donna", "Meagle", 3, 1),
        ("Tom", "Haverford", 4, 2),
        ("April", "Ludgate", 5, 2),
        ("Andy", "Dwyer", 6, 2);


