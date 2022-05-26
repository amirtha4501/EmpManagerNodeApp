docker pull mysql:8

C:\Users\Ammu>docker run -d --name mysqlsaaragh -e MYSQL_ROOT_PASSWORD=123456 mysql:8
3db1d231a2a410f35c62d446f486c2e258078d93a5f4a04b66ee6ca36144512e

C:\Users\Ammu>docker exec -it mysqlsaaragh mysql -uroot -p

mysql> show databases;

mysql> select @@hostname;
+--------------+
| @@hostname   |
+--------------+
| 3db1d231a2a4 |
+--------------+

mysql> select user();
+----------------+
| user()         |
+----------------+
| root@localhost |
+----------------+

mysql> create database saaragh;

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| saaragh            |
| sys                |
+--------------------+

mysql> alter user 'root' identified with mysql_native_password by 'password';

mysql> flush privileges;

mysql> grant all privileges on *.* to 'root' with grant option;

mysql> create table users (
    -> id int not null auto_increment,
    -> name varchar(255) not null,
    -> email varchar(255) not null,
    -> age int,
    -> primary key (id)
    -> );

npm i sequelize, mysql2


https://medium.com/tech-learn-share/docker-mysql-access-denied-for-user-172-17-0-1-using-password-yes-c5eadad582d3
https://www.configserverfirewall.com/docker/run-mysql-docker-containers/
https://codeforgeek.com/nodejs-mysql-tutorial/