
import { Suspense } from "react";
import EmployeeProfile from "@/components/EmployeeProfile";
import RecentPosts from "@/components/RecentPosts";
import ClientPosts from "@/components/ClientPosts";


export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Employee Explorer
        </h1>

        <p className="text-gray-600">
          Explore employee information and recent posts.
        </p>

       <Suspense fallback={<p>Loading employee profile...</p>}>
         <EmployeeProfile />
         </Suspense>

        <Suspense
          fallback={
            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Posts
              </h2>
              <p className="mt-3 text-gray-600">
                Loading recent posts...
              </p>
            </section>
          }
        >
          <RecentPosts />
        </Suspense>
        <ClientPosts />
      </div>
    </main>
  );
}
