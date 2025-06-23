#!/bin/sh
set -e
npx prisma migrate dev
npm run build
exec "$@"