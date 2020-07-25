# delilah_Resto_Project

Delilah Resto project is an API for a restaurant, where people can create an user and make their orders, follow them, and receive them in your address.
Manager of the restaurant can check orders, update their statuses, add new products and update their availability, delete users and orders, also can manage order statuses and payment methods.

## Getting Started

These instructions will get you instructions about how the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You must first donwload Postman or any other collaboration platform for API development. After that, you need to download XAMPP to manage the database or your preferred service. Also you need a node js editor where you can use npm as VSCode or others.

```
https://www.postman.com/downloads/
https://www.apachefriends.org/download.html
https://code.visualstudio.com/download
```

### Installing

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

The phpMyAdmin is a free software tool written in PHP, intended to handle the administration of MySQL over the Web. Open it in your browser using URL below. (Or open your app preferred).
The phpMyAdmin supports a wide range of operations on MySQL. Frequently used operations (managing databases, tables, columns, relations, indexes, users, permissions, etc) can be performed via the user interface, while you still have the ability to directly execute any SQL statement.

```
http://localhost/phpmyadmin/index.php 
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
<<<<<<< HEAD
* etc
=======
* etc
>>>>>>> 285a22f6a9fab0a4234998e9059104931f6cabd5
