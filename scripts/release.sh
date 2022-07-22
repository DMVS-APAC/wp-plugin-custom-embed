#!/bin/bash
set -e

npm run release
npm run update-version
npm run build:all
git commit -am 'create tag '$1
