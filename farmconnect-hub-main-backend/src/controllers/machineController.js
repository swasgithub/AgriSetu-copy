import Machine from "../models/machine.js";

// CREATE MACHINE (Equipment Owner)
export const createMachine = async (req, res) => {
  try {
    const machine = await Machine.create({
      ...req.body,
      owner: req.user._id, 
    });

    res.status(201).json(machine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL MACHINES
export const getAllMachines = async (req, res) => {
  try {
    const machines = await Machine.find().populate("owner", "name email");
    res.json(machines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY MACHINES (Owner)
export const getMyMachines = async (req, res) => {
  try {
    const machines = await Machine.find({ owner: req.user._id });
    res.json(machines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE MACHINE
export const getMachineById = async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id).populate("owner", "name");

    if (!machine) return res.status(404).json({ message: "Machine not found" });

    res.json(machine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMachine = async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);

    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    // Ownership check
    if (machine.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // Update after check
    Object.assign(machine, req.body);
    await machine.save();

    res.json(machine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMachine = async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);

    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    //Ownership check
    if (machine.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await machine.deleteOne();

    res.json({ message: "Machine deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
