import { 
  verifyCaptcha, 
  sendEmail, 
  validateForm, 
  sendSuccess, 
  sendError, 
  splatApiHandler 
} from '../../lib/index';
import { ContactForm } from '../../types';

export default splatApiHandler(async (req, res) => {
  const body: ContactForm = req.body;

  // Validate fields
  const validation = validateForm(body, ["name", "email", "message", "captchaToken"]);
  if (!validation.valid) {
    return sendError(res, 400, validation.errors.join(', '));
  }

  // CAPTCHA verification
  if (!(await verifyCaptcha(body.captchaToken))) {
    return sendError(res, 403, 'CAPTCHA verification failed');
  }

  // OPTIONAL: Save to Supabase (uncomment if desired)
  /*
  const { error } = await supabase.from('contacts').insert([{
    name: body.name,
    email: body.email,
    message: body.message
  }]);
  if (error) {
    console.error
