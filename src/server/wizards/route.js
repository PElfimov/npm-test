const {Router} = require(`express`);
const {validateSchema} = require(`../util/validator`);
const codeAndMagicSchema = require(`./validation`);
const ValidationError = require(`../error/validation-error`);
const async = require(`../util/async`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const wizardStore = require(`./store`);


const wizardsRouter = new Router();

wizardsRouter.use(bodyParser.json());

const upload = multer({storage: multer.memoryStorage()});


const toPage = async (cursor, skip = 0, limit = 20) => {
  return {
    data: await (cursor.skip(skip).limit(limit).toArray()),
    skip,
    limit,
    total: await cursor.count()

  };
};

wizardsRouter.store = wizardStore;

wizardsRouter.get(
    ``,
    async(async (req, res) => res.send(await toPage(await wizardsRouter.store.getAllWizards())))
);

// wizardsRouter.get(`/:name`, (req, res) => {
//   const name = req.params[`name`].toLocaleLowerCase();
//   const wizard = wizards.find((it) => it.username.toLocaleLowerCase() === name);

//   if (!wizard) {
//     res.status(404).end();
//   } else {
//     res.send(wizard);
//   }
// });

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
