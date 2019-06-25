create table admins(
    id int NOT NULL AUTO_INCREMENT primary key,
    name varchar(50),
    password varchar(50)
);

ALTER TABLE admins AUTO_INCREMENT=100000;

insert into admins(name,password) values('admin1','admin1');
insert into admins(name,password) values('admin2','admin2');

create table products(
    id int NOT NULL AUTO_INCREMENT primary key,
    name varchar(50),
    price float
);

ALTER TABLE products AUTO_INCREMENT=100000;

insert into products(name,price) values('p1',100);
insert into products(name,price) values('p2',1000);