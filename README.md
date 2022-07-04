# Welcome to my Airport Journey Calculator

To get started, create a fork of this repository and install the packages...

```bash
npm i
```

## API Keys

This app leverages two private external APIs. You will need to generate an API key for each in order to fully demo the app. Both APIs have free tiers that are more than enough for demo-ing needs. If you need to gain quick access, you can let me know and I will share a temporary API key that you may use for each.

Once you have acquired your keys, access the file in the root of the project called `example-env`. Enter the API keys in the appropriate locations within the file, renaming the file to `.env` once done.

ENSURE THAT YOUR KEY IS PROTECTED BY ADDING `.env` TO THE `.gitignore` file in the root of the project.

### Google Geocode API for postcode lookup

Open [https://developers.google.com/maps/documentation/geocoding/overview](https://developers.google.com/maps/documentation/geocoding/overview) and follow the instructions to create a key.

### TOMTOM Routing API to calculate distance between locations.

Open [https://developer.tomtom.com/routing-api/documentation/routing/routing-service](https://developer.tomtom.com/routing-api/documentation/routing/routing-service) and follow the instructions to create a key.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
