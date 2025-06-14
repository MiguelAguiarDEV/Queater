#!/bin/sh
set -e

echo "Running Laravel entrypoint script..."

echo "Clearing configuration cache..."
php artisan config:clear

echo "Running database migrations..."
php artisan migrate --force --no-interaction

echo "Building frontend assets..."
npm run build

# It's a good practice to ensure the .env file exists
if [ ! -f ".env" ]; then
  echo "[ERROR]: .env file not found. Please ensure it is present."
  exit 1
fi

# Verifica si APP_KEY está configurada en el archivo .env
if ! grep -q '^APP_KEY=' .env || ! grep -q '^APP_KEY=[^[:space:]]' .env; then
  echo "[WARNING]: APP_KEY no está configurada o está vacía en el archivo .env."
  echo "Generando nueva APP_KEY..."
  php artisan key:generate --force
else
  echo "[INFO]: APP_KEY ya está configurada en el archivo .env."
fi

# Wait for the database to be ready (optional, uncomment and adapt if you have a separate DB container)
# echo "Waiting for database..."
# while ! nc -z $DB_HOST $DB_PORT; do
#   sleep 0.1 # wait for 1/10 of the second before check again
# done
# echo "Database is up!"


echo "Caching configuration..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Caching views..."
php artisan view:cache


echo "Ensuring storage subdirectories exist..."
mkdir -p /var/www/storage/app/public
mkdir -p /var/www/storage/framework/cache/data
mkdir -p /var/www/storage/framework/sessions
mkdir -p /var/www/storage/framework/testing/disks
mkdir -p /var/www/storage/framework/views
mkdir -p /var/www/storage/logs

echo "Setting broad permissions for /var/www for testing purposes..."
chown -R www-data:www-data /var/www
chmod -R 777 /var/www

echo "Starting Reverb WebSocket server..."
php artisan reverb:start &

echo "Laravel entrypoint script finished. Starting PHP-FPM..."
exec "$@"
