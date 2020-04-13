# Electron-Mysql-CRUD

This project is a first electron-mysql project approach  that will be used for start up another projects. It is only a skeleton.

## Require installed
- NodeJS v13.5 or latest
- MySQL or MariaDB

## Configuration

- In project root directory, run next command:
  ```
  cp .env.dist .env
  ```
  and change the parameters USER and PASSWORD used in your system. They are the user name and password of mysql. 

- Create in mysql the database named `electrondb`
  ```sql
  CREATE DATABASE electrondb;
  ```

- Create in mysql the table `products`
  ```sql
  USE electrondb;
  CREATE TABLE products(
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT DEFAULT NULL,
  CONSTRAINT pk_product PRIMARY KEY USING BTREE (id));
  ```

## Start project

```
npm install
npm run migration
npm start
```