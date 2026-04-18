import * as classService from "../services/classService.js";

export const getClasses = async (req, res, next) => {
  try {
    const classes = await classService.getAll(req.query);
    res.json(classes);
  } catch (error) {
    next(error);
  }
};

export const getClassById = async (req, res, next) => {
  try {
    const cls = await classService.getById(req.params.id);
    res.json(cls);
  } catch (error) {
    next(error);
  }
};

export const createClass = async (req, res, next) => {
  try {
    const cls = await classService.create(req.body);
    res.status(201).json(cls);
  } catch (error) {
    next(error);
  }
};

export const updateClass = async (req, res, next) => {
  try {
    const cls = await classService.update(req.params.id, req.body);
    res.json(cls);
  } catch (error) {
    next(error);
  }
};

export const deleteClass = async (req, res, next) => {
  try {
    const result = await classService.remove(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
