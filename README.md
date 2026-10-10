# Little Wins site and app source

This repository contains the HTML, CSS, JavaScript, images, icons, manifests, and server route files available in the workspace source bundle.

## Folders

- `LittleWinsParentClub/` — parenting blog, articles, and embedded companion app in `planner/`.
- `LittleWinsStandaloneApp/` — installable standalone app and supporting client/server files.

## Run a local preview

From either folder, run `python3 -m http.server 8000` and open `http://localhost:8000/` in a browser. In the blog folder, the embedded companion app is at `/planner/`.

Account sign-in, account-backed saves, and the Parent Club forum rely on hosted Site services and bindings. Credentials and deployment settings are not included.

## Snapshot note

This is the latest local source snapshot in the workspace and may not include edits made directly to the live Site after the bundle was prepared. Generated `server/assets.js` deployment maps are omitted; source files and supporting assets are included.
