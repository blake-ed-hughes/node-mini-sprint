DROP DATABASE IF EXISTS;

CREATE DATABASE randomQuote;

USE randomQuote;

CREATE TABLE quoteList (
  id INT NOT NULL AUTO_INCREMENT, quote VARCHAR(500) NOT NULL, PRIMARY KEY (id)
);

INSERT INTO quoteList (quote) VALUES
	('this is a quote'),
  ('here is another quote i like'),
  ('what even is quote'),
  ('quote quote quote quotey quote quote'),
  ('i should really add some quotes later');
