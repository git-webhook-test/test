
CREATE TABLE IF NOT EXISTS webhooks (
  type                 VARCHAR(128) NOT NULL DEFAULT 0,
  name                 VARCHAR(128) NOT NULL DEFAULT 0,
  token                VARCHAR(128) NOT NULL DEFAULT 0,
  url                  VARCHAR(128) NOT NULL DEFAULT 0,
  created_at           TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  PRIMARY KEY(name, type)
);