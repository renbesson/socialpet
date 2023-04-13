////////////////////////////////////////////////////////////////////////////////
// Requires
////////////////////////////////////////////////////////////////////////////////
const router = require('express').Router();
const Pet = require('../../models/Pet');
const bcrypt = require('bcrypt');

////////////////////////////////////////////////////////////////////////////////
// Sign up route
////////////////////////////////////////////////////////////////////////////////
router.post('/signup', async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create new pet
    const newPet = new Pet({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    //save pet and send response
    const pet = await newPet.save();
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
// Sign in route
////////////////////////////////////////////////////////////////////////////////
router.post('/signin', async (req, res) => {
  try {
    const pet = await Pet.findOne({ email: req.body.email });
    if(!pet) return res.status(404).json('Wrong email!');

    const validPassword = await bcrypt.compare(req.body.password, pet.password);
    if(!validPassword) return res.status(400).json('Wrong password!');

    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;