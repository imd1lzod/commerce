export const OrderModelTable = `
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total NUMERIC NOT NULL,
    product_id INT REFERENCES products(id),
    quantity INT DEFAULT 1
);

`;
