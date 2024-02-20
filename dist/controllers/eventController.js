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
exports.getEvents = exports.getAllEvents = void 0;
const db_1 = __importDefault(require("../db/db"));
// Fetch all events without any projection
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
// Get all events with projection needed on find-us-page ordered by start_date and only if status = upcoming
const getEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield db_1.default.query("SELECT id, event_name, event_start_date, event_end_date, event_time, event_location, event_banner FROM event_tbl WHERE event_status='Upcoming' ORDER BY event_start_date");
        res.send(results.rows);
    }
    catch (err) {
        next(err);
    }
});
exports.getEvents = getEvents;
