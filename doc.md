```
# 安装 mariadb 和 mariadb-server
sudo yum install -y mariadb mariadb-server

# 启动数据库服务
sudo systemctl start mariadb
# 查看数据库服务开启状态
systemctl status mariadb.service  看到Active：active 	                           （running）绿色字体的就意味着开启成功

# 配置 MariaDB root 账户的密码
mysql_secure_installation

# 配置项如下：
Enter current password for root (enter for none):回车
Set root password? [Y/n]回车
New password:输入密码（自己要记住）
Re-enter new password:再次输入密码
Remove anonymous users? [Y/n]回车
Remove test database and access to it? [Y/n]n
Reload privilege tables now? [Y/n]回车

# 访问 MariaDB
mysql -u root -p
# -p 参数会提示输入密码，输入密码后，就可以访问数据库了。
```



> linux进入数据库：`mysql -u root -p`



> 展示数据库：`show databases;`



> 删除数据库：`drop database <数据库名>;`



> 创建数据库：`CREATE DATABASE 数据库名;`



> 选择数据库：`use 数据库名;`



> 创建表：CREATE TABLE table_name (column_name column_type);

```
CREATE TABLE Recommend   
(Rid INT PRIMARY KEY， /主键 列级完整性约束条件/            
Rtitle VARCHAR(40) UNIQUE， /* Sname取唯一值*/ 
Rcontent   VARCHAR(500)，
);
CREATE TABLE Recommend (Rid INT PRIMARY KEY,RtitleVARCHAR(40) UNIQUE,Rcontent   VARCHAR(500));
```

> 查看表 ` show tables;`



> 插入表 

```
INSERT  INTO  Recommend  (Rid, Rtitle, Rcontent) VALUES (1,'哈佛大学用这12张图，教育了十几亿人','很多人把感恩当成一种付出，其实感恩本身就是一种幸福。...');
```

