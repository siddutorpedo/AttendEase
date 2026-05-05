import * as classService from "../services/classService.js";

export const getClasses = async (req, res, next) => {
  try {
    const classes = await classService.getAll(req.query);
    res.json({ success: true, data: classes });
  } catch (error) {
    next(error);
  }
};

export const getClassById = async (req, res, next) => {
  try {
    const cls = await classService.getById(req.params.id);
    res.json({ success: true, data: cls });
  } catch (error) {
    next(error);
  }
};

export const createClass = async (req, res, next) => {
  try {
    const cls = await classService.create(req.body);
    res.status(201).json({ success: true, data: cls });
  } catch (error) {
    next(error);
  }
};

export const updateClass = async (req, res, next) => {
  try {
    const cls = await classService.update(req.params.id, req.body);
    res.json({ success: true, data: cls });
  } catch (error) {
    next(error);
  }
};

export const deleteClass = async (req, res, next) => {
  try {
    const result = await classService.remove(req.params.id);
    res.json({ success: true, message: result.message });
  } catch (error) {
    next(error);
  }
};
