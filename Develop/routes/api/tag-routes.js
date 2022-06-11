const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
  // be sure to include its associated Product data
include: [
  {
    model: Product,
    through:ProductTag
  }
]
})
.then(dbTagData => res.json(dbTagData))
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    attributes: ['id', 'tag'],
  // be sure to include its associated Product data
  include: [
    {
      model: Product,
      through:ProductTag
    }
]
})
.then(dbTagData => res.json(dbTagData))
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
tag: req.body.tag
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag: req.body.tag
    },
    {
      where: {
        id: req.body.id
      }
    }
  )
.then(dbTagData => {
  if (!dbTagData) {
    res.status(404).json({ message: 'No tag found with this id' });
    return;
  }
  res.json(dbTagData);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
