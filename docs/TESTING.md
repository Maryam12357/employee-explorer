# Interview — Assignment 3

## Mission 1: Initial Predictions

### 1. Where will each of the three requests run?

- **Employee Profile:** On the server using a Server Component to fetch the employee's name, email, and company.
- **Recent Posts Preview:** On the server using an async Server Component inside a Suspense boundary.
- **Explore All Posts:** In the browser using a Client Component. When the user clicks the button, `fetch()` retrieves the posts and `useState` stores the results.

### 2. What should remain visible while the server posts preview loads?

I expect the employee profile and the main dashboard to remain visible while the recent posts preview is loading.

Only the posts preview section should display a loading message using Suspense. When the posts are ready, the loading message should be replaced with the post titles.

### 3. Will wrapping a click-handler fetch in Suspense automatically display its fallback?

No, I expect Suspense will not automatically show its fallback for a normal `fetch()` inside a button's click handler.

For client-side fetching, I expect to use `useState` to manage the loading state and display a loading message while waiting for the response.

### 4. If an HTTP response has status 503, will fetch automatically throw?

No, I expect `fetch()` will not automatically throw an error when the server returns HTTP 503.

I expect to check `response.ok` and throw an error manually if the response is not successful.

## What I Learned After Testing

To be completed after implementing and testing the application. I will compare the actual results with my initial predictions and explain any differences without changing the original answers.
