const pool = require("./config.js");
const express = require("express");
const { response } = require("express");
const router = express.Router();

router.get("/film", (req, res) => {
  const findQuery = ` 
    SELECT 
        * 
    FROM film; 
  `;

  pool.query(findQuery, (err, response) => {
    if (err) throw err;

    res.status(200).json(response.rows);
  });
});

router.get("/film/:id", (req, res) => {
  const { id } = req.params;

  const findQuery = `
      SELECT
          *
      FROM film
          WHERE film_id = $1
  `;
  pool.query(findQuery, [id], (err, response) => {
    if (err) throw err;

    res.status(200).json(response.rows[0]);
  });
});

router.get("/category", (req, res) => {
  const findQuery = `
  SELECT 
      *
  FROM category
  `;

  pool.query(findQuery, (err, response) => {
    if (err) throw err;

    res.status(200).json(response.rows);
  });
});

router.get("/listfilm", (req, res) => {
  const { id } = req.params;

  const findQuery = `
    SELECT 
      *
    FROM 
        film AS f
      INNER JOIN film_category AS fc
        ON fc.film_id = f.film_id
      INNER JOIN category AS c
        ON c.category_id = fc.category_id
      WHERE c.name = $1
  `;

  pool.query(findQuery, [id], (err, response) => {
    if (err) throw err;

    res.status(200).json(response.fields);
  });
});

router.get("/actor", (req, res) => {
  const findQuery = ` 
    SELECT * FROM actor; 
  `;

  pool.query(findQuery, (err, response) => {
    if (err) throw err;

    res.status(200).json(response.rows);
  });
});

module.exports = router;
