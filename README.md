# Weather API

This is a simple Weather API that fetches data from OpenMeteo, a free and open-source weather data provider. The API is built with Node.js and Express, and it's documented using OpenAPI 3.0 Specification.

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
   For development with auto-restart on file changes:
   ```
   npm run dev
   ```

## Usage

Once the server is running, you can access the API documentation at:

```
http://localhost:3000/api-docs
```

To get weather data, make a GET request to:

```
http://localhost:3000/weather?latitude=51.5074&longitude=-0.1278
```

Replace the latitude and longitude values with the coordinates of the location you're interested in.

## API Response

The API returns the following weather data:

- temperature
- windspeed
- winddirection
- weathercode
- time

## License

This project is open source and available under the [MIT License](LICENSE).
