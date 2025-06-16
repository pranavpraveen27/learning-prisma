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
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
//create user
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, age, email } = req.body;
    let newUser = {};
    try {
        newUser = yield exports.prisma.user.create({
            data: { name, age, email }
        });
    }
    catch (err) {
        res.json({ mess: "user not created", err });
    }
    res.json(newUser);
}));
//get all users
app.get("/users", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield exports.prisma.user.findMany();
    res.json(users);
}));
//get one user
app.get("/user:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = Number(req.params.id);
    const user = yield exports.prisma.user.findUnique({
        where: { id: id }
    });
    res.json(user);
}));
//update user
app.put("users/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, age } = req.body;
    const updatedUser = yield exports.prisma.user.update({
        where: { id: Number(req.params.id) },
        data: { name, email }
    });
    res.json(updatedUser);
}));
//delete user
app.delete("/users/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.prisma.user.delete({
        where: { id: Number(req.params.id) }
    });
    res.json({ message: "user deleted successfully" });
}));
app.listen(3000, () => {
    console.log("server running @3000");
});
