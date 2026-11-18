const validateTask = (req, res, next) => {
  const { title } = req.body;
  if (req.method === 'POST' && (!title || !title.trim())) {
    res.status(400);
    return next(new Error('Title is required'));
  }
  if (title && title.trim().length > 100) {
    res.status(400);
    return next(new Error('Title cannot exceed 100 characters'));
  }
  if (req.body.description && req.body.description.length > 500) {
    res.status(400);
    return next(new Error('Description cannot exceed 500 characters'));
  }
  next();
};

module.exports = { validateTask };
