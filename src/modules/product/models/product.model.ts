export const ProductModelTable = `
    CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    category_id INT NOT NULL REFERENCES categories(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);
`