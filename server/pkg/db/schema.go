package db

var Schema string = `
create table "User"
(
	email_id varchar(255) not null,
	username varchar(255) not null,
	level int default 0 not null,
	last_modified timestamptz not null
);

create unique index user_email_id_uindex
	on "User" (email_id);

create unique index user_username_uindex
	on "User" (username);

alter table "User"
	add constraint user_pk
		primary key (email_id);

create table "User"
(
    email_id      varchar(255)             not null
        constraint user_pk
            primary key,
    username      varchar(255)             not null,
    level         integer default 0        not null,
    last_modified timestamp with time zone not null
);

create unique index user_email_id_uindex
    on "User" (email_id);

create unique index user_username_uindex
    on "User" (username);
`