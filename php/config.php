<?php
require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

$server = $_ENV['DB_SERVER'];
$user = $_ENV['DB_USER'];
$pass = $_ENV['DB_PASS'];
$bd = $_ENV['DB_NAME'];

$cx = mysqli_connect($server, $user, $pass, $bd);
