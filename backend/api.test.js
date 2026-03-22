const axios = require('./utils/axios');

// POST / — shorten URL
test('returns a short URL for a valid long URL', async () => {
  const response = await axios.post('/', { longUrl: 'https://google.com/' });
  
  expect(response.status).toBe(201);
  expect(response.data.shortUrl).toBeDefined();
  expect(response.data.shortUrl).toMatch(/^http:\/\/localhost:3000\/[a-zA-Z0-9]+$/);
});

test('returns the same short URL for a duplicate long URL', async () => {
  const longUrl = 'https://example.com/';
  
  const first = await axios.post('/', { longUrl });
  const second = await axios.post('/', { longUrl });

  expect(first.data.shortUrl).toBe(second.data.shortUrl);
});

test('returns 400 for missing URL', async () => {
  try {
    await axios.post('/', {});
  } catch (error) {
    expect(error.response.status).toBe(400);
    expect(error.response.data.error).toBe('URL is required');
  }
});

test('returns 400 for invalid URL format', async () => {
  try {
    await axios.post('/', { longUrl: 'not-a-url' });
  } catch (error) {
    expect(error.response.status).toBe(400);
    expect(error.response.data.error).toMatch(/invalid url/i);
  }
});

// GET /:shortCode — redirect
test('redirects a valid short code', async () => {
  // First create a short URL
  const { data } = await axios.post('/', { longUrl: 'https://github.com/' });
  const code = data.shortUrl.split('/').pop();

  // Then hit the redirect endpoint
  const response = await axios.get(`/${code}`);
  expect(response.status).toBe(200); // axios follows the redirect
});

test('returns 404 for unknown short code', async () => {
  try {
    await axios.get('/thisdoesnotexist999');
  } catch (error) {
    expect(error.response.status).toBe(404);
    expect(error.response.data.error).toBe('URL not found');
  }
});