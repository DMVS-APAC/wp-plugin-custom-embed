#!/bin/bash
set -e

if [ $1 == "sniff" ]; then
  vendor/bin/phpcs --standard=WordPress-VIP-Go -sp --basepath=. --ignore=vendor */*/*.php
  exit 1

elif [ $1 == "sniff-vendor" ]; then
  vendor/bin/phpcs --standard=WordPress-VIP-Go -sp --basepath=. vendor/yahnis-elsts/*/*/*.php
  exit 1

elif [ $1 == "prod" ]; then
  composer install --no-dev --optimize-autoloader --no-progress --no-suggest --no-interaction
  exit 1
fi
