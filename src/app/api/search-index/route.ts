import { buildGlobalSearchIndex } from '@/lib/searchIndex'

export const dynamic = 'force-static'

export async function GET() {
  return Response.json(buildGlobalSearchIndex())
}
