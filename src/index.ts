import express from "express";
import mongo from "./loaders/mongoose";
import TransactionService from "./services/transcations.service";
import UserRepo from "./repositories/users.repository";
import WalletRepo from "./repositories/wallets.repository";

const app = express();
const db = (async () => await mongo())();

app.use(express.json());
app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.post("/users", async (req, res) => {
  const payload = { name: req.body.name };
  const result = await UserRepo.saveUser(payload);
  return res.send(result);
});

app.post("/wallets", async (req, res) => {
  const payload = { owner: req.body.owner, balance: req.body.balance };
  const result = await WalletRepo.save(payload);
  return res.send(result);
});

app.post("/transactions", async (req, res) => {
  const result = await TransactionService.createTranscation(
    req.body.from,
    req.body.to,
    req.body.amount
  );
  return res.send(result);
});

app.listen(3000, () => {
  console.log("Server listening on port: 3000");
});
