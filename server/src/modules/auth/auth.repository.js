const pool = require("../../config/db");
const { clearStr } = require("../../../utils/utils");

const findByEmail = async (email) => {
  const result = await pool.query(
    `
        SELECT * FROM public.av_customer WHERE email = $1
    `,
    [email],
  );
  return result.rows[0];
};

const registerCustomer = async ({ firstname, lastname, email, password }) => {
  const result = await pool.query(
    `INSERT INTO public.av_customer (firstname, lastname, email, passwd, last_passwd_gen, active, date_add, date_upd)
     VALUES ($1, $2, $3, $4, CURRENT_DATE, '1', CURRENT_DATE, CURRENT_DATE)
     RETURNING id_customer, firstname, lastname, email`,
    [firstname, lastname, email, password],
  );
  return result.rows[0];
};

module.exports = { findByEmail, registerCustomer };
