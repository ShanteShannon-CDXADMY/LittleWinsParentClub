CREATE TABLE `community_posts` (
	`id` text PRIMARY KEY NOT NULL,
	`parent_id` text,
	`user_id` text NOT NULL,
	`nickname` text NOT NULL,
	`topic` text NOT NULL,
	`body` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `posts_status_created` ON `community_posts` (`status`,`created`);--> statement-breakpoint
CREATE INDEX `posts_user_created` ON `community_posts` (`user_id`,`created`);--> statement-breakpoint
CREATE INDEX `posts_parent` ON `community_posts` (`parent_id`);--> statement-breakpoint
CREATE TABLE `community_reactions` (
	`post_id` text NOT NULL,
	`user_id` text NOT NULL,
	PRIMARY KEY(`post_id`, `user_id`)
);
--> statement-breakpoint
CREATE TABLE `community_reports` (
	`post_id` text NOT NULL,
	`user_id` text NOT NULL,
	`created` integer NOT NULL,
	PRIMARY KEY(`post_id`, `user_id`)
);
