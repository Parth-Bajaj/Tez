def success_response(data=None, message: str = "Success"):
    return {
        "status": "success",
        "message": message,
        "data": data,
    }

