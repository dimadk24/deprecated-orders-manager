from datetime import datetime, timedelta, timezone


def get_datetime_from_timestamp(ms_timestamp: int) -> datetime:
    minsk_tz = timezone(timedelta(hours=3))
    second_timestamp = ms_timestamp / 1000
    return datetime.fromtimestamp(second_timestamp, minsk_tz)
