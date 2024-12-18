import Total from '../middlewares/total.middleware.js';
import Table from '../models/table.model.js'

export const createTable = async (req, res) => {
  
    try {
        const { userId, meals} = req.body;
        const total = await Total(meals)
        
        console.log(meals)

        
        const newTable = await Table.create({
          userId,
          meals,
          guests:  [],
          total
        });
        
    
        res.status(201).json({
          success: true,
          msg: "Table created successfully!",
          data: newTable,

        });
      } catch (error) {
        console.log("error", error);
        res.status(500).json({
          success: false,
          msg: "Failed to create table.",
          error: error.message || error,
        });
      }
    };

export const getAllTables = async (req, res) => {
     
    
      try {
        const tables = await Table.find()
          .populate({
            path: 'meals.id'
          })

         console.log(tables)
    
        res.status(200).json({
          success: true,
          msg: "Get all tables successfully.",
          data: tables
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          msg: "Failed to get all tables.",
          error: error.message || error,
        });
      }
    };    

export const getTableByUserId = async (req, res) => {
      try {
        const { id } = req.params;
        console.log(id)
    
        const table = await Table.findOne({ userId: id })
          .populate({
            path: 'userId',
            select:"userName"
          })
          .populate({
            path: 'meals.id'
          })
    
        if (!table) throw "Not find table!"
        
    
        res.status(200).json({
          success: true,
          msg: "Get table successfully.",
          data: table
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          msg: "Failed to get table.",
          error: error.message || error,
        });
      }
    };

export const editTableByUserId = async (req, res) => {
      try {
        const { id } = req.params;
        const { meals } = req.body;

        console.log("id",id)
        console.log("meas",meals)


        const total = await Total(meals);
    
        const updatedTable = await Table.findOneAndUpdate({ userId: id },{ meals, total },{ new: true }) 
        .populate({
          path: 'meals.id'
        });
    
        if (!updatedTable) throw "Table not found!"
    
        res.status(200).json({
          success: true,
          msg: "Table updated successfully!",
          data: updatedTable
        });
      } catch (error) {
        console.log("error", error);
        res.status(500).json({
          success: false,
          msg: "Failed to update Table.",
          error: error.message || error,
        });
      }
    };    

export const deleteTabelByUserId = async (req, res) => {
      try {
        const { id } = req.params; 


        console.log("Searching for table with userId:", id);

    

    const exist = await Table.find({ userId: id });
    console.log("Existing tables:", exist);

        const TableToDelete = await Table.findOneAndDelete({ userId: id });
    
        console.log(TableToDelete)
        if (!TableToDelete) throw "Table not found!"
    
        res.status(201).json({
          success: true,
          msg: "Table deleted!",
          data: TableToDelete
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          msg: "Failed to delete table.",
          error: error.message || error,
        });
      }
    };    
    