# snip — URL Shortener

A full-stack URL shortener with a REST API, built with Node.js, Supabase, and Docker.

## Tech Stack
- Backend: Node.js, Express, Supabase (PostgreSQL)
- Frontend: React (Vite)
- DevOps: Docker, GitHub Actions CI/CD

## Features
- Shorten any URL instantly
- Duplicate detection — same URL always returns the same short link
- Dockerized — runs with a single command

## Run locally
cp backend/.env.example backend/.env  # fill in your Supabase credentials
docker-compose up --build

## API
POST /        { "longUrl": "https://..." }  → { "shortUrl": "..." }
GET  /:code   → 302 redirect to original URL