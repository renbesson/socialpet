import { useAuth } from "../../utils/authProvider";
import { toast } from "react-toastify";

export default function UpdateProfileButton() {
  const { user, fetchPet } = useAuth();

  ////////////////////////////////////////////////////////////////////////////////
  // Function for updating profile
  ////////////////////////////////////////////////////////////////////////////////
  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    try {
      const res = await fetch(`/api/auth/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          petId: user?._id,
          data: {
            name: form.get("name"),
            email: form.get("email"),
            password: form.get("new-password"),
            type: form.get("type"),
            species: form.get("species"),
          },
        }),
      });
      const { message } = await res.json();

      if (res.status === 406) return toast("Password must be at least 8 characters!");
      if (!res.ok) return toast(`Message: ${message} | Code: ${res.status}`);
      if (res.status === 201) {
        await fetchPet();

        toast("Profile Updated!");
      }
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box border-2">
          <h2 className="card-title font-semibold text-2xl">Update Profile</h2>
          <form className="form-control w-full gap-2" onSubmit={handleUpdateProfile}>
            <div>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                defaultValue={user?.name}
                placeholder="Eg: Bubbaloo"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                defaultValue={user?.email}
                placeholder="Eg: bestpet@socialpet.ca"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                id="new-password"
                name="new-password"
                autoComplete="new-password"
                type="password"
                min={8}
                placeholder="Type you password"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Type</span>
              </label>
              <input
                autoComplete="type"
                id="type"
                name="type"
                type="text"
                required
                defaultValue={user?.type}
                placeholder="Eg: Dog"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Species</span>
              </label>
              <input
                id="species"
                name="species"
                type="text"
                required
                defaultValue={user?.species}
                placeholder="Eg: Chihuahua"
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex justify-between mt-3">
              <button type="submit">
                <label htmlFor="my-modal" className="btn btn-primary">
                  Update
                </label>
              </button>

              <label htmlFor="my-modal" className="btn btn-outline">
                Cancel
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
