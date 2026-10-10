CREATE TABLE `newsletter_subscribers` (
	`email` text PRIMARY KEY NOT NULL,
	`token` text NOT NULL,
	`status` text DEFAULT 'pending_delivery_setup' NOT NULL,
	`consented` integer NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `newsletter_token` ON `newsletter_subscribers` (`token`);