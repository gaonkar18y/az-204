module.exports = async function (context, req) {
    const result = [];
    try {
        context.log('Start function!');
        var pg = require('pg');

        const config = {
            host:"localhost",
            port: 5432,
            database: "studentsdb",
            user: "studentservice",
            password:"test123",
        };

        var client = new pg.Client(config);
        await client.connect();
        const res = await client.query(`select * from student;`);
        res.rows.forEach(r=>{
            result.push({
                id: r.id,
                name: r.name,
            });
        })

    } catch (e) {
        context.log(e);
    } finally {
        context.res = {
            status: 200,
            body: result
        };
    }
}