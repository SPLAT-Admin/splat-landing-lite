export interface AmbassadorForm {
  first_name: string;
  last_name: string;
  preferred_name?: string;
  dob: string;
  email: string;
  city: string;
  state: string;
  social_media_handles: string;
  number_of_followers: number | string;
  qualifications_why: string;
  referral?: string;
  captchaToken: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
  captchaToken: string;
}