# Decap CMS OAuth Setup

This site is already prepared to use Decap CMS with the GitHub backend.

## Current repository settings

- Repository: `kresha325/MonolithArchitect`
- Branch: `main`
- CMS config file: `admin/config.yml`
- CMS entry page: `admin/index.html`

## Current live URLs

- Public site: `https://kresha325.github.io/MonolithArchitect/`
- Netlify admin: `https://monolitharchitect.netlify.app/admin/`

## Active setup

For this project, the active setup is:

- keep the public website on GitHub Pages
- deploy the same repo once on Netlify
- use the Netlify URL only for `admin/` login and content editing

Netlify handles the GitHub OAuth flow for Decap CMS, while GitHub Pages continues to serve the public site.

In this setup, you do not need `base_url` in `admin/config.yml` as long as you access the CMS from the Netlify-hosted copy.

## Admin usage

1. Open `https://monolitharchitect.netlify.app/admin/`.
2. Log in with GitHub.
3. Edit the `Projects` entry.
4. Save changes so Decap CMS commits them to the repository.
5. Let GitHub Pages deploy the updated public site from `main`.

## Notes

- The old hidden shortcut `monolithadmin` is no longer part of the active admin workflow.
- The public site stays on GitHub Pages.
- The admin workflow now lives on the Netlify URL only.
