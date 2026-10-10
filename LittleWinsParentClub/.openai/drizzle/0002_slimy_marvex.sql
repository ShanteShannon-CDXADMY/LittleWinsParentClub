CREATE TABLE `activity_favorites` (
	`user_id` text NOT NULL,
	`stage` integer NOT NULL,
	`activity` integer NOT NULL,
	`created` integer NOT NULL,
	PRIMARY KEY(`user_id`, `stage`, `activity`)
);
