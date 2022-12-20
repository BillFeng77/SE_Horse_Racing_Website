### Installation
1. root modules installation
```
npm install
```

2. backend modules installation

start from root directory
```
cd backend
```
```
pip install -r requirement.txt
```

3. frontend dependencies installation

start from root directory
```
cd frontend/nextjs
```
```
npm install
```

### how to start the app

open two seperate terminals

in one terminal start the backend
```
cd backend
source ./venv/bin/activate
python server.py
```

in another terminal. start the frontend
```
cd frontend/nextjs
npm run dev
```

Then visit localhost:3000 (default port) and you can see the app.