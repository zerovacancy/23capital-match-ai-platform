# Alert System API Documentation

This document describes how to use the Alert System API to interact with the Cook County Property Acquisition Tracking System.

## API Endpoint

The alert system can be accessed through a single endpoint:

```
POST /api/alerts/run
```

This endpoint allows you to run the alert system with specific command-line arguments, enabling various functionalities:
- Generate property acquisition alerts
- Schedule reports
- Generate reports
- Send notifications

## Authentication

API requests require an API key for authentication. Include your API key in the request headers:

```
X-API-Key: your-api-key-here
```

## Request Format

Requests should be sent as JSON with the following structure:

```json
{
  "args": ["--command-flag-1", "value1", "--command-flag-2", "value2"]
}
```

The `args` array contains command-line arguments that will be passed to the alert system.

## Common Command Arguments

### Generate Alerts

```json
{
  "args": ["--generate-alerts", "--time-period", "7", "--batch-size", "50"]
}
```

| Argument | Description |
|----------|-------------|
| `--generate-alerts` | Flag to generate property acquisition alerts |
| `--time-period` | Number of days back to process (default: 7) |
| `--batch-size` | Number of records to process in one batch (default: 100) |
| `--alert-type` | Type of alerts to generate (options: `high_opportunity_property`, `price_change`, `status_change`, `new_listing`, `neighborhood_opportunity`, `market_trend`, `seasonal_opportunity`, `all`) |
| `--user-id` | Process for specific user ID |
| `--dry-run` | Run in simulation mode without making changes |

### Schedule and Generate Reports

```json
{
  "args": ["--schedule-reports", "--generate-reports"]
}
```

| Argument | Description |
|----------|-------------|
| `--schedule-reports` | Flag to schedule reports based on user preferences |
| `--generate-reports` | Flag to generate scheduled reports |
| `--batch-size` | Number of reports to process in one batch |
| `--dry-run` | Run in simulation mode without making changes |

### Send Notifications

```json
{
  "args": ["--send-notifications", "--user-id", "123"]
}
```

| Argument | Description |
|----------|-------------|
| `--send-notifications` | Flag to send notifications for alerts and reports |
| `--user-id` | Send notifications for specific user ID |
| `--batch-size` | Number of notifications to process in one batch |
| `--dry-run` | Run in simulation mode without making changes |

### Run All Components

```json
{
  "args": ["--all", "--time-period", "3"]
}
```

| Argument | Description |
|----------|-------------|
| `--all` | Run all components in sequence (alerts, reports, notifications) |
| `--dry-run` | Run in simulation mode without making changes |

## Response Format

Successful responses have the following structure:

```json
{
  "result": "Output from the alert system..."
}
```

The `result` field contains the standard output from the alert system execution, which includes information about what was processed and any relevant statistics.

## Error Handling

Errors are returned with an appropriate HTTP status code and a JSON response:

```json
{
  "error": "Error message describing what went wrong"
}
```

Common error status codes:
- `400 Bad Request`: Invalid arguments or request format
- `401 Unauthorized`: Invalid or missing API key
- `500 Internal Server Error`: Server-side error during execution

## OpenAPI Specification

The complete OpenAPI specification is available in both YAML and JSON formats:
- [OpenAPI YAML](/openapi/alerts-run-schema.yaml)
- [OpenAPI JSON](/openapi/alerts-run-schema.json)

## Custom GPT Integration

To use this API with a Custom GPT:

1. Go to your Custom GPT settings
2. Under "Actions", select "Add an action"
3. Select "OpenAPI Schema"
4. Enter the URL to the OpenAPI specification: `https://your-domain.com/openapi/alerts-run-schema.json`
5. Configure authentication (API Key)
6. Save the action

The GPT will now be able to trigger alert system operations based on natural language requests.