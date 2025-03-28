# Alpine-Cron

A lightweight Docker image based on Alpine Linux with cron functionality.

## Overview

This project provides a minimal Docker image built on Alpine Linux that includes a working cron daemon (dcron). It's designed to be a small, efficient base image for running scheduled tasks in containerized environments.

## Features

- Based on Alpine Linux for minimal footprint
- Uses dcron for reliable scheduling
- Simple mounting of crontab files via volumes
- Automatic loading of crontab files at startup

## Usage

### Basic Usage

```dockerfile
FROM sonnvest/alpine-cron:latest

# Add your scripts
COPY scripts/ /scripts/

# Make scripts executable
RUN chmod +x /scripts/*
```

Then mount your crontab files to the `/crontabs` directory:

```bash
docker run -d --name my-cron -v ./my-crontabs:/crontabs marcelh89/alpine-cron:latest
```

### Using Docker Compose

Create a `docker-compose.yml` file:

```yaml
services:
  cron:
    image: sonnvest/alpine-cron:latest
    volumes:
      - ./crontabs:/crontabs
    restart: unless-stopped
```

And then run:

```bash
docker-compose up -d
```

### Crontab Format

Crontab files should follow the standard cron format:

```
# minute hour day month weekday command
* * * * * echo "This runs every minute" >> /var/log/cron.log
```

Example crontab entries:

```
# Run every 5 minutes
*/5 * * * * /scripts/task.sh

# Run at 2:30am every day
30 2 * * * /scripts/daily-backup.sh

# Run at midnight on the first day of each month
0 0 1 * * /scripts/monthly-report.sh
```

### Monitoring

Cron logs are directed to stdout, so you can view them with:

```bash
docker logs my-cron
```

## Building Locally

```bash
docker build -t alpine-cron .
```

## How It Works

The image works by:

1. Creating a `/crontabs` directory for mounting external crontab files
2. Using an entrypoint script that:
   - Loads all crontab files from the `/crontabs` directory
   - Appends them to the root crontab
   - Starts the cron daemon in foreground mode with log level 8
