## mysql
**requirements**  
* mysql 5.6.5+

framework will append `created_at` and `updated_at` column to your every schema defination as default.
```sql
-- mysql 5.6.5+
alter table bundle
    add column `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
 	add column `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间';
``
