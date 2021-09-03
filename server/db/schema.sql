DROP DATABASE IF EXISTS randomQuote;

CREATE DATABASE randomQuote;

USE randomQuote;

CREATE TABLE quoteList (
  quoteId INT NOT NULL AUTO_INCREMENT, quote VARCHAR(100) NOT NULL, PRIMARY KEY (quoteId)
);

INSERT INTO quoteList (quote) VALUES
	('this is a quote'),
  ('here is another quote i like'),
  ('what even is quote'),
  ('quote quote quote quotey quote quote'),
  ('i should really add some quotes later');
