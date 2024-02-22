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
exports.deletePartnershipById = exports.updatePartnershipById = exports.getPartnershipById = exports.getAllPartnerships = exports.createPartnership = void 0;
const db_1 = __importDefault(require("../db/db"));
// Create a partnership
const createPartnership = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, provinceID, city, address, instagram, tiktok, facebook, whatsapp, termsAndConditions, role, } = req.body;
        const query = `
      INSERT INTO ResellerAffiliate (
        firstName,
        lastName,
        email,
        provinceID,
        city,
        address,
        instagram,
        tiktok,
        facebook,
        whatsapp,
        termsAndConditions,
        role
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *;
    `;
        const values = [
            firstName,
            lastName,
            email,
            provinceID,
            city,
            address,
            instagram,
            tiktok,
            facebook,
            whatsapp,
            termsAndConditions,
            role,
        ];
        const result = yield db_1.default.query(query, values);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error("Error creating partnership:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createPartnership = createPartnership;
// Read all partnerships
const getAllPartnerships = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
      SELECT * FROM ResellerAffiliate;
    `;
        const result = yield db_1.default.query(query);
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error("Error getting partnerships:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllPartnerships = getAllPartnerships;
// Read a partnership by ID
const getPartnershipById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const query = `
      SELECT * FROM ResellerAffiliate WHERE resellerAffiliateID = $1;
    `;
        const result = yield db_1.default.query(query, [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Partnership not found" });
        }
        else {
            res.status(200).json(result.rows[0]);
        }
    }
    catch (error) {
        console.error("Error getting partnership:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getPartnershipById = getPartnershipById;
// Update a partnership by ID
const updatePartnershipById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, provinceID, city, address, instagram, tiktok, facebook, whatsapp, termsAndConditions, role, } = req.body;
        const query = `
      UPDATE ResellerAffiliate
      SET
        firstName = $1,
        lastName = $2,
        email = $3,
        provinceID = $4,
        city = $5,
        address = $6,
        instagram = $7,
        tiktok = $8,
        facebook = $9,
        whatsapp = $10,
        termsAndConditions = $11,
        role = $12
      WHERE resellerAffiliateID = $13
      RETURNING *;
    `;
        const values = [
            firstName,
            lastName,
            email,
            provinceID,
            city,
            address,
            instagram,
            tiktok,
            facebook,
            whatsapp,
            termsAndConditions,
            role,
            id,
        ];
        const result = yield db_1.default.query(query, values);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Partnership not found" });
        }
        else {
            res.status(200).json(result.rows[0]);
        }
    }
    catch (error) {
        console.error("Error updating partnership:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updatePartnershipById = updatePartnershipById;
// Delete a partnership by ID
const deletePartnershipById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const query = `
      DELETE FROM ResellerAffiliate WHERE resellerAffiliateID = $1;
    `;
        const result = yield db_1.default.query(query, [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: "Partnership not found" });
        }
        else {
            res.status(204).end();
        }
    }
    catch (error) {
        console.error("Error deleting partnership:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deletePartnershipById = deletePartnershipById;
