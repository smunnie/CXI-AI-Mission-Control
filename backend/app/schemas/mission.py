from pydantic import BaseModel
from typing import List, Optional


class Snapshot(BaseModel):
    urgent_count: int
    risk_count: int
    deadlines_count: int
    execution_health: str
    risk_trend: str #increasing" | stable | "descreasing" 
    confidence_score: float


class Signal(BaseModel):
    id: str
    title: str
    source: str
    category: str
    summary: str
    urgency: str
    deadline: Optional[str] = None


class ActivityItem(BaseModel):
    id: str
    text: str
    source: str
    timestamp: str


class ExecutionHealth(BaseModel):
    sentiment_trend: List[float]
    insights: List[str]


class RecommendedAction(BaseModel):
    title: str
    description: str
    priority: str # "critical" | "high" | "medium"
    rationale: str #why this action matters
    time_horizon: str #"immediate" | "24h" |"this_week"

class RiskItem(BaseModel):
    title: str
    description: str
    severity: str
    impact_area: str
    confidence: float

class EmergingRisk(BaseModel):
    summary: str
    primary_risk: str
    risks: List[RiskItem]


class MissionControlResponse(BaseModel):
    snapshot: Snapshot
    signals: List[Signal]
    latest_activity: List[ActivityItem]
    emerging_risks: str
    execution_health: ExecutionHealth
    recommended_actions: List[RecommendedAction]
    emerging_risk: EmergingRisk




    
