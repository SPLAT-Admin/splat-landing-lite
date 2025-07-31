export type AmbassadorForm = {
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  city: string;
  state: string;
  social_media_handles: string;
  number_of_followers: string;
  qualifications_why: string;
  referral?: string;
  captchaToken: string;
};

export type ContactForm = {
  name: string;
  email: string;
  message: string;
  captchaToken: string;
};
