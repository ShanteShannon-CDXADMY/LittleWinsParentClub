CREATE TABLE `recipe_favorites` (
	`user_id` text NOT NULL,
	`recipe_id` text NOT NULL,
	`created` integer NOT NULL,
	PRIMARY KEY(`user_id`, `recipe_id`)
);
