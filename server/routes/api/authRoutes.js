////////////////////////////////////////////////////////////////////////////////
// Requires
////////////////////////////////////////////////////////////////////////////////
const router = require('express').Router();
const Pet = require('../../models/Pet');
const bcrypt = require('bcrypt');
const { signToken } = require('../../utils/auth');
const { checkToken } = require('../../utils/checkToken');

////////////////////////////////////////////////////////////////////////////////
// Sign up route
////////////////////////////////////////////////////////////////////////////////
router.post('/signup', async (req, res) => {
  try {
    // Generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new pet
    const newPet = new Pet({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      type: req.body.type,
      species: req.body.species,
    });

    // Save pet and send response
    const pet = await newPet.save();
    const token = signToken(pet);
    res.status(200).json({ token });
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
    if (!pet) return res.status(404).json({ message: 'Wrong email!' });

    const validPassword = await bcrypt.compare(req.body.password, pet.password);
    if (!validPassword) return res.status(400).json({ message: 'Wrong password!' });

    const token = signToken(pet);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Update pet
////////////////////////////////////////////////////////////////////////////////
router.put('/update', checkToken, async (req, res) => {
  console.log('checked');
  const petId = req.body.petId;

  // Encrypts the new password
  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  try {
    const pet = await Pet.findByIdAndUpdate(
      petId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(pet);
  } catch (err) {
    return res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Delete pet
////////////////////////////////////////////////////////////////////////////////
router.delete('/delete', async (req, res) => {
  const petId = req.query.petId;

  if (req.body.petId === petId) {
    try {
      const pet = await Pet.findByIdAndDelete(petId);
      res.status(200).json(pet);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can delete only your account!');
  }
});

module.exports = router;
