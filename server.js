import express from 'express';
import fetch from 'node-fetch';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

// Load OpenAPI specification
const swaggerDocument = YAML.load(join(__dirname, 'openapi.yaml'));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/weather', async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude parameters are required' });
  }

  try {
    const response = await fetch(`${BASE_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const data = await response.json();

    if (response.ok) {
      const weatherData = {
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
        winddirection: data.current_weather.winddirection,
        weathercode: data.current_weather.weathercode,
        time: data.current_weather.time
      };
      res.json(weatherData);
    } else {
      res.status(response.status).json({ error: 'Failed to fetch weather data' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching weather data' });
  }
});

app.listen(port, () => {
  console.log(`Weather API server running on port ${port}`);
  console.log(`API documentation available at http://localhost:${port}/api-docs`);
});
