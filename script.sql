drop table if exists tb_order_item;
drop table if exists tb_category_item;
drop table if exists tb_item;
drop table if exists tb_order;
drop table if exists tb_user;
drop table if exists tb_customer;
drop table if exists tb_category;

drop sequence if exists tb_category_id;
drop sequence if exists tb_category_item_id;
drop sequence if exists tb_user_id;
drop sequence if exists tb_customer_id;
drop sequence if exists tb_order_id;
drop sequence if exists tb_item_id;
drop sequence if exists tb_order_item_id;


create sequence tb_category_id
	increment by 1
	start with 1
	minvalue 1
	maxvalue 999999
	cache 1;

create sequence tb_category_item_id
	increment by 1
	start with 1
	minvalue 1
	maxvalue 999999
	cache 1;

create sequence tb_user_id
	INCREMENT BY 1
    START WITH 1
    MINVALUE 1
    MAXVALUE 999999
    CACHE 1;

CREATE TYPE if not exists user_type AS ENUM ('admin', 'intern', 'customer');
create type if not exists order_status as enum ('pending', 'done');
create type customer_status as enum ('active', 'closed');

create sequence tb_customer_id
	increment by 1
	start with 1
	minvalue 1
	maxvalue 999999
	cache 1;

create sequence tb_order_id
	increment by 1
	start with 1
	minvalue 1
	maxvalue 999999
	cache 1;


create sequence tb_item_id
	increment by 1
	start with 1
	minvalue 1
	maxvalue 999999
	cache 1;

create sequence tb_order_item_id
	increment by 1
	start with 1
	minvalue 1
	maxvalue 999999
	cache 1;

create table tb_user(
	 id integer default nextval('tb_user_id'),
	 name varchar(250),
	 login varchar(30),
	 password varchar(250),
	 type user_type,
	 constraint pk_user primary key (id)
);

select * from tb_user;

create table tb_customer (
	id integer default nextval('tb_customer_id'),
	name varchar (250),
	status customer_status default 'active',
	constraint pk_customer primary key (id)
);


create table tb_order(
	id integer default nextval('tb_order_id'),
	id_customer integer,
	status order_status,
	constraint fk_order_customer foreign key (id_customer)
		references tb_customer(id),
	constraint pk_order primary key (id)
);

create table tb_item(
	id integer default nextval('tb_item_id'),
	name varchar(250) not null,
	price NUMERIC(10,2) not null,
	description varchar(250),
	image varchar(250),
	constraint pk_item primary key (id),
	constraint unique_item_name unique (name)
);

create table tb_order_item(
	id integer default nextval('tb_order_item_id'),
	id_order integer,
	id_item integer,
	quantity integer,
	constraint pk_order_item primary key (id),
	constraint fk_order_item_order foreign key (id_order)
		references tb_order(id),
	constraint fk_order_item_item foreign key (id_item)
		references tb_item(id)
);


create table tb_category(
	id integer default nextval('tb_category_id'),
	name varchar(250),
	constraint pk_category primary key (id)
);

create table tb_category_item(
	id integer default nextval('tb_category_item_id'),
	id_item integer,
	id_category integer,
	constraint pk_category_item primary key (id),
	constraint fk_ci_item foreign key (id_item)
		references tb_item(id),
	constraint fk_ci_category foreign key (id_category)
		references tb_category(id)
);

select * from tb_category;
select * from tb_item;
select * from tb_order;
select * from tb_customer;
select * from tb_category;
