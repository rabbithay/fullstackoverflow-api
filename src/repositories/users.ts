import connection from 'database/database';

export interface UserInfo {
    id?: number;
    name: string;
    class: string;
    token: string;
    points?: number;
  }

export async function selectUserByToken(token: UserInfo['token']) {
  const resolve = await connection.query(`
      SELECT
      user_id as id,
      user_name as name,
      user_class as class
      FROM users
      WHERE token = $1
    `, [token]);

  if (resolve.rowCount === 0) return false;

  const { id, name, class: studentClass }: UserInfo = resolve.rows[0];
  const user = { id, name, class: studentClass };

  return user;
}

export async function insertUser(userInfo: UserInfo) {
  const { name, class: studentClass, token } = userInfo;
  await connection.query(`
        INSERT INTO users
        (user_name, user_class, token)
        VALUES ($1, $2, $3)
    `, [name, studentClass, token]);
}

export async function selectUsersByScore() {
  //
}
