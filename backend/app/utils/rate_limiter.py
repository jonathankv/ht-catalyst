from __future__ import annotations

import time
import asyncio
from typing import Dict, Tuple
from fastapi import HTTPException, Request
from app.core.config import settings


class InMemoryRateLimiter:
    """
    Extremely simple per-IP fixed-window rate limiter.
    Not suitable for multi-process or multi-instance deployments.
    Replace with Redis-backed limiter for production.
    """

    def __init__(self, max_requests_per_minute: int) -> None:
        self.max_requests = max_requests_per_minute
        self.window_seconds = 60
        self.ip_to_window: Dict[str, Tuple[int, int]] = {}
        self._lock = asyncio.Lock()

    async def allow(self, ip: str) -> bool:
        now = int(time.time())
        window_start = now - (now % self.window_seconds)

        async with self._lock:
            count, start = self.ip_to_window.get(ip, (0, window_start))

            if start != window_start:
                # new window
                count, start = 0, window_start

            if count >= self.max_requests:
                return False

            self.ip_to_window[ip] = (count + 1, start)
            return True


limiter = InMemoryRateLimiter(settings.RATE_LIMIT_PER_MINUTE)


async def rate_limit(request: Request) -> None:
    client_ip = request.client.host if request.client else "unknown"
    allowed = await limiter.allow(client_ip)
    if not allowed:
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Please try again later.")


