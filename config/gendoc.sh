#!/bin/bash

# 1. Run api-extractor
api-extractor run --local --verbose
node pre-process.js

# Remove everything under ../en/Reference/TypeScript API before doing step 2
rm -rf ../en/Reference/TypeScript\ API/*
mkdir -p ../en/Reference/TypeScript\ API

# 2. Run api-documenter and ensure it finishes before proceeding
# The absolute path is not a bug; this is Silver's fork of api-documenter
# Ths fork is available at here if you want to build your own: https://github.com/ericaxu/rushstack-obsidian
D:\\Dropbox\\Projects\\rushstack\\apps\\api-documenter\\bin\\api-documenter markdown --output ../en/Reference/TypeScript\ API && \

# 3. Run post-process.js with Node.js
node post-process.js
