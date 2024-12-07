// Ici on utilise l'ancien JS (sans ES6)
// const express = require("express");
// const path = require("path");

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const app = express(); 
const port = 3000; 

app.listen(port, ()=> {console.log(`Le serveur tourne sur le port ${port}`);
});

const CheckHours = (req, res, next) => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    const isWorkingDay = day >= 1 && day <= 5;
    const isWorkingHour = hour >= 9 && hour <= 17;

    if(isWorkingDay && isWorkingHour){
        next();
    } else { 
        res.sendFile(path.join(__dirname, "public", "closed.html"));
    }
};


app.use(express.static(path.join(__dirname, "public")));

app.use(CheckHours)

app.get("/", (req, res)=> {
    res.sendFile(path.join(__dirname, "public", "index.html"))
});

app.get("/services", (req, res)=> {
    res.sendFile(path.join(__dirname, "public", "services.html"))
});

app.get("/contact", (req, res)=> {
    res.sendFile(path.join(__dirname, "public", "contact.html"))
});

