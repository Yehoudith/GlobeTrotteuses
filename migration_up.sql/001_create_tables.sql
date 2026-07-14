CREATE TABLE Users(
   user_id SERIAL PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   surname VARCHAR(50) NOT NULL,
   email VARCHAR(50) NOT NULL UNIQUE,
   password VARCHAR(255) NOT NULL
);

CREATE TABLE Travels(
   travel_id SERIAL PRIMARY KEY,
   title VARCHAR(50) NOT NULL,
   starting_date TIMESTAMPTZ,
   ending_date TIMESTAMPTZ,
   is_archived BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Accommodations(
   accommodation_id SERIAL PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   address VARCHAR(100) NOT NULL,
   check_in_date TIMESTAMPTZ NOT NULL,
   check_out_date TIMESTAMPTZ NOT NULL,
   travel_id SERIAL,
   FOREIGN KEY(travel_id) REFERENCES Travels(travel_id) ON DELETE CASCADE,
   CHECK (check_out_date > check_in_date)
);

CREATE TYPE transport_type AS ENUM (
    'plane','train','car','bus','boat','ferry','metro','tram','taxi','bike','walking'
);

CREATE TABLE Transports(
   transport_id SERIAL PRIMARY KEY NOT NULL,
   departure_place VARCHAR(100) NOT NULL,
   arrival_place VARCHAR(100) NOT NULL,
   departure_time TIMESTAMPTZ NOT NULL,
   arrival_time TIMESTAMPTZ NOT NULL,
   transport_type transport_type NOT NULL,
   travel_id SERIAL,
   FOREIGN KEY(travel_id) REFERENCES Travels(travel_id) ON DELETE CASCADE,
   CHECK (arrival_time > departure_time)
);

CREATE TABLE Activities(
   activity_id SERIAL PRIMARY KEY NOT NULL,
   title VARCHAR(50) NOT NULL,
   place VARCHAR(100) NOT NULL,
   description TEXT,
   starting_time TIMESTAMPTZ NOT NULL,
   ending_time TIMESTAMPTZ NOT NULL,
   category VARCHAR(50),
   travel_id SERIAL,
   FOREIGN KEY(travel_id) REFERENCES Travels(travel_id) ON DELETE CASCADE,
   CHECK (ending_time > starting_time)
);

CREATE TYPE status AS ENUM('to do', 'in progress', 'done');
CREATE TYPE category_task AS ENUM('accommodation', 'transport', 'activity');

CREATE TABLE Tasks(
   task_id SERIAL PRIMARY KEY NOT NULL,
   title VARCHAR(50) NOT NULL,
   status status NOT NULL,
   category category_task NOT NULL,
   user_id SERIAL,
   travel_id SERIAL,
   FOREIGN KEY(user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
   FOREIGN KEY(travel_id) REFERENCES Travels(travel_id) ON DELETE CASCADE
);

CREATE TABLE participate(
   user_id SERIAL,
   travel_id SERIAL,
   PRIMARY KEY(user_id, travel_id),
   FOREIGN KEY(user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
   FOREIGN KEY(travel_id) REFERENCES Travels(travel_id) ON DELETE CASCADE
);