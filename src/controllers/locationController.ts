import { RequestHandler } from "express";
import pool from "../db/db";


export const getAllLocations:RequestHandler = async (req, res,next) => {
    try {
        const results = await pool.query("SELECT * FROM location_tbl");
        res.send(results.rows);
    } catch (err) {
        next(err);
    }
};

// export const addDummyLocations:RequestHandler = async (req, res) => {
//     try {
//         const dummyLocations = [
//             {
//                 id: uuidv4(),
//                 store_image: "https://a0.muscache.com/im/pictures/miso/Hosting-48034760/original/a81fc54e-89d1-4ae3-98e7-f8afd487e641.jpeg",
//                 store_name: "Store 1",
//                 store_address: "Address 1",
//                 store_province: "Province 1",
//                 store_city: "City 1",
//                 store_maps_url: "maps_url_1",
//                 store_status: true,
//                 date_added: "2024-02-21",
//                 time_added: "10:00 AM",
//                 store_long: "123.456",
//                 store_lat: "78.910",
//             },
//             {
//                 id: uuidv4(),
//                 store_image: "https://a0.muscache.com/im/pictures/586d5d79-43dd-4434-a5c1-eb4e63bfa095.jpg",
//                 store_name: "Store 2",
//                 store_address: "Address 2",
//                 store_province: "Province 2",
//                 store_city: "City 2",
//                 store_maps_url: "maps_url_2",
//                 store_status: false,
//                 date_added: "2024-02-22",
//                 time_added: "11:30 AM",
//                 store_long: "123.789",
//                 store_lat: "78.123",
//             },
//             {
//                 id: uuidv4(),
//                 store_image: "https://a0.muscache.com/im/pictures/miso/Hosting-48034760/original/a81fc54e-89d1-4ae3-98e7-f8afd487e641.jpeg",
//                 store_name: "Store 3",
//                 store_address: "Address 3",
//                 store_province: "Province 3",
//                 store_city: "City 3",
//                 store_maps_url: "maps_url_3",
//                 store_status: true,
//                 date_added: "2024-02-23",
//                 time_added: "01:00 PM",
//                 store_long: "123.654",
//                 store_lat: "78.456",
//             },
//             {
//                 id: uuidv4(),
//                 store_image: "https://a0.muscache.com/im/pictures/586d5d79-43dd-4434-a5c1-eb4e63bfa095.jpg",
//                 store_name: "Store 4",
//                 store_address: "Address 4",
//                 store_province: "Province 4",
//                 store_city: "City 4",
//                 store_maps_url: "maps_url_4",
//                 store_status: false,
//                 date_added: "2024-02-24",
//                 time_added: "02:30 PM",
//                 store_long: "123.987",
//                 store_lat: "78.789",
//             },
//             {
//                 id: uuidv4(),
//                 store_image: "https://a0.muscache.com/im/pictures/miso/Hosting-48034760/original/a81fc54e-89d1-4ae3-98e7-f8afd487e641.jpeg",
//                 store_name: "Store 5",
//                 store_address: "Address 5",
//                 store_province: "Province 5",
//                 store_city: "City 5",
//                 store_maps_url: "maps_url_5",
//                 store_status: true,
//                 date_added: "2024-02-25",
//                 time_added: "03:45 PM",
//                 store_long: "123.321",
//                 store_lat: "78.654",
//             },
            
//             // Add three more dummy locations here
//         ];

//         const insertDummyLocationsQuery = `
//             INSERT INTO location_tbl (
//                 id, store_image, store_name, store_address, store_province,
//                 store_city, store_maps_url, store_status, date_added,
//                 time_added, store_long, store_lat
//             )
//             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
//         `;

//         // Loop through dummy locations and insert into the table
//         for (const location of dummyLocations) {
//             await pool.query(insertDummyLocationsQuery, [
//                 location.id,
//                 location.store_image,
//                 location.store_name,
//                 location.store_address,
//                 location.store_province,
//                 location.store_city,
//                 location.store_maps_url,
//                 location.store_status,
//                 location.date_added,
//                 location.time_added,
//                 location.store_long,
//                 location.store_lat,
//             ]);
//         }

//         res.status(201).send("Dummy locations added successfully");
//     } catch (err) {
//         console.error(err);
//         res.status(500).send(err);
//     }
// };

// export const createLocationSchema:RequestHandler =  async (req, res) => {
//     try {
//         const dropLocationTableQuery = `
//             DROP TABLE IF EXISTS location_tbl
//         `;
//         await pool.query(dropLocationTableQuery);

//         const createLocationTableQuery = `
//             CREATE TABLE IF NOT EXISTS location_tbl (
//                 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//                 store_image TEXT,
//                 store_name TEXT,
//                 store_address TEXT,
//                 store_province TEXT,
//                 store_city TEXT,
//                 store_maps_url TEXT,
//                 store_status BOOLEAN,
//                 date_added DATE DEFAULT CURRENT_DATE,
//                 time_added TIME DEFAULT CURRENT_TIME,
//                 store_long TEXT,
//                 store_lat TEXT
//             )
//         `;

//         await pool.query(createLocationTableQuery);

//         res.status(200).send("Table created successfully: location_tbl");
//     } catch (err) {
//         console.error(err);
//         res.status(500).send(err);
//     }
// };