////////////////////////////////////////////////////////////////////////////////
// Requires
////////////////////////////////////////////////////////////////////////////////
const router = require("express").Router();
const Pet = require("../../models/Pet");
const bcrypt = require("bcrypt");
const { signToken } = require("../../utils/auth");
const { checkToken } = require("../../utils/checkToken");

////////////////////////////////////////////////////////////////////////////////
// Sign up route
////////////////////////////////////////////////////////////////////////////////
router.post("/signup", async (req, res) => {
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
    // Code 201 - Created
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
// Sign in route
////////////////////////////////////////////////////////////////////////////////
router.post("/signin", async (req, res) => {
  try {
    const pet = await Pet.findOne({ email: req.body.email });

    // Code 404 - Not Found
    if (!pet) return res.status(404).json({});

    // Check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, pet.password);

    // Code 401 - Unauthorized
    if (!validPassword) return res.status(401).json({});

    // Calls function that tokenizes the user data
    const token = signToken(pet);

    // Code 200 - Ok
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Update pet
////////////////////////////////////////////////////////////////////////////////
router.put("/update", checkToken, async (req, res) => {
  const petId = req.body.petId;
  const password = req.body.data.password.trim();

  // Encrypts the new password and updates it first to avoid
  if (password?.length >= 8) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await Pet.findByIdAndUpdate(
        petId,
        {
          $set: { hashedPassword },
        },
        { new: true }
      );
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  } else if (password?.length > 0 && password.length < 8) {
    return res.status(500).json({ message: "Password must be at least 8 characters!" });
  }
  try {
    const { name, email, type, species, location } = req.body.data;
    const pet = await Pet.findByIdAndUpdate(
      petId,
      {
        $set: { name, email, type, species, location },
      },
      { new: true }
    );

    // Creates a new token
    const token = signToken(pet);

    res.status(200).json({ token, pet, message: "Profile updated successfuly!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Delete pet
////////////////////////////////////////////////////////////////////////////////
router.delete("/delete", async (req, res) => {
  const petId = req.query.petId;

  if (req.body.petId === petId) {
    try {
      const pet = await Pet.findByIdAndDelete(petId);
      res.status(200).json(pet);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

module.exports = router;
