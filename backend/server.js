const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const generateShortCode = require('./utils/lib');

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

async function getUniqueShortCode() {
  let shortCode;
  let exists = true;

  while (exists) {
    shortCode = generateShortCode(10);
    const { data } = await supabase
      .from('urls')
      .select('shortend')
      .eq('shortend', shortCode)
      .maybeSingle();
    exists = !!data;
  }

  return shortCode;
}

app.post('/', async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: 'URL is required' });
  }

  if (!isValidUrl(longUrl)) {
    return res.status(400).json({ error: 'Invalid URL. Must start with http:// or https://' });
  }

  const { data: existing } = await supabase
    .from('urls')
    .select('shortend')
    .eq('original', longUrl)
    .maybeSingle();

  if (existing) {
    return res.status(201).json({ shortUrl: `${process.env.BASE_URL}/${existing.shortend}` });
  }

  const shortCode = await getUniqueShortCode();

  const { data, error } = await supabase
    .from('urls')
    .insert([{ original: longUrl, shortend: shortCode }])
    .select('shortend')
    .single();

  if (error || !data) {
    console.error('Insert error:', error);
    return res.status(500).json({ error: 'Failed to shorten URL' });
  }

  return res.status(201).json({ shortUrl: `${process.env.BASE_URL}/${data.shortend}` });
});

app.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  const { data, error } = await supabase
    .from('urls')
    .select('original')
    .eq('shortend', shortCode)
    .maybeSingle();

  if (!data) {
    return res.redirect(`${process.env.FRONTEND_BASE_URL}/404`);
  }

  return res.redirect(302, data.original);
});

app.listen(PORT, () => {
  console.log('Server running on port 3000');
});
