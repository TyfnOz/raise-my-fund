export type actionFunction = (
    prevState: any,
    formData: FormData
  ) => Promise<{ message: string }>;

export type CampaignCardProps = {
  image: string;
  id: string;
  name: string;
  tagline: string;
  country: string;
  price: number;
};

export type Donation = {
  orderTotal: number;
  createdAt: Date;
};