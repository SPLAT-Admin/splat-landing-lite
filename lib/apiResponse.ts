export function sendError(res: NextApiResponse, status: number, message: string) {
  res.status(status).json({ success: false, message });
}
export function sendSuccess(res: NextApiResponse, message: string) {
  res.status(200).json({ success: true, message });
}
