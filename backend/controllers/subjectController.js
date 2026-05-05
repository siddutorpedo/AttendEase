import * as subjectService from "../services/subjectService.js";

export const getSubjects = async (req, res, next) => {
  try {
    const subjects = await subjectService.getAll(req.query);
    res.json({ success: true, data: subjects });
  } catch (error) {
    next(error);
  }
};

export const getSubjectsByClass = async (req, res, next) => {
  try {
    const subjects = await subjectService.getByClass(req.params.classId);
    res.json({ success: true, data: subjects });
  } catch (error) {
    next(error);
  }
};

export const createSubject = async (req, res, next) => {
  try {
    const subject = await subjectService.create(req.body);
    res.status(201).json({ success: true, data: subject });
  } catch (error) {
    next(error);
  }
};

export const updateSubject = async (req, res, next) => {
  try {
    const subject = await subjectService.update(req.params.id, req.body);
    res.json({ success: true, data: subject });
  } catch (error) {
    next(error);
  }
};

export const deleteSubject = async (req, res, next) => {
  try {
    const result = await subjectService.remove(req.params.id);
    res.json({ success: true, message: result.message });
  } catch (error) {
    next(error);
  }
};
