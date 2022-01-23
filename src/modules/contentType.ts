import express from 'express';

const contentType : express.Handler = (req, res, next) => {
  try {
    if (req.is('application/json')) express.json(req.body);
    next();
  } catch (err : any) {
    throw { message: err.message, statusCode: 400 };
  }
};

export default contentType;
