import express, { Request, Response, NextFunction } from 'express';

import { PrismaClient } from '@prisma/client';
export const prisma=new PrismaClient();

const app=express();
app.use(express.json());


//create user
app.post("/users", async (req, res)=>{
    const {name, age, email}=req.body;
    let newUser={};
    try{
        newUser=await prisma.user.create({
            data:{name, age, email}
            
        })
    }catch(err){
        res.json({mess:"user not created", err})
    }
    res.json(newUser)
    
})

//get all users
app.get("/users", async(req:Request, res:Response, next)=>{
    const users=await prisma.user.findMany();
    res.json(users);
})

//get one user
app.get("/user:id", async(req:Request, res:Response, next)=>{
    let id=Number(req.params.id);
    const user=await prisma.user.findUnique({
        where:{id:id}
    })
    res.json(user);
})


//update user
app.put("users/:id", async(req:Request, res:Response, next)=>{
    const {name, email, age}=req.body;
    const updatedUser=await prisma.user.update({
        where:{id:Number(req.params.id)},
        data:{name, email}
    })

    res.json(updatedUser)
})


//delete user
app.delete("/users/:id",async (req:Request, res:Response, next)=>{
    await prisma.user.delete({
        where:{id:Number(req.params.id)}
    })
    res.json({message:"user deleted successfully"});
})




app.listen(3000, ()=>{
    console.log("server running @3000")
});