const {Router} = require(`express`);
const {validateSchema} = require(`../util/validator`);
const codeAndMagicSchema = require(`./validation`);
const ValidationError = require(`../error/validation-error`);
const async = require(`../util/async`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const {generate: generateWizards} = require(`../../generator/wizards-generator`);

const wizardsRouter = new Router();

wizardsRouter.use(bodyParser.json());

const upload = multer({storage: multer.memoryStorage()});

const wizards = generateWizards();

const toPage = (data, skip = 0, limit = 20) => {
  return {
    data: data.slice(skip, skip + limit),
    skip,
    limit,
    total: data.length,
  };
};

wizardsRouter.get(
  ``,
  async(async (req, res) => res.send(toPage(wizards)))
);

wizardsRouter.get(`/:name`, (req, res) => {
  console.log(`wizard1111111`);
  const name = req.params[`name`].toLocaleLowerCase();
  console.log(`name111 `, name);
  const wizard = wizards.find((it) => it.username.toLocaleLowerCase() === name);
  console.log(`wizard`, wizard);

  if (!wizard) {
    res.status(404).end();
  } else {
    res.send(wizard);
  }
});

wizardsRouter.post(``, upload.single(`avatar`), (req, res) => {
  const data = req.body;
  const errors = validateSchema(data, codeAndMagicSchema);

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
  res.send(data);
});

wizardsRouter.use((exception, req, res, next) => {
  let data = exception;
  if (exception instanceof ValidationError) {
    data = exception.errors;
  }
  res.status(400).send(data);
  next();
});

module.exports = wizardsRouter;
