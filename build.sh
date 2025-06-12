#!/bin/bash
echo "Building Next.js app..."
npx next build

echo "Converting for Cloudflare Pages..."
npx @cloudflare/next-on-pages

echo "Build complete!" 