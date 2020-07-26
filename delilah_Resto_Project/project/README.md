# Delilah_Resto_Project

Delilah Resto project is an API for a restaurant, where people can create an user and make their orders, follow them, and receive them in your address.
Manager of the restaurant can check orders, update their statuses, add new products and update their availability, delete users and orders, also can manage order statuses and payment methods.

## Getting Started

These instructions will get you instructions about how the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You must first donwload Postman or any other collaboration platform for API development. After that, you need to download XAMPP to manage the database or your preferred service. Also you need a node js editor where you can use npm as VSCode or others.


[Postman](https://www.postman.com/downloads/).

[XAMPP](https://www.apachefriends.org/download.html).

[Visual Studio Code](https://code.visualstudio.com/download).


#### Installing

**1. Install Postman with default install settings.**

Importing the Delilah Resto Collection by link. Go to Import option, then link option and put into the Enter a URL place holder the link below:

```
https://www.getpostman.com/collections/f93877dcc22ff4141225
```
In this way you will have all the endpoints of the Delilah Resto API to test them.

**2. Install XAMPP with default install settings.**

On the desktop you find an XAMPP Control Panel icon to execute it. When it opens in the panel you find the Apache and MySQL modules, in the section actions you have to click on start buttons, now both modules are working.

XAMPP works its MySQL module at 3306 port, if you have conflict with it because this port is busy you have to change the port configuration. Goto **xampp\phpMyAdmin directory** and find the **config.inc.php file**, now change this line *$cfg['Servers'][$i]['host'] = '127.0.0.1';* to *$cfg['Servers'][$i]['host'] = '127.0.0.1:{new port number to use}';*.

**3. Open the phpMyAdmin in your browser.**

Open phpMyAdmin to handle the administration of MySQL over the Browser. Open it in your browser using link below,to directly execute any SQL statement.

[phpMyAdmin](http://localhost/phpmyadmin/index.php) 


**4. Creating the database**

In the left margin of phpMyAdmin below the Recent and Favorites buttons, click on New option, then into the Database name insert the name **delilah_resto** and click on **Create button**.
Now you have the new database created and ready to start working.

**5. Creating the tables in the database**

Open the sql folder that is inside the project folder and open one by one each sql file, then find the **CREATE TABLE** statement.
Again in the phpMyAdmin in the margin left select the **delilah_resto** database that is empty and it only shows the option **Create Table**.
So in the top menu select the **SQL** optiion, after this in the **Run SQL query/queries on database delilah_resto** section,you will find a text field.

You must copy the **CREATE TABLE** statements from the each sql files in this order:

- Users.
- Products.
- Order_status.
- Payment_methods.
- Orders.
- Order_detail.

After this disable the checkbox foreign key checks in the bottom menu and press the button Go. Now you have the database with all its tables ready.

**6. initializing the project.**

When you open the project folder in VScode you must run the **npm install** command, it will install all the dependencies in the json package, then you will have everything you need to start the server and all the features of the app.


#### Configuration

**1. Configuring the zero-dependency module.**

Now you need to configure the dependency that will be load the environment variables from the **.env** file, who storing configuration the environment separate from code.

**Example the variables to configure:**

- SERVER_PORT = 3000 *Number port where express starting the server*.

**Connection string**

*'postgres://dataBaseUser:DataBasePassword@dataVaseHost:MySQLport/dataBaseName'*

**Adding the variables as replacemnets**

*'mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}'*

- DB_HOST = localhost
- DB_PORT = 8111
- DB_NAME = delilah_resto
- DB_USER = root *or your database user*.
- DB_PASS = *Your database password*.
- JWT_SECRET = MySecretPassword1988 *Secret string used as a part in the building user tokens*.

With all of these steps complete, you can start testing. First, you must start the server by opening the terminal and located in the project folder, run the command npm start and receive the following message:

```
[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
Server is ready at port 3000...
```

For finish you could check it out all endpoints imported in the postman previously, and start to fill the database and all their operations.

### Open and check the guide.

Into the project folder you could find the **delilah_resto.yaml**; YAML file you can open it in the link below and have a preview of all paths.

[Swagger Editor](https://editor.swagger.io/).

In the top menu you find the file option and select the import file option then select the YAML file mentioned above and open it, after this you would have the endpoints and its instructions.

## Authors

* **Fabian Ramirez** - *Initial work* - [fabiandres88](https://github.com/fabiandres88).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

**2020**