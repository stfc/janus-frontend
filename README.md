# Janus-Frontend

Web frontend server for janus-core

## Installation

Clone the repository from Github and then install with npm:

```bash
git clone git@github.com:Cbameron12/janus-frontend.git
npm install
```

## Setup and developing

Once you've installed dependencies, copy .env-template and rename the copy `.env` and change the variables as required. Default settings allow you to run the server locally. To start a development server run with npm:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
