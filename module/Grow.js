const db = require('../lib/database');

var Grow = function(){};

Grow.prototype.getAll = function(cb){
  const sql = 'select Grow.aid,atitle,acontent,acomment,aimage,atime,GROUP_CONCAT(acloumn),aprivate,astatus from Grow,GrowColumn where Grow.aid = GrowColumn.aid group by Grow.aid';
  db.query(sql,(err,result)=>{
    if(err){
      cb(true);
      return;
    }else{
      cb(false,result);
    }
  })
}

Grow.prototype.selectGrow = function(name,cb){
  const sql = 'select Grow.aid,atitle,acontent,acomment,aimage,atime,GROUP_CONCAT(acloumn),aprivate,astatus from Grow,GrowColumn where Grow.aid = GrowColumn.aid and atitle like ? group by Grow.aid';
  db.query(sql,['%' + name + '%'],(err,result)=>{
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
  db.query(sql,[obj.aid,obj.atitle,obj.acontent,Date().slice(0,24),obj.acomment,obj.aimage,1,1,obj.uid],function(err,result){
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
    const sql = 'delete from Grow where aid = ?';
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
