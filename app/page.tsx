import { Suspense } from "react";
import EmployeeProfile from "@/components/EmployeeProfile";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Employee Explorer
        </h1>

        <p className="mt-2 text-gray-600">
          Explore employee information and recent posts.
        </p>

        <div className="mt-8">
          <Suspense
            fallback={
              <p className="text-gray-600">
                Loading employee profile...
              </p>
            }
          >
            <EmployeeProfile />
          </Suspense>
        </div>
      </div>
    </main>
  );
}