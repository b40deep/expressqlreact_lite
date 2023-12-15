import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

/**
 * DB Schema:
 * planb_nxtsql_db
 *  |- notestable
 *      |- id
 *      |- title
 *      |- contents
 *      |- created
 */

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  })
  .promise();

// console.log(process.env.MYSQL_USER,process.env.MYSQL_DATABASE,process.env.MYSQL_HOST);

export async function getNotes() {
  const [rows] = await pool.query(`SELECT * FROM ${process.env.MYSQL_T_NOTES}`);
  return rows;
}

export async function getNote(id) {
  const [row] = await pool.query(
    `SELECT * FROM 
        ${process.env.MYSQL_T_NOTES} 
        WHERE id = ?`,
    [id]
  );
  return row[0];
}

export async function createNote(title, contents) {
  const [res] = await pool.query(
    `INSERT INTO 
        ${process.env.MYSQL_T_NOTES} 
        (title, contents) 
        VALUES (?, ?)`,
    [title, contents]
  );
  return getNotes();
}

export async function updateNote(id, title, contents) {
  const [res] = await pool.query(
    `UPDATE ${process.env.MYSQL_T_NOTES} SET title = ?, 
        contents = ?  
        WHERE id = ?`,
    [title, contents, id]
  );
  return getNotes();
}

export async function deleteNote(id) {
  const [res] = await pool.query(
    `DELETE FROM ${process.env.MYSQL_T_NOTES} 
        WHERE ${process.env.MYSQL_T_NOTES}.id = ?`,
    [id]
  );
  return getNotes();
}

// const insert = await createNote('5 note','the 55555 note is not a fiver')
// const insert = await updateNote(4, 'fourth note','the force note is fourth')
const notes = await getNotes();
console.log(notes);
