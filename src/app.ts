import * as express from "express";
import {DataBaseManager} from './postGresSql/DB';
import * as fromQueries from './postGresSql/queries.ts';
const app = express();
const db=new DataBaseManager ();
const port = process.env.PORT || 3000
app.listen(port, (err) => {
  if (err) {
    console.log("ererer");
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
});
app.get("/",(req,res)=>{
  console.log("iam");
  db.queryAll(fromQueries.selectUserAll).then
  (respo => {
    console.log("iam3");
         res.send(respo.rows[0]);

  }).catch(respo =>{

     console.log("iam2");
 var err = new Error();
  err.status = 404;
 res.send(respo);
 next(err);
  });
});

app.get("/false",(req,res,next)=>{
  db.queryAll(fromQueries.selectFalse).then
  (respo => {
         res.send(respo.rows[0]);

  }).catch(respo =>{
 next(respo);
  });
});

app.get("/data",(req,res,next)=>{
  db.querySome(fromQueries.selectUserById,[1]).then
  (respo => {
         res.send(respo.rows[0]);

  }).catch(respo =>{
 next(respo);
  });
});
app.get("/dataVal/:id",(req,res,next)=>{

  db.querySome(fromQueries.selectUserById,[req.params.id]).then
  (respo => {
         res.send(respo.rows[0]);

  }).catch(respo =>{
 next(respo);
  });
});


app.use(function (err, req, res,next) {
  if(err.status !== 404) {
    return next();
  }
 
  res.send(err.message || '** Something went wrong **');
})

