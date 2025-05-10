let express=require("express");
let bodyParser=require("body-parser");
let db=require("./db");

let app=express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static("public"));
//return home page as response
app.get("/",(req,res)=>{
    res.render("nav.ejs");
});

//return employee page as response browser
app.get("/addcourse",(req,res)=>{
    res.render("addcourse.ejs",{msg:""});
});

//show employee page
app.get("/viewcourse",(req,res)=>{
    db.query("select * from course",(err,result)=>{
        if(err){
            res.render("viewcourse.ejs");
        }else{
            res.render("viewcourse.ejs",{data:result});
        }
    });
    });

//accept data as request and save in database
    app.post("/save",(req,res)=>{
        let {name}=req.body;
        db.query("INSERT INTO course VALUES ('0', ?)", [name], (err, result) => {
           
            
        });
      res.render("addcourse.ejs",{msg:"Course Added Successfully..."});
    });
//delete data in table and database
    app.get("/delEmpById",(req,res)=>{
        let id=parseInt(req.query.eid.trim());
       db.query("delete from course where courseId=?",[id],(err,result)=>{
        db.query("select * from course",(err,result)=>{
            if(err){
                res.render("viewcourse.ejs");
            }else{
                res.render("viewcourse.ejs",{data:result});
            }
        });
       });
    });

//find a data in database
app.get("/search",(req,res)=>{
    let sname=req.query.sd;
    db.query("select * from course where name like'%"+sname+"%'",(err,result)=>{
        res.json(result);
    });
});

//update records as request in database
app.get("/update",(req,res)=>{
    let eid = parseInt(req.query.eid);

    db.query("select * from course where courseId=?",[eid],(err,result)=>{
       res.render("updatecourse.ejs",{erecord:result});      
    });   
});
app.post("/finalupdate", (req, res) => {
    let { courseId, name } = req.body;
    db.query("update course set name=? where courseId=?", [name, courseId], (err, result) => {});
    db.query("select * from course", (err, result) => {
        if (err) {
            res.render("viewcourse.ejs");
        } else {
            res.render("viewcourse.ejs", { data: result });
        }
    });
});

//add new records in table
app.get('/addstudent', (req, res) => {
    db.query("select * from course", (err, result) => {
      if (err) {
        console.log("Error " + err);
        res.render("addstudent.ejs", { msg: "❌ Error loading courses", data: [] });
      } else {
        res.render("addstudent.ejs", {  data: result });
      }
    });
  });

  //accept data as request and add in database 
  app.post('/savestudent', (req, res) => {
    const { sname, email, contact, courseId } = req.body;
    
  
    db.query("insert into student values ('0', ?, ?, ?, ?)", [sname, email, contact, courseId], (err) => {
      const msg = err ? "❌ Error adding student" : "✅ Student added successfully!";
      
      db.query("select * from course", (err,result) => {
        res.render("addstudent.ejs",{msg:"Student Added Successfully...", data:result});
      });
    });
  });
  
  //show data as request and display
  app.get('/viewstudent',(req,res)=>{
    db.query(" select s.sname , s.email,s.contact, s.studId, c.courseId, c.name from course c inner join student s on s.courseId = c.courseId ",(err,result)=>{
        if(err){
            console.log("Errot in"+err);
            res.render("viewstudent.ejs");
        }else{
            console.log("Data "+result)
            res.render("viewstudent.ejs",{data:result});
        }
    });
    });

//delete records  in database as request
 app.get("/delStudById",(req,res)=>{
        let id=parseInt(req.query.eid.trim());
       db.query("delete from student where studId=?",[id],(err,result)=>{
        db.query("select * from student",(err,result)=>{
            if(err){
                res.render("viewstudent.ejs");
            }else{
                res.render("viewstudent.ejs",{data:result});
            }
        });
       });
    });

    //select record s request
app.get("/studupdate",(req,res)=>{
    let eid = parseInt(req.query.eid);

    db.query("select * from student where studId=?",[eid],(err,result)=>{
       res.render("updatestudent.ejs",{erecord:result});      
    });   
});

//update record as per request
app.post("/finupdate", (req, res) => {
    let { courseId, sname,email,contact,name } = req.body;
    db.query("update stud set sname=?,email=?,contact=?,name=? where courseId=?", [name, email,contact,courseId], (err, result) => {});
    db.query("select * from course", (err, result) => {
        if (err) {
            res.render("viewcourse.ejs");
        } else {
            res.render("viewcourse.ejs", { data: result });
        }
    });
});

//server localhost starts  here 
app.listen(5000,()=>{
console.log("Server started on 5000 port");
});