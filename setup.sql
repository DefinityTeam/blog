CREATE DATABASE blog;
use blog;
CREATE TABLE posts (
    username text,
    body text,
    time text
);
CREATE TABLE users (
    username text,
    password_hash text
);