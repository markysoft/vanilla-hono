# vanilla-hono

Starter project for deno, hono, and datastar.
Either use as a template for a new project or as below.

## Run

```sh
deno task start
```

## Clone as a new project (remove original origin)

If you want to use this repo as a starting point for a new project, clone it into a new folder and remove the existing `origin` remote.

```sh
# Clone into a new folder name
git clone https://github.com/markysoft/vanilla-hono.git my-new-project
cd my-new-project

# Confirm current remotes
git remote -v

# Remove the original upstream remote so you can set your own
git remote remove origin
```

Then add your own remote (optional):

```sh
git remote add origin git@github.com:<you>/<your-repo>.git
git push -u origin main
```
