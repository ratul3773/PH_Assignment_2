const Vehicle =
    `CREATE TABLE IF NOT EXISTS vehicles (
            id SERIAL PRIMARY KEY,
            vehicle_name VARCHAR(100) NOT NULL,
            type VARCHAR(50) NOT NULL,
            registration_number VARCHAR(50) UNIQUE NOT NULL,
            daily_rent_price INT NOT NULL,
            availability_status VARCHAR(20) DEFAULT 'available'
    )`

export {Vehicle};