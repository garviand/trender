#!/bin/bash
docker-compose stop -t 1 backend
docker-compose build backend
docker-compose start backend