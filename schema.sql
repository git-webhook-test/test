
CREATE TABLE IF NOT EXISTS webhooks (
  name                 VARCHAR(128) NOT NULL DEFAULT 0,
  url                  VARCHAR(128) NOT NULL DEFAULT 0,
  created_at           TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  PRIMARY KEY(name)
);