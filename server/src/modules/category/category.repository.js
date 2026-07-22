const pool = require("../../config/db");

async function findAll() {
  const result = await pool.query(`
    SELECT
      id_category AS id,
      name,
      description,
      link_rewrite
    FROM public.av_category
    WHERE active = '1'
    ORDER BY id_category ASC
  `);

  return result.rows;
}

module.exports = { findAll };
