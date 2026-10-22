# Employee Explorer

**Student:** Maryam Daher  
**Assignment:** Assignment 3  
**Framework:** Next.js 16.4.2 (App Router)

Employee Explorer is a Next.js application built with React and TypeScript for Assignment 3.

The application retrieves employee information and posts from the JSONPlaceholder API. It demonstrates server-side data fetching, client-side interaction, loading states, error handling, and recovery from request failures.

## Technologies Used

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- JSONPlaceholder REST API

## Features

### Employee Profile

Displays employee information, including name, email, and company.

### Recent Posts

Displays recent posts belonging to employee ID 1 using server-side data fetching.

### Explore All Posts

Allows users to load employee ID 1 posts interactively using a client-side request.

The section handles loading, successful results, empty results, and request failures.

## Artificial Delay and Suspense

The Recent Posts section includes an artificial 2-second delay in its Server Component. This delay helps demonstrate how React Suspense displays a loading fallback while the posts are being prepared.

The Suspense boundary surrounds only the Recent Posts section, allowing the other dashboard sections to remain visible while it loads.

The Explore All Posts section also includes a Slow demo scenario. It waits 2 seconds before making a real API request, allowing users to observe the client-side loading state.

These delays are included for demonstration and testing purposes, not because the API requires them.

## Demo Scenarios (Mission 5)

The **Explore All Posts** section includes a Demo scenario selector to test different API behaviors.

| Scenario | Behavior | Expected Result |
|---|---|---|
| Success | Makes a real request to JSONPlaceholder | Posts appear |
| Slow | Waits 2 seconds before making a real API request | Loading feedback appears, followed by posts |
| HTTP error | Locally creates an HTTP 503 Response | An error message appears with a Retry button |
| Empty | Locally creates a successful Response containing an empty array | "No posts found." appears |

**Important:** HTTP error and Empty are deliberate local simulations. They are not actual responses returned by JSONPlaceholder. Success and Slow use the real API.

### Testing Error Recovery

1. Open the application.
2. Scroll to Explore All Posts.
3. Select **HTTP error (simulated 503)**.
4. Click **Load posts**.
5. Verify that the HTTP 503 error message and Retry button appear.
6. Change the scenario to **Success (real API)**.
7. Click **Retry**.
8. Verify that the error disappears and the real posts appear.

## Error Handling

The application uses a custom `ApiError` class that extends JavaScript's `Error` class and stores an HTTP status.

It checks `response.ok` before processing API results.

HTTP errors are distinguished from network or unexpected failures. Empty responses are handled separately from errors, and the loading state ends after both successful and failed requests.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## API

This project uses the public JSONPlaceholder API:

https://jsonplaceholder.typicode.com

The client explorer requests posts using:

```text
https://jsonplaceholder.typicode.com/posts?userId=1
```

## Testing

To run ESLint:

```bash
npm run lint
```

To check TypeScript:

```bash
npx tsc --noEmit
```

Manual testing results are documented in `docs/TESTING.md`.

## Project Limitations

- The application uses the public JSONPlaceholder API, which provides sample data rather than real employee records.
- The dashboard currently displays employee ID 1. It does not include a feature for selecting different employees.
- The HTTP error and Empty demo scenarios are locally simulated to test error handling and empty results.
- The artificial delays are included for demonstration and testing purposes.
- This project focuses on data fetching, loading states, and error handling rather than providing a complete employee management system.