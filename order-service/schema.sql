CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    restaurant_id VARCHAR(50),
    status VARCHAR(50),
    total NUMERIC,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);