FROM php:8.2-fpm

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    unzip \
    libpq-dev \
    libonig-dev \
    libssl-dev \
    libxml2-dev \
    libcurl4-openssl-dev \
    libicu-dev \
    libzip-dev \
    libsqlite3-dev \
    procps \
    && docker-php-ext-install -j$(nproc) \
    pdo_mysql \
    pdo_pgsql \
    pgsql \
    pdo_sqlite \
    opcache \
    intl \
    zip \
    pcntl \
    bcmath \
    soap \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apt-get autoremove -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www

# Copy application code. If using only docker-compose volumes for development,
# this line can be commented out. It's good for building standalone images.
COPY . /var/www

# Make entrypoint script executable
COPY ./docker/entrypoint.sh /usr/local/bin/docker-php-entrypoint-laravel
RUN chmod +x /usr/local/bin/docker-php-entrypoint-laravel

# Install Composer dependencies and set permissions for Laravel
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-progress --prefer-dist \
    && chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# PHP-FPM Healthcheck
RUN curl -o /usr/local/bin/php-fpm-healthcheck \
    https://raw.githubusercontent.com/renatomefi/php-fpm-healthcheck/master/php-fpm-healthcheck \
    && chmod +x /usr/local/bin/php-fpm-healthcheck

# Set permissions for the rest of the application files
RUN chown -R www-data:www-data /var/www

ENTRYPOINT ["docker-php-entrypoint-laravel"]
CMD ["php-fpm"]