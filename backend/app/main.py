from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services.loader import load_all_data
from app.services.time_filter import filter_by_time
from app.services.analyzer import analyze_with_claude
from fastapi import HTTPException, status
from fastapi.responses import JSONResponse
import logging
from app.schemas.mission import MissionControlResponse

app = FastAPI(title="Mission Control API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




logger = logging.getLogger(__name__)


@app.get(
    "/api/mission-control",
    status_code=status.HTTP_200_OK,
    response_model=MissionControlResponse,
)
async def mission_control(days: int = 7):
    # try:

    # Load raw data
    data = load_all_data()

    if not data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No data available.",
        )
    try: 
        # Filter by time window
        filtered_data = filter_by_time(data, days)

        # Call Claude (async)
        response = await analyze_with_claude(filtered_data)

        return response

    except HTTPException:
        # Re-raise FastAPI exceptions cleanly
        raise

    except ValueError as ve:
        logger.error(f"Structured output validation failed: {ve}")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="AI returned invalid structured response.",
        )

    except TimeoutError:
        logger.error("Claude request timed out.")
        raise HTTPException(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            detail="AI service timeout.",
        )

    except Exception as e:
        logger.exception(f"Unexpected error in mission_control endpoint.: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error.",
        )
