DROP DATABASE IF EXISTS database_links;
CREATE database_links CHARSET utf8mb4;
USE database_links;

CREATE TABLE user(
    id int auto_increment primary key not null unsigned,
    username varchar(50) not null,
    password varchar(50) not null,
    email varchar(100) not null,
    fullname varchar(100) not null
);

create table links(
    id int auto_increment primary key not null unsigned,
    title varchar(250) not null,
    url varchar(250) not null,
    descripcion text,
    user_id int unsigned,
    created_at timestamp not null default current_timestamp,
    constraint fk_user foreign key(user_id) references user(id)
)