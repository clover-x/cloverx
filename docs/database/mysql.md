# mysql
> wrap [sequelize](http://sequelize.readthedocs.io/en/latest)

**requirements**  
* mysql 5.6.5+

framework will append `created_at` and `updated_at` column to your every schema defination as default.
```sql
-- mysql 5.6.5+
alter table your_table_name
    add column `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    add column `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间';
```
