# CORS Diagnosis Plan

- [x] Add /api/ping route in backend/app/routes.py that returns {"message": "pong"} with 200 status.
- [ ] Redeploy the backend to Render.
- [ ] Test the /api/ping endpoint locally (if running) and on Render by visiting the URL in a browser.
- [ ] Inspect the response headers to confirm if Access-Control-Allow-Origin is included.
- [ ] Fetch /api/ping from React app (localhost:3000) to check if CORS error resolves.
- [ ] If resolved, verify existing /api/users and other routes work.
- [ ] If CORS error persists, investigate backend route config or deployment (check Render logs).
