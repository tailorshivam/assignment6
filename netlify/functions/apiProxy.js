import fetch from 'node-fetch';

export async function handler(event, context) {
  const API_KEY = process.env.API_KEY; // Secured!
  const query = event.queryStringParameters.query;

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' })
    };
  }
}