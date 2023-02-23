# Frontend

Pre-requisites: Node 19+, NPM 9.2+

## Local setup

1. Install and run the frontend will the following commands:

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

2. If you change the calculations, run the unit tests:

```bash
npm run test
```

### Amplify deployment (on AWS)

Pre-requisites: Amplify CLI, AWS profile configured for access to your AWS Account

```bash
amplify push
amplify publish
```
