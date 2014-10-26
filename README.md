Getting Started
-------------------------

php composer.phar install

Run a local development
------------------------
server:

php -S localhost:8000 -t src

Navigate to the homepage:
--------------------------
http://localhost:8000

Structure
-------------------------

framework/ -- REST framework we can use

handlers/ -- User defined handlers. E.g: HomeHandler, for the home page

views/ -- User defined views, which will be inserted into template.php. E.g: home.php, used by HomeHander for the home page

index.php -- Entry point for the application

template.php -- HTML template file, this allows each page to share common elements

.htaccess -- apache htaccess file
