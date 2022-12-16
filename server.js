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
app.get("/users", (req, res, next) => {
    sql`SELECT * FROM users`.then((result) => {
        res.json(result);
    }).catch(next);
});

//using a get request to get a specific person
app.get("/users/:id", (req, res, next) => {
    const id = req.params.id;
    sql`SELECT * FROM users WHERE id = ${id}`.then((result) => {
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
app.post("/users", (req, res) => {
    const user = req.body
    const { username, weight } = user;
    const reqfields = ["username", "weight"];
    const error = [];
    for (let field of reqfields) {
        if (user[field] === undefined) {
            error.push(`Missing ${field} value`);
        }
    }
    if (weight && typeof weight !== "number") {
        error.push("Weight must be a number");
    }
    if (error.length > 0) {
        res.status(422);
        res.send(error.join(" "));
    } else {
        sql`INSERT INTO users (username, weight)VALUES(${username}, ${weight}) RETURNING *`.then((result) => {
            res.json(result[0]);
        })
    }
})

// using a patch request
app.patch("/users/:id", (req, res) => {
    const id = req.params.id;
    const user = req.body;
    const { username, weight } = id;
    sql`
    UPDATE users
    SET ${sql(req.body)}
    WHERE id = ${id} RETURNING *
    `.then((result) => {
        res.send(result[0]);
    });
});

//using a delete request
app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    sql`DELETE FROM users WHERE id = ${id} RETURNING *`.then((result) => {
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