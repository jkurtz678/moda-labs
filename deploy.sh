#!/usr/bin/env sh

set -e

npm run build

cd dist
echo 'labs.modadisplay.art' > CNAME


git init
git add -A
git commit -m "New Deployment"
git push -f git@github.com:jkurtz678/moda-labs.git master:gh-pages
cd -