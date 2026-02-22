CREATE TYPE "instruction_type" AS ENUM (
  'instruction',
  'tip'
);

CREATE TABLE "recipes" (
  "id" serial PRIMARY KEY NOT NULL,
  "title" text NOT NULL,
  "author_id" integer NOT NULL,
  "image_url" text,
  "flavour_text" text,
  "servings" integer NOT NULL,
  "added" date NOT NULL,
  "updated_at" date NOT NULL
);

CREATE TABLE "users" (
  "pk" serial PRIMARY KEY NOT NULL,
  "id" uuid NOT NULL,
  "display_name" varchar(255) NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL
);

CREATE TABLE "ingredients" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" text UNIQUE NOT NULL
);

CREATE TABLE "recipe_ingredients" (
  "recipe_id" integer,
  "ingredient_id" integer,
  "quantity" numeric NOT NULL,
  "unit" text,
  "pos" integer NOT NULL,
  PRIMARY KEY ("recipe_id", "ingredient_id", "pos")
);

CREATE TABLE "steps" (
  "recipe_id" int NOT NULL,
  "type" instruction_type NOT NULL,
  PRIMARY KEY ("recipe_id", "type")
);

ALTER TABLE "recipes" ADD FOREIGN KEY ("author_id") REFERENCES "users" ("id");

ALTER TABLE "recipe_ingredients" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");

ALTER TABLE "recipe_ingredients" ADD FOREIGN KEY ("ingredient_id") REFERENCES "ingredients" ("id");

ALTER TABLE "steps" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");
