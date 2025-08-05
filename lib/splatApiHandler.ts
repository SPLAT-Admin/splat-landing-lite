export function splatApiHandler(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (err: any) {
      console.error('API Handler error:', err);
      sendError(res, 500, 'Internal Server Error');
    }
  };
}
