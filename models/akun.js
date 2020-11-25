const mysql = require('mysql');
const connecting = require('../config/mysql');
class AkunModel {
    async getAkun(filter = null, resultCallback = () => { }, errorCallback = () => { }) {
        const conn = connecting();
        let sql = 'SELECT * FROM akun'
        if (filter && typeof (filter) === 'object') {
            const key = Object.keys(filter);
            const count = key.length;
            key.forEach((k, i) => {
                if (i < (count - 1))
                    sql += ` WHERE ${k} = '${filter[k]}' AND`;
                else if (count != 1 && i == (count - 1))
                    sql += ` ${k} = '${filter[k]}'`;

                else if (count == 1)
                    sql += ` WHERE ${k} = '${filter[k]}'`;

            });
        }
        console.log(sql);
        const akun = await conn.query(sql, async (err, res) => {
            if (err) {
                errorCallback(err);
            }
            if (!res)
                res = [];
            resultCallback(res);
        });
    }

    async register(post, onSuccess = () => { }, onError = () => { }) {
        const conn = connecting();
        let sql = 'INSERT INTO akun '
        if (post && typeof (post) === 'object') {
            const key = Object.keys(post);
            const count = key.length;
            const fieldMap = {
                'id': 'id',
                'user': 'username',
                'pass': 'password',
                'email': 'email'
            }
            if (count == 1)
                sql += `(${fieldMap[key[0]]}) VALUES ('${post[key[0]]}')`;

            else {
                // Tentukan Field
                sql += '(';
                key.forEach((k, i) => {
                    if (i < (count - 1))
                        sql += `${fieldMap[k]}, `;
                    else if (i == (count - 1))
                        sql += `${fieldMap[k]})`


                });

                // Isi Field

                sql += 'VALUES(';
                key.forEach((k, i) => {
                    if (i < (count - 1))
                        sql += `'${post[k]}', `;
                    else if (i == (count - 1))
                        sql += `'${post[k]}')`;

                });
            }
        }
        console.log(sql);
        const akun = await conn.query(sql, async (err, res) => {
            if (err) {
                onError(err);
            }
            if (!res)
                res = [];
            onSuccess(res);
        });
    }
}

module.exports = AkunModel;