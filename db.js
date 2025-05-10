let mysql=require("mysql");
let conn=mysql.createConnection({
 host:"localhost",
 user:"root",
 password:"root",
 database:"advancejava"
});
    conn.connect((err)=>{
        if(err){
            console.log("Some issue is there ")
        }else{
            console.log("database is connected");
            
        }
    });
    module.exports=conn;