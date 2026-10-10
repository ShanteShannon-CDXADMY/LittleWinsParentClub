CREATE TABLE `circle_invites` (
	`token_hash` text PRIMARY KEY NOT NULL,
	`circle_id` text NOT NULL,
	`expires` integer NOT NULL,
	`used` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE INDEX `invites_circle` ON `circle_invites` (`circle_id`);--> statement-breakpoint
CREATE TABLE `circle_members` (
	`user_id` text PRIMARY KEY NOT NULL,
	`circle_id` text NOT NULL,
	`nickname` text NOT NULL,
	`role` text NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `members_circle` ON `circle_members` (`circle_id`);--> statement-breakpoint
CREATE TABLE `circle_tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`circle_id` text NOT NULL,
	`title` text NOT NULL,
	`assignee` text,
	`done` integer DEFAULT 0 NOT NULL,
	`version` integer DEFAULT 0 NOT NULL,
	`updated` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `tasks_circle` ON `circle_tasks` (`circle_id`);--> statement-breakpoint
CREATE TABLE `family_circles` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`owner_id` text NOT NULL,
	`created` integer NOT NULL
);
