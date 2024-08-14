const {Pool}=require('pg')

const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "samrah",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_DATABASE || "glowquester"
});

module.exports=pool;
