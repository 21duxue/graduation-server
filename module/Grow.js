const db = require('../lib/database');

var Grow = function(){};

Grow.prototype.getAll = function(cb){
  const sql = 'select Grow.Gid,Gtitle,Rcontent,Gimg,Gts from Grow;'
  db.query(sql,(err,result)=>{
    if(err){
      cb(true);
      return;
    }else{
      cb(false,result);
    }
  })
}

Grow.prototype.selectGrow = function(id,cb){
  const sql = 'select Grow.Gid,Gtitle,Rcontent,Gts,Gimg from Grow where Grow.Gts = '+id;
  db.query(sql,(err,result)=>{
    if(err){
      cb(true);
      return;
    }
    cb(false,result);
  });
}

Grow.prototype.addColumn = function(id,column,cb){
  const sql = 'insert into GrowColumn values(?,?)';
  db.query(sql,[id,column],function(err,result){
    if(err){
      cb(true);
      return;
    }
    cb(false,result);
  });
}

Grow.prototype.addGrow = function(obj,cb){
  const sql = 'insert into Grow values(?,?,?,?,?,?,?,?,?)';
  db.query(sql,[obj.Gid,obj.Gtitle,obj.Rcontent,Date().slice(0,24),obj.Gimg,],function(err,result){
    if(err){
      cb(true);
      return;
    }
    cb(false,result);
  });
}

Grow.prototype.updateItem = function(status,id,cb){
  const sql = 'update Grow set astatus = ? where aid = ?';
  db.query(sql,[status,id],function(err,result){
    if(err){
      cb(true);
      return;                
    }
    cb(false,result);      
  });
}

Grow.prototype.deleteItem = function(id,cb){
    const sql = 'delete from Grow where Gid = ?';
    db.query(sql,[id],function(err,result){
      if(err){
        cb(true);
        return;
      }
      cb(false,result);
    });
}

Grow.prototype.deleteColumn = function(id,cb){
    const sql = 'delete from GrowColumn where aid = ?';
    db.query(sql,[id],function(err,result){
      if(err){
        cb(true);
        return;
      }
      cb(false,result);
    });
}
Grow.prototype.updateGrow = function(obj,cb){
  const sql = 'update Grow set acomment = acomment - 1 where aid = ?';
  db.query(sql,[obj.aid],(err,result)=>{
      if(err){
        cb(true);
        return;                
      } else{
        cb(false,result);          
      }
  });
}


module.exports = Grow;
