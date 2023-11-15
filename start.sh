#!/bin/bash
docker-compose up -d
yarn typeorm migration:run
yarn dev
