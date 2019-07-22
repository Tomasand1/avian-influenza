CREATE TABLE users(
	id serial PRIMARY KEY,
	first_name VARCHAR (50) NOT NULL,
	last_name VARCHAR (50) NOT NULL,
	password VARCHAR (50) NOT NULL,
	email VARCHAR (355) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
	last_login TIMESTAMP
);

CREATE TABLE roles(
	id serial PRIMARY KEY,
	role_name VARCHAR (50) NOT NULL,
	created_on TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
	updated_on TIMESTAMP
);

CREATE TABLE bird_point_data(
	id uuid DEFAULT uuid_generate_v4(),
	global_unique_id VARCHAR (355),
	last_edited_date VARCHAR (100),
	taxonomic_order NUMERIC,
	category VARCHAR (10),
	common_name VARCHAR (100),
	scientific_name VARCHAR (100),
	subspecies_common_name VARCHAR (100),
	subspecies_scientific_name VARCHAR (100),
	observation_count NUMERIC,
	breeding_bird_atlas_code VARCHAR (50),
	breeding_bird_atlas_category VARCHAR (100) NOT NULL,
	age_sex VARCHAR(100),
	country VARCHAR (355),
	country_code VARCHAR (10),
	state VARCHAR (100),
	state_code VARCHAR (10),
	county VARCHAR (100),
	county_code VARCHAR (10),
	iba_code VARCHAR (50),
	bcr_code VARCHAR (50),
	usfws_code VARCHAR (50),
	atlas_block VARCHAR (50),
	locality VARCHAR (200),
	locality_id VARCHAR (50),
	locality_type VARCHAR (10),
	latitude NUMERIC,
	longitude NUMERIC,
	observation_date VARCHAR (50),
	time_observations_started VARCHAR (50),
	observer_id VARCHAR (50),
	sampling_event_identifier VARCHAR (50),
	protocol_type VARCHAR (50),
	protocol_code VARCHAR (50),
	project_code VARCHAR (50),
	duration NUMERIC,
	effort_distance NUMERIC,
	effort_area NUMERIC,
	number_observers NUMERIC,
	all_species_reported BOOLEAN,
	group_identifier VARCHAR (50),
	media BOOLEAN,
	approved BOOLEAN,
	reviewed BOOLEAN,
	reason VARCHAR (355),
	trip_comments TEXT,
	species_comments TEXT,
	created_on TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
	updated_on TIMESTAMP
	PRIMARY KEY (id)
);

CREATE TABLE viruses(
	id uuid DEFAULT uuid_generate_v4(),
	source VARCHAR (100),
	longitude NUMERIC,
	latitude NUMERIC,
	region VARCHAR (100),
	country VARCHAR (355),
	admin1 VARCHAR (355),
	locality_name VARCHAR (355),
	locality_quality VARCHAR (355),
	observation_date VARCHAR (10),
	reporting_date VARCHAR (10),
	status VARCHAR (50),
	disease VARCHAR (100) NOT NULL,
	serotype VARCHAR(100),
	species_description VARCHAR (355),
	sum_at_risk NUMERIC,
	sum_cases NUMERIC,
	sum_deaths NUMERIC,
	sum_destroyed NUMERIC,
	sum_slaughtered NUMERIC,
	humans_gender_desc VARCHAR (50),
	human_age NUMERIC,
	humans_affected NUMERIC,
	humans_deaths NUMERIC,
	created_on TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
	updated_on TIMESTAMP,
	PRIMARY KEY (id)
);

CREATE TABLE sources(
	id serial PRIMARY KEY,
	source_name VARCHAR(100) NOT NULL,
	created_on TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
	updated_on TIMESTAMP
);

CREATE TABLE species(
	id serial PRIMARY KEY,
	species_type VARCHAR (100) NOT NULL,
	species_name VARCHAR (100),
	created_on TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
	updated_on TIMESTAMP
);

CREATE TABLE types(
	id serial PRIMARY KEY,
	disease VARCHAR (100) NOT NULL,
	serotype VARCHAR(100),
	created_on TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
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