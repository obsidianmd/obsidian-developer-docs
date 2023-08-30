#!/bin/bash

# 0. Install dependencies
echo "Installing dependencies..."
pnpm install

# 1. Run api-extractor
# echo "Moving to obsidian-api folder..."
# cd obsidian-api || exit # git submodule folder w/ all obsidian APIs types.
echo "Running api-extractor..."
pnpx @microsoft/api-extractor run --local --verbose

# Remove everything under ../en/Reference/TypeScript API before doing step 2
# clear
# echo "current directory : $(pwd)"
echo "Removing old files in ../en/Reference/TypeScript API..."
rm -rf ../en/Reference/TypeScript\ API/*
mkdir -p ../en/Reference/TypeScript\ API

# 2. Run api-documenter and ensure it finishes before proceeding
# The absolute path is not a bug; this is Silver's fork of api-documenter
# Ths fork is available at here if you want to bulid your own: https://github.com/ericaxu/rushstack-obsidian
# echo "Installing the forked api-documenter..."
# Download the binary from the releases in the forked repo
# gh release download -R LBF38/rushstack-obsidian -p "*"
# The api-documenter binary should now be in the current directory
echo "Running @lbf38/api-documenter..."
pnpx @lbf38/api-documenter markdown --output ../en/Reference/TypeScript\ API

# 3. Run post-process.js with Node.js
# echo "Moving to config folder..."
# cd ..
echo "Running post-process.js..."
node post-process.js
