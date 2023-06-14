import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { overviewPageValidationSchema } from 'validationSchema/overview-pages';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.overview_page
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getOverviewPageById();
    case 'PUT':
      return updateOverviewPageById();
    case 'DELETE':
      return deleteOverviewPageById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getOverviewPageById() {
    const data = await prisma.overview_page.findFirst(convertQueryToPrismaUtil(req.query, 'overview_page'));
    return res.status(200).json(data);
  }

  async function updateOverviewPageById() {
    await overviewPageValidationSchema.validate(req.body);
    const data = await prisma.overview_page.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteOverviewPageById() {
    const data = await prisma.overview_page.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
