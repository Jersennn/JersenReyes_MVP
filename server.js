import express from "express";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

//connect to database
const sql = postgres(process.env.DATABASE_URL);
const app = express();
app.use(express.json());
app.use(express.static("./client"));

//using a get requst to get all
app.get("/saiyan", (req, res, next) => {
    sql`SELECT * FROM saiyan ORDER BY power_level DESC`.then((result) => {
        res.json(result);
    }).catch(next);
});

//using a get request to get a specific person
app.get("/saiyan/:id", (req, res, next) => {
    const id = req.params.id;
    sql`SELECT * FROM saiyan WHERE id = ${id}`.then((result) => {
        if (result.length === 0) {
            res.set("Content-type", "text/plain");
            res.status(404);
            res.send("Not Found");
        } else {
            res.json(result[0]);
        }
    }).catch(next)
});

//using a post request to put new information
app.post("/saiyan", (req, res) => {
    const user = req.body;
    const { username, power_level } = user;
    const reqfields = ["username", "power_level"];
    const error = [];
    for (let field of reqfields) {
        if (user[field] === undefined) {
            error.push(`Missing ${field} value`);
        }
    }
    if (power_level && typeof power_level !== "number") {
        error.push("power level must be a number");
    }
    if (error.length > 0) {
        res.status(422);
        res.send(error.join(" "));
    } else {
        sql`INSERT INTO saiyan (username, power_level)VALUES(${username}, ${power_level}) RETURNING *`.then((result) => {
            res.json(result[0]);
        })
    }
})

// using a patch request
app.patch("/saiyan/:id", (req, res) => {
    const id = req.params.id;
    const user = req.body;
    const { username, power_level } = id;
    sql`
    UPDATE saiyan
    SET ${sql(req.body)}
    WHERE id = ${id} RETURNING *
    `.then((result) => {
        res.send(result[0]);
    });
});

//using a delete request
app.delete("/saiyan/:id", (req, res) => {
    const { id } = req.params;
    sql`DELETE FROM saiyan WHERE id = ${id} RETURNING *`.then((result) => {
        res.send(result[0]);
    });
});


//handle errors
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Internal server error");
});

app.listen(3000);
console.log("listening on port 3000");