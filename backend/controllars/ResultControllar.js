import Result from "../models/ResultModel.js";

export const createResult = async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getAllResults = async (req, res) => {
  try {
    const results = await Result.find().populate("student").populate("class");
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResultById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Result.findById(id)
      .populate("student")
      .populate("class");
    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResultByStudentId = async (req, res) => {
  const { studentId } = req.params;

  try {
    const result = await Result.find({ student: studentId })
      .populate("student")
      .populate("class");
    if (!result) {
      return res
        .status(404)
        .json({ message: "Result not found for this student" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteResult = async (req, res) => {
  try {
    const id = req.params.id;
    await Result.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(404).send(error);
  }
};
