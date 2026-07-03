import { getTopic, LANDING_TOPIC_ID } from '@/lib/data'

export const dynamic = 'force-static'

export async function GET() {
  return Response.json(getTopic(LANDING_TOPIC_ID))
}
