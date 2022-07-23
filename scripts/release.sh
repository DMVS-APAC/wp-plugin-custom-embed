#!/bin/bash
set -e

npm run release
npm run update-version
npm run build:all

CURRENT_VERSION=$(npm run version --silent)

git tag -a v$CURRENT_VERSION -m "created tag v$CURRENT_VERSION"
git commit -am "chore: release to version $CURRENT_VERSION"

echo "Run \`git push --follow-tags origin $CURRENT_VERSION\`"
