#!/bin/bash

#script gets run by asset-builder
eval "$(ssh-agent -s)"
ssh-add ./scripts/bit-key
npm run bit
rm package-lock.json
npm i
rm -rf dist/*
npm run watch-static

