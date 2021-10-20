
CREATE TABLE users(
  user_id TEXT PRIMARY KEY,
  username VARCHAR(25) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE  events(
  id  TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  time TEXT,
  date TEXT NOT NULL,
  icon TEXT DEFAULT "https://images.unsplash.com/photo-1633526543814-9718c8922b7a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXBwb2ludG1lbnQlMjBpY29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  user_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE  dailies(
  id TEXT PRIMARY KEY,
  text TEXT,
  user_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE
);
