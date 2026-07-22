const pool = require("../../config/db");

function escapeLikePattern(value) {
  return value.replace(/[\\%_]/g, "\\$&");
}

async function searchByName(query, limit = 6) {
  const escapedQuery = escapeLikePattern(query);
  const containsPattern = `%${escapedQuery}%`;
  const prefixPattern = `${escapedQuery}%`;

  const result = await pool.query(
    `
      SELECT
        id_product AS id,
        name,
        link_rewrite,
        price
      FROM public.av_product
      WHERE active = '1'
        AND name ILIKE $1 ESCAPE '\\'
      ORDER BY
        CASE
          WHEN LOWER(name) = LOWER($2) THEN 0
          WHEN name ILIKE $3 ESCAPE '\\' THEN 1
          ELSE 2
        END,
        name ASC
      LIMIT $4
    `,
    [containsPattern, query, prefixPattern, limit],
  );

  return result.rows;
}

module.exports = { searchByName };
