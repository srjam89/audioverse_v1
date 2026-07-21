const pool = require("../../config/db");

async function findAll() {
  const result = await pool.query(`
    SELECT url, image, image_mobile, date_add, date_upd
    FROM public.av_imageslider
    ORDER BY date_add ASC
  `);

  return result.rows;
}

module.exports = { findAll };
