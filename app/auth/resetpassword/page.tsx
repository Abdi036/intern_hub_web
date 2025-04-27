export default function ResetPassword() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Create new password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter the reset token and your new password.
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="token"
                className="block text-sm font-medium text-gray-400"
              >
                Reset Token
              </label>
              <input
                id="token"
                name="token"
                type="text"
                required
                placeholder="Enter reset token"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400"
              >
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Enter new password"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
