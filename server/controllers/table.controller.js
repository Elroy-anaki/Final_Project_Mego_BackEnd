import Table from '../models/table.model.js'

export const createTable = async (req, res) => {
  console.log(req.body)
  try {
  
    const newTable = await Table.create(req.body);

    res.status(201).json({
      success: true,
      msg: "Table created successfully!",
      data: newTable,

    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      msg: error.message || "Failed to create table.",
      error:  error,
    });
  }
};

export const getAllTables = async (req, res) => {
  try {
    const tables = await Table.find()
      .populate({ path: 'meals.meal' })

    console.log(tables)

    res.status(200).json({
      success: true,
      msg: "Get all tables successfully.",
      data: tables
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message || "Failed to get all tables.",
      error: error,
    });
  }
};

export const getTableByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId)

    const table = await Table.findOne({ "user.userId": userId }).populate({ path: 'meals.meal' })
    console.log(table)


    if (!table) throw "Not find table!"


    res.status(200).json({
      success: true,
      msg: "Get table successfully.",
      data: table
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      msg: error.message || "Failed to get table.",
      error:  error,
    });
  }
};

export const editTableById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)

    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    console.log(req.body)
    // return

    const updatedTable = await Table.findById(id);
    if (!updatedTable) throw "Table not found!"
    updatedTable.meals = req.body
    await updatedTable.save();
    console.log("reeeeeeeeeeeeeeeeeeeeeeeeeeendnfldnfnd;gdkgmg;dmgp;es",updatedTable)

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

    const deletedTable = await Table.findByIdAndDelete(id);

    res.status(201).json({
      success: true,
      msg: "Table deleted!",
      data: deletedTable
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to delete table.",
      error: error.message || error,
    });
  }
};
