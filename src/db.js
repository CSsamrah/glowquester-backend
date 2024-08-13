const Pool=require('pg').Pool;

const pool=new Pool({
    user:"postgres",
    password:"samrah",
    host:"localhost",
    port:5432,
    database:"glowquester"
});
module.exports=pool;