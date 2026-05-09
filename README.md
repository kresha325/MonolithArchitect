# Monolith Architects

Static multipage portfolio website for Monolith Architects.

## Pages

- Home
- Projects
- About
- Services
- Contact
- Admin

## Features

- Premium responsive UI
- Multi-language support: English, French, German, Russian, Arabic, Chinese
- URL-based localization with `?lang=` parameter
- RTL support for Arabic
- Formspree contact form integration
- Custom language dropdown
- Decap CMS entry at `admin/`
- Shared project data rendered across home, projects, and category pages
- Repository-backed project content in `data/projects.json`
- Multi-image project support with the first image used as cover
- Localized project titles and alt text per supported language

## Structure

- `index.html` - homepage
- `projects/index.html` - projects page
- `about/index.html` - about page
- `services/index.html` - services page
- `contact/index.html` - contact page
- `admin/index.html` - Decap CMS entry page
- `admin/config.yml` - Decap CMS configuration
- `data/projects.json` - repository-backed project content
- `styles.css` - shared styles
- `script.js` - localization, navigation, form logic, and project rendering

## Run locally

Open `index.html` in a browser or serve the folder with a local static server.

To manage projects in production, open `admin/index.html` after configuring Decap CMS GitHub authentication.

## GitHub Pages deploy

This repository is prepared to deploy automatically from `main` to GitHub Pages.

Expected default URL:

- `https://kresha325.github.io/MonolithArchitect/`

To enable it in GitHub:

1. Go to the repository settings.
2. Open `Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main` and wait for the `Deploy GitHub Pages` workflow to finish.

## Decap CMS setup still required

1. If your default branch changes from `main`, update `branch:` in `admin/config.yml`.
2. Deploy or configure a GitHub OAuth/auth proxy for Decap CMS and add its URL as `base_url:` in `admin/config.yml`.
3. Make sure the GitHub user who logs into the CMS has push access to the repository.
4. Serve the site over `http://` or `https://` when testing the CMS. Direct `file://` opening is not enough for authenticated editing.

See `docs/decap-oauth-setup.md` for the exact remaining OAuth steps and the values you need to prepare.
