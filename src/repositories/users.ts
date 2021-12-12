import connection from '../database/database';

export interface UserInfo {
    id?: number;
    name: string;
    class: string;
    token: string;
    points?: number;
  }

export async function insertUser(userInfo: UserInfo) {
    const {name, class, token} = userInfo
    await connection.query(`
        INSERT INTO users
        (user_name, user_class, token)
        VALUES ($1, $2, $3)
    `, [name, class, token]);    
}

export async function selectUsersByScore() {
  //
}
