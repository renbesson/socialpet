////////////////////////////////////////////////////////////////////////////////
// Function for updating profile
////////////////////////////////////////////////////////////////////////////////
let updateProfile = async (data) => {
  try {
    const res = await fetch(`/api/auth/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ petId: user?._id, data, token: cookies.get('token') }),
    });
    if (!res.ok) return await res.json();

    // Saves token as browser cookie
    const { token } = await res.json();
    const { data: user } = decode(token);
    cookies.set('token', token, { maxAge: process.env.MAX_AGE });

    // Saves user state
    setUser(user);
    return user;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { updateProfile };
