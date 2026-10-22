
type Employee = {
  name: string;
  email: string;
  company: {
    name: string;
  };
};

export default async function EmployeeProfile() {
  let employee: Employee | null = null;

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1",
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch employee");
    }

    employee = (await response.json()) as Employee;
  } catch {
    employee = null;
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">
        Employee Profile
      </h2>

      {employee ? (
        <div className="mt-4 space-y-2 text-gray-700">
          <p>
            <strong>Name:</strong> {employee.name}
          </p>
          <p>
            <strong>Email:</strong> {employee.email}
          </p>
          <p>
            <strong>Company:</strong> {employee.company.name}
          </p>
        </div>
      ) : (
        <p className="mt-3 text-red-600">
          Unable to load employee information. Please try again later.
        </p>
      )}
    </section>
  );
}
