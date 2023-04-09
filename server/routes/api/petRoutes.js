////////////////////////////////////////////////////////////////////////////////
//  Requires
////////////////////////////////////////////////////////////////////////////////
const Pet = require('../../models/Pet');
const router = require('express').Router();
const bcrypt = require('bcrypt');

////////////////////////////////////////////////////////////////////////////////
//  Update pet
////////////////////////////////////////////////////////////////////////////////
router.put('/:id', async (req, res) => {
  if (req.body.petId === req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const pet = await Pet.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json('Account has been updated');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can update only your account!');
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Delete pet
////////////////////////////////////////////////////////////////////////////////
router.delete('/:id', async (req, res) => {
  if (req.body.petId === req.params.id) {
    try {
      await Pet.findByIdAndDelete(req.params.id);
      res.status(200).json('Account has been deleted');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can delete only your account!');
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Get pet
////////////////////////////////////////////////////////////////////////////////
router.get('/', async (req, res) => {
  const petId = req.query.petId;
  const name = req.query.name;
  try {
    const pet = petId ? await Pet.findById(petId) : await Pet.findOne({ name: name });
    const { password, updatedAt, ...other } = pet._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get friends
router.get('/friends/:petId', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.petId);
    const friends = await Promise.all(
      pet.followings.map((friendId) => {
        return Pet.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, name, profilePicture } = friend;
      friendList.push({ _id, name, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a pet

router.put('/:id/follow', async (req, res) => {
  if (req.body.petId !== req.params.id) {
    try {
      const pet = await Pet.findById(req.params.id);
      const currentPet = await Pet.findById(req.body.petId);
      if (!pet.followers.includes(req.body.petId)) {
        await pet.updateOne({ $push: { followers: req.body.petId } });
        await currentPet.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json('pet has been followed');
      } else {
        res.status(403).json('you allready follow this pet');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cant follow yourself');
  }
});

//unfollow a pet

router.put('/:id/unfollow', async (req, res) => {
  if (req.body.petId !== req.params.id) {
    try {
      const pet = await Pet.findById(req.params.id);
      const currentPet = await Pet.findById(req.body.petId);
      if (pet.followers.includes(req.body.petId)) {
        await pet.updateOne({ $pull: { followers: req.body.petId } });
        await currentPet.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json('pet has been unfollowed');
      } else {
        res.status(403).json('you dont follow this pet');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cant unfollow yourself');
  }
});

module.exports = router;
