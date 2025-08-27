export default function LoginForm() {
  return (
    <form className="flex flex-col space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );
}
