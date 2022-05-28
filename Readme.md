## Install the dependencies
npm install
## To run the project
node index.js
## To check go to
http://localhost:3000/

## Rough draft of thought process

- Fetched mysql to docker with
`docker pull mysql:8`

- Created a container from an image and started with
`docker run -d --name mysqlsaaragh -e MYSQL_ROOT_PASSWORD=123456 mysql:8 3db1d231a2a410f35c62d446f486c2e258078d93a5f4a04b66ee6ca36144512e`

- Ran commands on an already running container with
`docker exec -it mysqlsaaragh mysql -uroot -p`

- Checked mysql hostname with
`select @@hostname;`

  <pre>
  +--------------+
  | @@hostname   |
  +--------------+
  | 3db1d231a2a4 |
  +--------------+
  </pre>

- Checked mysql username with
`select user();`
  <pre>
  +----------------+
  | user()         |
  +----------------+
  | root@localhost |
  +----------------+
  </pre>

- Created DB with `create database saaragh;` and checked it with 
`show databases;`
  <pre>
  +--------------------+
  | Database           |
  +--------------------+
  | information_schema |
  | mysql              |
  | performance_schema |
  | saaragh            |
  | sys                |
  +--------------------+
  </pre>

- Altered user role with `alter user 'root' identified with mysql_native_password by 'password';` and `flush privileges;`

- Granted all privileges with `grant all privileges on *.* to 'root' with grant option;`

- Created a table with
`create table users (id int not null auto_increment, name varchar(255) not null, email varchar(255) not null, age int, primary key (id));`

- Install the dependencies with 
`npm i sequelize mysql2 nodemailer node-cron dotenv`

Few References:

https://medium.com/tech-learn-share/docker-mysql-access-denied-for-user-172-17-0-1-using-password-yes-c5eadad582d3

https://www.configserverfirewall.com/docker/run-mysql-docker-containers/

https://codeforgeek.com/nodejs-mysql-tutorial/

https://www.section.io/engineering-education/node-mailer/