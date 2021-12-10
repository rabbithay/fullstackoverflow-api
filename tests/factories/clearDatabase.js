import connection from '../../src/database/database';

export async function clearDatabase() {
    await connection.query('DELETE FROM etc');

}