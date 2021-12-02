CREATE DATABASE blog;
USE blog;
CREATE TABLE IF NOT EXISTS posts (
    username text,
    id INT AUTO_INCREMENT PRIMARY KEY,
    title text,
    tagline text,
    body text,
    time text
);
CREATE TABLE IF NOT EXISTS users (
    username text,
    display text,
    password_hash text
);
SHOW warnings;