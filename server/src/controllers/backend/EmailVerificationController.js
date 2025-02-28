const { User } = require('../../models');
const Logs = require('../../utils/Logs');
const Response = require('../../utils/Response');
const Helper = require('../../utils/Helper');
const { validationResult, param, body } = require('express-validator');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

module.exports = {
    /**
      * Verify a single email address.
      * @param {*} req 
      * @param {*} res 
      */
    verifySingleEmail: async (req, res) => {
        try {
            await body('email').isEmail().withMessage('Invalid email address').run(req);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(Response.error("Validation failed.", errors.array()));
            }

            const { email } = req.body;

            const response = await axios.get(`https://api.bouncify.io/v1/verify?apikey=${process.env.BOUNCIFY_API_KEY}&email=${email}`);

            return res.json(Response.success("Email verification result", response.data));

        } catch (err) {
            Logs.error(err);
            res.status(500).json(Response.error('An error occurred while verifying the email.', err.message));
        }
    },

    verifyBulkEmail: async (req, res) => {

        try {
            if (!req.file) {
                return res.status(400).json(Response.error("No file uploaded."));
            }

            const formData = new FormData();
            formData.append('local_file', fs.createReadStream(req.file.path), req.file.originalname);

            const params = {
                apikey: process.env.BOUNCIFY_API_KEY,
                auto_verify: true // Or false, as needed
            };

            const response = await axios.post('https://api.bouncify.io/v1/bulk', formData, {
                headers: {
                    ...formData.getHeaders(),
                },
                params: params,
            });

            fs.unlinkSync(req.file.path);

            return res.json(Response.success("Bulk email verification initiated", response.data));

        } catch (error) {
            console.error("Bouncify API Error:", error.response ? error.response.data : error.message);
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }

            const errorMessage = error.response && error.response.data && error.response.data.message ?
                error.response.data.message :
                (error.message || "Bouncify API Error");

            res.status(500).json(Response.error('An error occurred while verifying bulk emails.', errorMessage));
        }


    },

    checkJobStatus: async (req, res) => {
        try {
            // const jobId = req.params.job_id; 
            const { jobId } = req.body;
            console.log(jobId);
            const response = await axios.get(`https://api.bouncify.io/v1/bulk/${jobId}?apikey=${process.env.BOUNCIFY_API_KEY}`);

            return res.json(Response.success("Job status retrieved", response.data));
        } catch (error) {
            console.error(error);
            if (error.response) {
                return res.status(error.response.status).json(Response.error('Error retrieving job status', error.response.data));
            }
            res.status(500).json(Response.error('An unexpected error occurred while checking job status.', error.message));
        }
    },



    credits: async (req, res) => {
        try {
            const response = await axios.get(`https://api.bouncify.io/v1/info?apikey=${process.env.BOUNCIFY_API_KEY}`, {
                headers: {
                },
            });
            console.log(response.data)
            console.log(req.user.id)

            const credits = response.data.credits_info; // Extract the credits from the response.

            if (credits === undefined) {
                console.error("Credits not found in Bouncify response:", response.data);
                return res.status(500).json({ error: 'Could not retrieve credit information.  Check the Bouncify API response.' });
            }

            const credits_allotted = 100;
            const credits_consumed = credits_allotted - credits.credits_remaining;
            const credits_remaining = credits.credits_remaining;

            return res.json(Response.success("Email credits retrieved", { credits_allotted, credits_consumed, credits_remaining }));

        } catch (error) {
            console.error('Error fetching email credits:', error);

            if (error.response) {
                res.status(error.response.status).json({
                    status: 'error',
                    message: error.response.data.message || 'Error retrieving email credits',
                    data: error.response.data
                });
            } else if (error.request) {
                res.status(500).json({ status: 'error', message: 'Network error occurred' });
            } else {
                res.status(500).json({ status: 'error', message: 'An unexpected error occurred' });
            }
        }
    },

     startEmailVerification: async (req, res) => { 

        const url = `https://api.bouncify.io/v1/bulk/${req.body.jobId}?apikey=${process.env.BOUNCIFY_API_KEY}`;
        const headers = {
            'Content-Type': 'application/json'
        };
        const data = { "action": "start" };

        try {
            const response = await axios.patch(url, data, { headers: headers });
            return response.data;
        } catch (error) {
            console.error("Bouncify Start Verification Error:", error.response ? error.response.data : error.message); // Consistent axios error 
            throw error; 
        }
    },

}