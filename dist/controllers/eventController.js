"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEvents = void 0;
const db_1 = __importDefault(require("../db/db"));
const getAllEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield db_1.default.query("SELECT * FROM event_tbl");
        res.send(results.rows);
    }
    catch (err) {
        next(err);
    }
});
exports.getAllEvents = getAllEvents;
// export const addDummyData:RequestHandler = async (req, res) => {
//     try {
//         const dummyData = [
//             { id: uuidv4(), eventName: "Event 1", startDate: "2024-02-21", endDate: "2024-02-22", time: "09:00 - 10:00 AM", location: "Location 1", status: "Upcoming", banner: "https://a0.muscache.com/im/pictures/miso/Hosting-48034760/original/a81fc54e-89d1-4ae3-98e7-f8afd487e641.jpeg" },
//             { id: uuidv4(), eventName: "Event 2", startDate: "2024-02-23", endDate: "2024-02-24",time: "00:00 - 2:00 PM", location: "Location 2", status: "Done", banner: "https://a0.muscache.com/im/pictures/586d5d79-43dd-4434-a5c1-eb4e63bfa095.jpg" },
//             { id: uuidv4(), eventName: "Event 3", startDate: "2024-02-25", endDate: "2024-02-26", time: "00:00 - 4:30 PM" , location: "Location 3", status: "Upcoming", banner: "https://a0.muscache.com/im/pictures/miso/Hosting-48034760/original/64677ca4-5000-4cff-9a06-7aa56fc0a557.jpeg" },
//             { id: uuidv4(), eventName: "Event 4", startDate: "2024-02-27", endDate: "2024-02-28",  time: "00:00 - 4:30 PM" , location: "Location 4", status: "Done", banner: "https://a0.muscache.com/im/pictures/miso/Hosting-48034760/original/4dc3c2f6-5e87-4046-bc53-2e1f7d087fef.jpeg" },
//             { id: uuidv4(), eventName: "Event 5", startDate: "2024-03-01", endDate: "2024-03-02",  time: "00:00 - 4:30 PM" , location: "Location 5", status: "Upcoming", banner: "https://a0.muscache.com/im/pictures/miso/Hosting-48034760/original/9df9d6c6-362d-4092-833e-a81554e083e2.jpeg" },
//         ];
//         const insertDummyDataQuery = `
//             INSERT INTO event_tbl (id, event_name, event_start_date, event_end_date, event_time, event_location, event_status, event_banner)
//             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
//         `;
//         // Loop through dummy data and insert into the table
//         for (const data of dummyData) {
//             await pool.query(insertDummyDataQuery, [data.id, data.eventName, data.startDate, data.endDate, data.time, data.location, data.status, data.banner]);
//         }
//         res.status(201).send("Dummy data added successfully");
//     } catch (err) {
//         console.error(err);
//         res.status(500).send(err);
//     }
// };
