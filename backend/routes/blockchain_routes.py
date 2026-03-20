from typing import Dict, Optional

from fastapi import APIRouter, Body

from controllers.blockchain_controller import status, store, verify

router = APIRouter()


@router.get("/status")
def status_route():
    return status()


@router.post("/store")
def store_route(payload: Dict = Body(...)):
    return store(payload)


@router.post("/verify")
def verify_route(payload: Optional[Dict] = Body(default=None)):
    return verify(payload or {})
