import * as subjectService from "../services/subjectService.js";

export const getSubjects = async (req, res, next) => {
  try {
    const subjects = await subjectService.getAll(req.query);
    res.json(subjects);
  } catch (error) {
    next(error);
  }
};

export const getSubjectsByClass = async (req, res, next) => {
  try {
    const subjects = await subjectService.getByClass(req.params.classId);
    res.json(subjects);
  } catch (error) {
    next(error);
  }
};

export const createSubject = async (req, res, next) => {
  try {
    const subject = await subjectService.create(req.body);
    res.status(201).json(subject);
  } catch (error) {
    next(error);
  }
};

export const updateSubject = async (req, res, next) => {
  try {
    const subject = await subjectService.update(req.params.id, req.body);
    res.json(subject);
  } catch (error) {
    next(error);
  }
};

export const deleteSubject = async (req, res, next) => {
  try {
    const result = await subjectService.remove(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
