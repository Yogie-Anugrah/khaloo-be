import { RequestHandler } from "express";
import pool from "../db/db";

// Create a partnership
export const createPartnership: RequestHandler = async (req, res) => {
  try {
    const {
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
    } = req.body;

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

    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating partnership:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Read all partnerships
export const getAllPartnerships: RequestHandler = async (req, res) => {
  try {
    const query = `
      SELECT * FROM ResellerAffiliate;
    `;

    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting partnerships:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Read a partnership by ID
export const getPartnershipById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT * FROM ResellerAffiliate WHERE resellerAffiliateID = $1;
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Partnership not found" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error getting partnership:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a partnership by ID
export const updatePartnershipById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const {
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
    } = req.body;

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

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Partnership not found" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error updating partnership:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a partnership by ID
export const deletePartnershipById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      DELETE FROM ResellerAffiliate WHERE resellerAffiliateID = $1;
    `;

    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      res.status(404).json({ message: "Partnership not found" });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    console.error("Error deleting partnership:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
