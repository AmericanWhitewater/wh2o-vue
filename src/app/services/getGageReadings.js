import http from "@/app/http"
import { baseUrl } from '@/app/environment'

export async function getGageReadings(data) {
  const url = `${baseUrl}api/gauge/${data.gauge_id}/flows/${data.metric_id}?from=${data.timeStart}&to=${data.timeEnd}&resolution=${data.resolution}`
  
  return http.get(url).then(res => res.data)
}