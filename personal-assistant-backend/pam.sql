\echo 'Delete and recreate pam db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE pam_db;
CREATE DATABASE pam_db;
\connect pam_db

\i pam-schema.sql

\echo 'Delete and recreate pam_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE pam_test_db;
CREATE DATABASE pam_test_db;
\connect pam_test_db

\i pam-schema.sql
