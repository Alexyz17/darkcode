FROM php:8.4-cli

# System dependencies + PHP extensions
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpq-dev libzip-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_pgsql mbstring zip xml ctype \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer via official script
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# PHP dependencies (--no-scripts because app files aren't present yet)
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# Node dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy all application files
COPY . .

# Build frontend assets
RUN npm run build

EXPOSE 8080

CMD php artisan config:clear \
    && php artisan route:clear \
    && php artisan view:clear \
    && php artisan storage:link 2>/dev/null || true \
    && php artisan migrate --force \
    && php artisan db:seed --class=GameSeeder --force \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan serve --host=0.0.0.0 --port=${PORT:-8080}
