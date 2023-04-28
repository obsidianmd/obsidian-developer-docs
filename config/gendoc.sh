#!/bin/bash

# 1. Run api-extractor
api-extractor run --local --verbose

# Remove everything under ../en/Reference/TypeScript API before doing step 2
rm -rf ../en/Reference/TypeScript\ API/*
mkdir -p ../en/Reference/TypeScript\ API

# 2. Run api-documenter and ensure it finishes before proceeding
api-documenter markdown --output ../en/Reference/TypeScript\ API && \

# 3. Run post-process.js with Node.js
node post-process.js
