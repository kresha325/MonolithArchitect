# Decap CMS OAuth Setup

This site is already prepared to use Decap CMS with the GitHub backend.

The remaining missing part is an OAuth/auth proxy so Decap can log in to GitHub and write changes back to the repository.

## Current repository settings

- Repository: `kresha325/MonolithArchitect`
- Branch: `main`
- CMS config file: `admin/config.yml`
- CMS entry page: `admin/index.html`

## What still needs to exist

You need one small external auth service with a public HTTPS URL.

After that service exists, its base URL will be added to `admin/config.yml` like this:

```yml
backend:
  name: github
  repo: kresha325/MonolithArchitect
  branch: main
  base_url: https://your-auth-service.example.com
```

## Recommended path

Use a separate auth proxy deployment and keep the portfolio itself on GitHub Pages.

That is the cleanest setup for your current project because:

- the website stays static on GitHub Pages
- Decap CMS keeps using the GitHub backend
- only the auth flow is hosted elsewhere

## What I need from you

Send these 4 things and I can finish the remaining config safely:

1. Which platform you want for the auth proxy: `Netlify`, `Vercel`, or `Cloudflare`
2. The public URL of that auth proxy after you create/deploy it
3. Confirmation of the exact GitHub repo: `kresha325/MonolithArchitect`
4. Which GitHub users should be allowed to log in and edit content

## What you need to create on GitHub

Create a GitHub OAuth App for the auth proxy.

You will need these values during setup:

- Application name: anything you want, for example `Monolith Architect CMS`
- Homepage URL: the public URL of your auth proxy
- Authorization callback URL: the callback URL required by the auth proxy you choose

After GitHub creates the app, you will get:

- Client ID
- Client Secret

Do not commit the client secret into this repo.

## What I can do after you send the details

Once you send the platform and the deployed auth URL, I can:

1. update `admin/config.yml` with the real `base_url`
2. update the README so the final production steps are accurate
3. give you the exact callback URL and GitHub OAuth values to enter if you want a platform-specific walkthrough

## What I cannot do from here

I cannot create the GitHub OAuth App inside your GitHub account or see your client secret.

Those two parts must be done by you in your GitHub and hosting accounts.
