FROM ruby:3.3-slim

# Install Node 18 and PostgreSQL client libraries
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    libyaml-dev \
    pkg-config \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install gems
COPY backend/Gemfile backend/Gemfile.lock ./
RUN gem install bundler && bundle install

# Copy application code
COPY backend .

ENTRYPOINT ["bin/docker-entrypoint"]
CMD ["./bin/rails", "server", "-b", "0.0.0.0"]