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

### 1. Where requests run
The employee profile and recent posts requests run on the server because they are implemented in async Server Components.

A fetch triggered by a button click in a Client Component runs in the browser.

### 2. What remains visible during loading
The page title and introductory text remain visible.

Each async Server Component can have its own Suspense boundary, allowing independent sections to load separately.

### 3. Suspense and click handlers
Suspense does not automatically show its fallback for a normal fetch started inside a click handler.

For this type of request, I need to manage loading state in the Client Component.

### 4. HTTP 503 responses
Fetch does not automatically throw an error when the server returns HTTP 503.

I need to check response.ok and handle the unsuccessful response myself.

## Interview Questions and Answers

### 1. Where does each request execute, and what evidence helped you verify that?

The Employee Profile and Recent Posts requests execute on the server because they use async Server Components with `await fetch()`. Their data loads without clicking a button.

The Explore All Posts request executes in the browser because it uses a Client Component with `"use client"`. The request starts when the user clicks the Load posts button. I verified this using the browser Network panel, where the posts request appeared after clicking the button.

### 2. Why did you choose server fetching for the profile and client fetching for the button?

I chose server fetching for the Employee Profile because the information should load automatically when the page opens, without any user interaction.

For Explore All Posts, I chose client fetching because the user needs to click the Load posts button to start the request. I used `useState` to manage the loading, success, empty, and error states and update the UI based on the result.

### 3. What activates the preview's Suspense fallback? Why doesn't the click-handler request activate it automatically?

The Recent Posts section uses an async Server Component wrapped in React Suspense. When the component is waiting for its data during rendering, Suspense displays the loading fallback. Since the boundary surrounds only Recent Posts, the other sections can remain visible.

The Load posts button does not activate Suspense automatically because its fetch runs inside a client-side click handler, not as part of a suspending render. Instead, I use `useState` to display the loading message and update the UI when the request finishes.

### 4. What would change if you moved the preview's Suspense boundary around the whole dashboard?

If I moved the Suspense boundary around the whole dashboard, the loading fallback could replace the entire dashboard while Recent Posts is loading. This means the user might not see the other sections until the data is ready.

I prefer placing Suspense only around Recent Posts because the other sections can remain visible and usable while the posts are loading. This provides a better user experience because the user does not need to wait for the entire dashboard.

### 5. How does your custom error class help, and what does `super(message)` do?

I created a custom `ApiError` class using OOP. It extends the built-in JavaScript `Error` class and allows me to store the HTTP status code along with the error message.

This helps me distinguish HTTP failures from other errors and display a clear, friendly message to the user.

The `super(message)` statement calls the constructor of the parent `Error` class to initialize the error message.

### 6. What is the difference between an HTTP failure, a network failure, and an empty result?

An HTTP failure happens when the server responds with an unsuccessful status code, such as 404 or 503. I use `ApiError` to handle this situation.

A network failure happens when the request cannot be completed, for example, when the internet connection is lost.

An empty result happens when the request succeeds, but the returned array is empty (`[]`). This is not an error, so I display "No posts found" instead of an error message.

### 7. What happens if employee ID 1 is changed to 2 in all three sections?

If I change employee ID 1 to 2 in all three sections, the Employee Profile will display employee 2's information, and both Recent Posts and Explore All Posts will display posts belonging to employee 2.

However, if I change the ID only in the profile and forget the other sections, the dashboard will display inconsistent information. The profile will belong to employee 2, while the posts will still belong to employee 1. This will not automatically cause an HTTP error because both requests are valid.

### 8. Which decision did you personally verify rather than accepting without checking?

I personally verified that the Explore All Posts request executes only after clicking the Load posts button.

I opened the browser DevTools Network panel and checked that no client-side posts request was sent before clicking the button. After clicking Load posts, I saw the request with `userId=1` in the Network panel. When the response arrived, the posts appeared in the UI.

This confirmed that the client fetching behavior worked as expected.

### AI Suggestion and Verification

**AI suggestion:** AI suggested placing a Suspense boundary only around the Recent Posts section instead of wrapping the entire dashboard.

**How I verified it:** I tested the application with a 2-second delay in the Recent Posts Server Component. I observed that the loading fallback appeared while the other sections of the dashboard remained visible.

**My decision:** I accepted the suggestion because it improves the user experience. The user can still see other information while Recent Posts is loading.