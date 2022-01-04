const { findById } = require('./hubs-model');
const yup = require('yup');

const checkHubId = async (req, res, next) => {
  // req.params.id
  // either next or 404
  findById(req.params.id)
    .then(hub => {
      if (hub) {
        req.hub = hub;
        next();
      } else {
        next ({ status: 404, message: `hub ${req.params.id} not found ...`});
      }
    })
    .catch(next);
};

const checkHubPayload = (req, res, next) => {
  if (req.body.name && req.body.name.trim()) {
    req.body.name = req.body.name.trim();
    next();
  } else {
    next({
      status: 422, message: `hubs require a valid name ...`
    });
  }
};

const messageSchema = yup.object({
  sender: yup.string().trim().min(3).required(),
  text: yup.string().trim().min(3).required(),
});

const checkMessagePayload = async (req, res, next) => {
  try {
    const validated = await messageSchema.validate(req.body);
    req.body = validated;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkHubId,
  checkHubPayload,
  checkMessagePayload
};