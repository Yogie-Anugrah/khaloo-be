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
exports.getLocation = exports.getAllLocations = void 0;
const db_1 = __importDefault(require("../db/db"));
// Fetch all locations without any projection
const getAllLocations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield db_1.default.connect();
        const results = yield client.query("SELECT * FROM location_tbl");
        res.send(results.rows);
        client.release();
    }
    catch (err) {
        next(err);
    }
});
exports.getAllLocations = getAllLocations;
// Get all locations with projection needed on find-us-page ordered by store_name and only if status = true (active)
const getLocation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield db_1.default.connect();
        // Validasi: Pastikan status toko adalah true
        const query = `
            SELECT 
                store_name, 
                store_address, 
                store_image, 
                store_maps_url 
            FROM 
                location_tbl 
            WHERE 
                store_status = true 
            ORDER BY 
                store_name
        `;
        const result = yield client.query(query);
        if (result.rows.length === 0) {
            res.send([]);
        }
        else {
            const resultFormatting = result.rows.map((item) => ({
                type: "location",
                name: item.store_name,
                address: item.store_address,
                imageUrl: item.store_image,
                mapsUrl: item.store_maps_url
            }));
            res.send(resultFormatting);
        }
        client.release();
    }
    catch (err) {
        next(err);
    }
});
exports.getLocation = getLocation;
