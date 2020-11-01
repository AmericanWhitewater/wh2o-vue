#!/bin/bash
npm config set registry https://npm.americanwhitewater.org
npm i
rm -rf dist/*
npm run serve
