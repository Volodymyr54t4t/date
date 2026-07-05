require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post("/send", async (req, res) => {

    try{

        const {

            date,
            time,
            place,
            message

        } = req.body;

        const text = `
💖 НОВА ВІДПОВІДЬ 💖

📅 Дата:
${date}

🕒 Час:
${time}

📍 Місце:
${place}

💌 Побажання:
${message || "немає"}

        `;

        await axios.post(

            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,

            {

                chat_id: CHAT_ID,

                text,

                parse_mode:"HTML"

            }

        );

        res.json({

            success:true

        });

    }catch(err){

        console.log(err.response?.data || err.message);

        res.json({

            success:false

        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{

    console.log("Server started on port "+PORT);

});