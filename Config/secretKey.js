

const SECRET_KEY = 'a0c7aacd71661bb8b52ee4acac19b8ec6304597a76ada08c39e6348f5d000000';
const DB_CONFIG = {
  user: 'postgres',
  password: 'postgres',
  database: 'desafio_final',
  host: 'localhost',
  port: 5432
};
const SALT_ROUNDS = 10;

const TokenPrueba = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcmxvc2RpYXpiZWNhcjJAZ21haWwuY29tIiwidGlwbyI6IkNsaWVudGUiLCJpZCI6IjIzIiwibm9tYnJlIjoiQ2FybG9zIiwiYXBlbGxpZG8iOiJEaWF6IiwiaWF0IjoxNzMxODc2MjcwLCJleHAiOjE3MzI0ODEwNzB9.3hesx2s0wciOOISaSBxcZLS4pRzl8jktQFrhS5SBGeU';


module.exports = {
  SECRET_KEY,
  DB_CONFIG,
  SALT_ROUNDS,
  TokenPrueba
};
