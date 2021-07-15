# lumen-auth-example
## Requirements
-   `This project used Lumen 5.4, so It need to use PHP7.1. You should install Xampp-windows-x64-7.1.32-2-VC14-installer.exe`
-   `Run Xampp/mysql server`
-   `Create new DB naming homestead`
## Usage

-   `composer install`
-   `cp .env.example .env (edit it with your database information)`
-   `php artisan jwt:secret`
-   `php artisan migrate`
-   `php -S localhost:8000 -t public`
