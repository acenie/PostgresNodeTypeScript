import * as fromConfig from './dbConfig.ts';
import {Pool} from 'pg';
export class DataBaseManager
{
    pool:Pool;
   constructor()
   {
       this.pool = new Pool(fromConfig.dbConfig);
   }
   rejectResponse(reject,message:string)
   {
           let err = new Error();
        err.status = 404;
        err.message =message;
        reject(err);
   }
   queryAll(query):Promise<any>
   {
       return new Promise((resolve,reject) =>
       {
       this.pool.query(query).then(response =>{
           resolve(response);

       }).catch(respones=>{
          this.rejectResponse(reject,"No Data found for the query in readAll and server throug the following "+respones);
       })
   });     
   }
   querySome(query,value):Promise<any>
   {
       return new Promise((resolve,reject) =>
       {
         this.pool.query(query,value).then(response =>{
        resolve(response);
        }).catch(response => {

        this.rejectResponse(reject,"No data found and server returned the following "+response);
        })
       });
   }

}