CREATE TABLE users(
	id serial PRIMARY KEY,
	first_name VARCHAR (50) NOT NULL,
	last_name VARCHAR (50) NOT NULL,
	password VARCHAR (50) NOT NULL,
	email VARCHAR (355) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL,
	last_login TIMESTAMP
);

CREATE TABLE roles(
	id serial PRIMARY KEY,
	role_name VARCHAR (50) NOT NULL,
	created_on TIMESTAMP NOT NULL,
	updated_on TIMESTAMP
);

CREATE TABLE viruses(
	id serial PRIMARY KEY,
	status VARCHAR (50),
	region VARCHAR (100),
	country VARCHAR (355),
	admin1 VARCHAR (355),
	locality_name VARCHAR (355),
	locality_quality VARCHAR (355),
	longitude NUMERIC,
	latitude NUMERIC,
	observation_date DATE,
	reporting_date DATE,
	sum_at_risk NUMERIC,
	sum_cases NUMERIC,
	sum_deaths NUMERIC,
	sum_destroyed NUMERIC,
	sum_slaughtered NUMERIC,
	humans_gender_desc NUMERIC,
	human_age NUMERIC,
	humans_affected NUMERIC,
	humans_deaths NUMERIC
);

CREATE TABLE sources(
	id serial PRIMARY KEY,
	source_name VARCHAR(100) NOT NULL,
	created_on TIMESTAMP NOT NULL,
	updated_on TIMESTAMP
);

CREATE TABLE species(
	id serial PRIMARY KEY,
	species_type VARCHAR (100) NOT NULL,
	species_name VARCHAR (100),
	created_on TIMESTAMP NOT NULL,
	updated_on TIMESTAMP
);

CREATE TABLE types(
	id serial PRIMARY KEY,
	disease VARCHAR (100) NOT NULL,
	serotype VARCHAR(100),
	created_on TIMESTAMP NOT NULL,
	updated_on TIMESTAMP
);

CREATE TABLE user_roles(
	user_id serial,
	role_id serial,
	PRIMARY KEY (user_id, role_id),
	FOREIGN KEY (user_id) REFERENCES users (id),
	FOREIGN KEY (role_id) REFERENCES roles (id)
);

CREATE TABLE virus_sources(
	virus_id serial,
	source_id serial,
	PRIMARY KEY (virus_id, source_id),
	FOREIGN KEY (virus_id) REFERENCES viruses (id),
	FOREIGN KEY (source_id) REFERENCES sources (id)
);

CREATE TABLE virus_species(
	virus_id serial,
	species_id serial,
	PRIMARY KEY (virus_id, species_id),
	FOREIGN KEY (virus_id) REFERENCES viruses (id),
	FOREIGN KEY (species_id) REFERENCES species (id)
);

CREATE TABLE virus_type(
	virus_id serial,
	type_id serial,
	PRIMARY KEY (virus_id, type_id),
	FOREIGN KEY (virus_id) REFERENCES viruses (id),
	FOREIGN KEY (type_id) REFERENCES types (id)
);