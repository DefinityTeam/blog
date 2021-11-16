CREATE DATABASE blog;
use blog;
CREATE TABLE posts (
    username text,
    id INT AUTO_INCREMENT PRIMARY KEY,
    title text,
    tagline text,
    body text,
    time text,
);

CREATE TABLE users (
    username text,
    display text,
    password_hash text
);