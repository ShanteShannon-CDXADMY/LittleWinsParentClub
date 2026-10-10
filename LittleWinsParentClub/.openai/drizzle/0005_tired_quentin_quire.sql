CREATE TABLE `article_favorites` (
	`user_id` text NOT NULL,
	`article_id` text NOT NULL,
	`created` integer NOT NULL,
	PRIMARY KEY(`user_id`, `article_id`)
);
--> statement-breakpoint
CREATE TABLE `circle_handovers` (
	`circle_id` text PRIMARY KEY NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`version` integer DEFAULT 0 NOT NULL,
	`updated` integer NOT NULL,
	`author_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `companion_plans` (
	`user_id` text PRIMARY KEY NOT NULL,
	`data` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`updated` integer NOT NULL
);
