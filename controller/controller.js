import fs from "fs";
import { dirname, join } from "path";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";

import {uploadUser}  from "../middleware/multer.js";

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);
const dataFile = join(__dirname, "../models/data.json");

const readData = () => {
  const data = fs.readFileSync(dataFile, "utf8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};


//get all users
export const getAllUser = (req, res, next) => {
  try {
    const person = readData();

    if (person && person.length > 0) {
      res.status(200).json({ message: "success", all: person });
    } else {
      res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    next(new Error("Something went wrong"));
  }
};


//post user
export const postUser = (req, res,next) => {
  console.log(req.files);
  
  try {
    const person = readData();
  const newPerson = { id: uuidv4(), ...req.body,uploadUser };
  person.push(newPerson);
  writeData(person);
  res.status(200).json(newPerson);

 

  } catch (error) {
    next(new Error("Something went wrong"));
    res.status(500).json({message:"Something went wrong"})
  }

};


//only get one user
export const getOneUser = (req, res,next) => {
 try {
  const person = readData();
  const userId = req.params.id;
  const newPerson = person.find((user) => user.id === req.params.id);
 if(newPerson){
  res.status(200).json(newPerson);
  
 }else{
  res .status(400).json({message:"User not found "})
}
} catch (error) {
  next(new Error("Something went wrong"));
  res.status(500).json({message:"Something went wrong"})
}
};


//only delete one user
export const deleteOneUser =(req,res,next)=>{
  try {
    const person=readData();
    
    const index = parseInt(req.params.index, 10); 
    
    
    if(index !== -1){
    person.splice(index,1)
    writeData(person);
    res.status(200).json({message:"User deleted successfully",all: person})
    }else{
      res .status(400).json({message:"User not found "})
    }
    } catch (error) {
      next(new Error("Something went wrong"));
      res.status(500).json({message:"Something went wrong"})
    }
};


//update the data
export const update=(req,res,next)=>{
    try {
      const person=readData();
    const userId=req.params.id;
    const index=person.findIndex((user)=>user.id ===userId)
    if(index !== -1){
        person[index]={...person[index], ...req.body}
        writeData(person);
        res.status(200).json({message:"use updated" ,all: person} )
    }else{
      res .status(400).json({message:"User not found "})
    }
    } catch (error) {
      next(new Error("Something went wrong"));
      res.status(500).json({message:"Something went wrong"})
    }

} 