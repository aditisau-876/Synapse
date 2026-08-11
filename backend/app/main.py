from fastapi import FastAPI

app = FastAPI(
    title="Synapse API",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "Welcome to Synapse API"
    }