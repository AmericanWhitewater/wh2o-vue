#!/bin/bash
eval "$(ssh-agent -s)"
ssh-add ./scripts/bit-key
npm run bit
rm package-lock.json
npm i
npm run build -- --watch --no-clean

