# Testing Documentation

## Environment
- Project: Employee Explorer
- Framework: Next.js 16.4.2
- Language: TypeScript
- Local URL: http://localhost:3000

## Mission 1 — Initial Predictions
The four initial predictions are documented in `docs/INTERVIEW.md`.

The original predictions must be preserved. Corrections and lessons learned will be added after testing the relevant features.

## Mission 2 — Server Employee Profile

### Test 1: Successful Employee Fetch
- Opened the Employee Explorer application.
- The Server Component fetched employee 1 from the API.
- The profile displayed the employee's name, email, and company name.
- Result: PASS

### Test 2: Independent Loading
- Refreshed the application.
- The employee profile displayed its own loading message.
- The page title and introductory text remained visible.
- Result: PASS

### Test 3: Failed Employee Request
- Changed the employee API URL to an invalid endpoint.
- Expected: A friendly profile-specific error message appears without hiding the page title or independent sections.
- Actual: The message "Unable to load employee information. Please try again later." appeared.
- The Employee Explorer title remained visible.
- The Recent Posts section continued displaying three posts.
- Result: PASS
- Restored the original employee API URL after testing.

## Mission 3 — Suspense Loading

### Test 1: Recent Posts
- Fetched posts for employee 1.
- Displayed three post titles after loading.
- Result: PASS

### Test 2: Two-Second Artificial Delay
- Added an intentional 2000 ms delay inside the async RecentPosts Server Component.
- The delay is retained for learning and demonstration purposes.
- Result: PASS

### Test 3: Suspense Fallback
- Refreshed the application directly.
- The Recent Posts section displayed "Loading recent posts..."
- The loading message was replaced by the posts after loading.
- Result: PASS

### Test 4: Page Visibility
- The Employee Explorer title and introductory text remained visible during loading.
- The employee profile and recent posts had separate Suspense boundaries.
- The employee profile could finish loading while recent posts continued loading.
- Result: PASS

## Mission 4 — Client-Side Posts Fetching

### Test 1: Idle State
- The Explore All Posts section displayed instructions and a Load posts button.
- No client-side posts request appeared in the browser Network panel before clicking.
- Result: PASS

### Test 2: Successful Client Fetch
- Clicked the Load posts button.
- A request to `posts?userId=1` appeared in the browser Network panel.
- HTTP status: 200.
- Request type: fetch.
- Initiator: ClientPosts.tsx.
- The returned post titles and bodies were displayed successfully.
- Result: PASS

### Test 3: Independent Sections
- The employee profile and recent-posts preview remained separate from the client-side posts list.
- Result: PASS

### Test 4: Loading State
- Selected Slow 4G in the browser Network panel.
- Clicked the Load posts button.
- The button changed to "Loading..." and became disabled.
- The message "Loading posts..." appeared.
- The independent server sections remained visible.
- Result: PASS

### Test 5: Empty State
- Changed the client API URL to use userId=99999.
- Clicked the Load posts button.
- The message "No posts found" appeared.
- The employee profile and recent posts remained visible.
- Result: PASS

### Test 6: Error State
- Changed the client API URL to an invalid endpoint.
- Clicked the Load posts button.
- The message "Unable to load posts. Please try again." appeared.
- The Load posts button was enabled for another attempt.
- The employee profile and recent posts remained visible.
- Result: PASS

### Final Verification
- Restored the original client API URL.
- All five client states were tested successfully.
- Result: PASS

## Mission 5: Error Handling and Demo Scenarios

**Test 1 — Success (Real API)**  
Selected Success and clicked Load posts. The application fetched and displayed real posts from JSONPlaceholder.  
Result: PASS

**Test 2 — Slow (Real API)**  
Selected Slow and clicked Load posts. The loading message appeared for at least two seconds before the real posts were displayed.  
Result: PASS

**Test 3 — HTTP Error (Simulated 503)**  
Selected HTTP error and clicked Load posts. The application displayed an HTTP 503 error message and a Retry button.  
Result: PASS

**Test 4 — Error Recovery**  
After the HTTP error, selected Success and clicked Retry. The error disappeared, and real posts were displayed successfully.  
Result: PASS

**Test 5 — Empty Response (Simulated)**  
Selected Empty and clicked Load posts. The application displayed "No posts found." without showing an error message.  
Result: PASS

**Notes:** HTTP error and Empty responses are simulated locally using `new Response()`. Success and Slow use the real JSONPlaceholder API. The application handles HTTP failures separately from other request failures.

### Implementation Notes
- Next.js version: 16.4.2
- Used manually placed Suspense boundaries instead of loading.tsx.
- Used connection() from next/server to make the preview run during a request.
- Kept the intentional two-second delay in the demo.
- Tested using a direct browser refresh.

## Final Testing Evidence

| Check | Expected Result | Actual Result | Pass/Fail |
|---|---|---|---|
| Server profile | Employee 1's name, email, and company appear. | Displayed Leanne Graham, Sincere@april.biz, and Romaguera-Crona. | PASS |
| Server preview | Loading fallback appears during the two-second delay while the page shell remains visible. | "Loading recent posts..." appeared during a direct refresh; the page title and introduction remained visible. | PASS |
| Client idle | No client posts request before clicking Load posts. | Verified in the browser Network panel that no client posts request started before clicking. | PASS |
| Client slow | Loading feedback appears and duplicate requests are prevented. | "Loading posts..." appeared and the button became disabled during the Slow scenario. | PASS |
| Client success | Real API post titles and bodies appear. | Real JSONPlaceholder posts were displayed successfully. | PASS |
| HTTP failure | A simulated 503 response is handled through the custom error path. | The simulated HTTP 503 produced an error message and Retry button. | PASS |
| Empty response | Empty response displays a message without an HTTP error. | "No posts found." appeared without an error message. | PASS |
| Recovery | Switching to Success and retrying clears the error and displays posts. | Retry successfully displayed real posts after the simulated HTTP error. | PASS |
| Section independence | A client request failure does not remove server sections. | Employee Profile and Recent Posts remained visible during client errors. | PASS |
| Usability | Controls have labels and visible keyboard focus; layout is readable at 360px. | Demo scenario has a visible label; dropdown and button showed keyboard focus outlines; layout was readable at 360px. | PASS |

## Screenshot Evidence

The following application states were captured during testing:

1. **Normal state:** Employee Profile, Recent Posts, and Explore All Posts displayed successfully.
2. **Server-preview loading:** "Loading recent posts..." appeared during the intentional delay while the page shell remained visible.
3. **Client HTTP error:** Simulated HTTP 503 displayed an error message and Retry button.
4. **Empty state:** Simulated empty response displayed "No posts found."

The loading behavior was verified by refreshing the browser and observing the temporary fallback. The client scenarios were tested using the Demo scenario selector.

- docs/screenshots/normal-state.png
- docs/screenshots/server-preview-loading.png
- docs/screenshots/Client-error.png
- docs/screenshots/empty-state.png

## Command Verification

- `npm run lint` — PASS (ESLint completed without reported errors).
- `npx tsc --noEmit` — PASS (TypeScript completed without reported errors).
- `npm run build` — PASS (production build completed successfully, including static and dynamic route output).



