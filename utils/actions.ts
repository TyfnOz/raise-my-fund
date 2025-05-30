'use server';
import db from './db';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { campaignSchema, createCommentSchema, imageSchema, profileSchema, validateWithZodSchema } from './schemas';
import { uploadImage } from './supabase';
import { formatDate } from './format';

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user)
    throw new Error('You must be logged in to acces this route.');
  if (!user.privateMetadata.hasProfile)
    redirect('/profile/create');
  return user;
};

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : 'An error occurred.'
  };
}

export const createProfileAction = async (prevState: any, formData: FormData) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error('Please login to create a profile.');

    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, rawData);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? '',
        ...validatedFields
      }
    });
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect('/');
};

export const fetchProfileImage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id
    },
    select: {
      profileImage: true,
    }
  });

  return profile?.profileImage;
};

export const fetchProfile = async () => {
  const user = await getAuthUser();
  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id
    }
  });
  if (!profile)
    redirect('/profile/create');
  return profile;
};

export const updateProfileAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, rawData);

    await db.profile.update({
      where: {
        clerkId: user.id
      },
      data: validatedFields
    });
    revalidatePath('/profile');
    return { message: 'profile updated successfully.' };
  } catch (error) {
    return renderError(error);
  }
};

export const updateProfileImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {

  const user = await getAuthUser();
  try {
    const image = formData.get('image') as File;
    const validatedFields = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFields.image);
    await db.profile.update({
      where: {
        clerkId: user.id
      },
      data: {
        profileImage: fullPath
      }
    });
    revalidatePath('/profile');
    return { message: 'Profile image updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const createCampaignAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get('image') as File;

    const validatedFields = validateWithZodSchema(campaignSchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });
    const fullPath = await uploadImage(validatedFile.image);

    await db.campaign.create({
      data: {
        ...validatedFields,
        image: fullPath,
        profileId: user.id,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect('/');
};

export const getCampaigns = async ({
  search = '',
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const campaigns = await db.campaign.findMany({
    where: {
      category,
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { tagline: { contains: search, mode: 'insensitive' } },
      ],
    },
    select: {
      id: true,
      name: true,
      tagline: true,
      country: true,
      image: true,
      price: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });
  return campaigns;
};

export const getBookmarkId = async ({
  campaignId,
}: {
  campaignId: string;
}) => {
  const user = await getAuthUser();
  const bookmark = await db.bookmark.findFirst({
    where: {
      campaignId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });
  return bookmark?.id || null;
};

export const toggleBookmarkAction = async (prevState: {
  campaignId: string;
  bookmarkId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { campaignId, bookmarkId, pathname } = prevState;
  try {
    if (bookmarkId) {
      await db.bookmark.delete({
        where: {
          id: bookmarkId,
        },
      });
    } else {
      await db.bookmark.create({
        data: {
          campaignId,
          profileId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return { message: bookmarkId ? 'Removed from Bookmarks' : 'Added to Bookmarks' };
  } catch (error) {
    return renderError(error);
  }
};

export const getBookmarks = async () => {
  const user = await getAuthUser();
  const bookmarks = await db.bookmark.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      campaign: {
        select: {
          id: true,
          name: true,
          tagline: true,
          price: true,
          country: true,
          image: true,
        },
      },
    },
  });
  return bookmarks.map((bookmark) => bookmark.campaign);
};

export const getCampaignDetails = async (id: string) => {
  return db.campaign.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
      donations: {
        select: {
          orderTotal: true,
          createdAt: true
        }
      }
    },
  });
};

export const createCommentAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(createCommentSchema, rawData);
    await db.comments.create({
      data: {
        ...validatedFields,
        profileId: user.id,
      }
    });
    revalidatePath(`/fundraises/${validatedFields.campaignId}`);
    return { message: 'Review submitted successfully.' };
  } catch (error) {
    return renderError(error);
  }
};

export const getCampaignComments = async (campaignId: string) => {
  const comments = await db.comments.findMany({
    where: {
      campaignId,
    },
    select: {
      id: true,
      comment: true,
      profile: {
        select: {
          firstName: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return comments;
};

export const getCampaignCommentsByUser = async () => {
  const user = await getAuthUser();
  const comments = await db.comments.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      comment: true,
      campaign: {
        select: {
          name: true,
          image: true
        }
      }
    }
  });
  return comments;
};

export const deleteCommentAction = async (prevState: { commentId: string }) => {
  const { commentId } = prevState;
  const user = await getAuthUser();
  try {
    await db.comments.delete({
      where: {
        id: commentId,
        profileId: user.id
      }
    });
    revalidatePath('/supportive-comments');
    return { message: 'Review deleted successfully.' }
  } catch (error) {
    return renderError(error);
  }
};

export const findExistingComment = async (userId: string, campaignId: string) => {
  return db.comments.findFirst({
    where: {
      profileId: userId,
      campaignId: campaignId,
    }
  });
}

export const createDonationAction = async (prevState: {
  campaignId: string;
}) => {
  const user = await getAuthUser();
  let donationId: null | string = null;

  await db.donation.deleteMany({
    where:{
      profileId: user.id,
      paymentStatus: false,
    }
  });

  const { campaignId } = prevState;
  const campaign = await db.campaign.findUnique({
    where: { id: campaignId },
    select: { price: true },
  });
  if (!campaign) {
    return { message: 'campaign not found' };
  }
  const orderTotal = campaign.price * 1.1;

  try {
    const donation = await db.donation.create({
      data: {
        orderTotal,
        profileId: user.id,
        campaignId,
      },
    });
    donationId = donation.id;
  } catch (error) {
    return renderError(error);
  }
  redirect(`/checkout?donationId=${donationId}`);
};

export const getDonations = async () => {
  const user = await getAuthUser();
  const donations = await db.donation.findMany({
    where: {
      profileId: user.id,
      paymentStatus: true
    },
    include: {
      campaign: {
        select: {
          id: true,
          name: true,
          country: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return donations;
};

export async function deleteDonationAction(prevState: { donationId: string }) {
  const { donationId } = prevState;
  const user = await getAuthUser();

  try {
    const result = await db.donation.delete({
      where: {
        id: donationId,
        profileId: user.id,
      },
    });

    revalidatePath('/donations');
    return { message: 'Donate deleted successfully' };
  } catch (error) {
    return renderError(error);
  }
}

export const getOwnedCampaigns = async () => {
  const user = await getAuthUser();
  const campaigns = await db.campaign.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      name: true,
      price: true,
      createdAt: true,
    },
  });

  const campaignsWithDonationSums = await Promise.all(
    campaigns.map(async (campaign) => {
      const orderTotalSum = await db.donation.aggregate({
        where: {
          campaignId: campaign.id,
          paymentStatus: true
        },
        _sum: {
          orderTotal: true,
        },
      });

      return {
        ...campaign,
        orderTotalSum: orderTotalSum._sum.orderTotal,
      };
    })
  );

  return campaignsWithDonationSums;
};

export async function deleteCampaignAction(prevState: { campaignId: string }) {
  const { campaignId } = prevState;
  const user = await getAuthUser();

  try {
    await db.campaign.delete({
      where: {
        id: campaignId,
        profileId: user.id,
      },
    });

    revalidatePath('/campaigns');
    return { message: 'Campaign deleted successfully' };
  } catch (error) {
    return renderError(error);
  }
}

export const getFundraiseDetails = async (campaignId: string) => {
  const user = await getAuthUser();

  return db.campaign.findUnique({
    where: {
      id: campaignId,
      profileId: user.id,
    },
  });
};

export const updateCampaignAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  const campaignId = formData.get('id') as string;

  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(campaignSchema, rawData);
    await db.campaign.update({
      where: {
        id: campaignId,
        profileId: user.id,
      },
      data: {
        ...validatedFields,
      },
    });

    revalidatePath(`/campaigns/${campaignId}/edit`);
    return { message: 'Update Successful' };
  } catch (error) {
    return renderError(error);
  }
};

export const updateCampaignImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  const campaignId = formData.get('id') as string;

  try {
    const image = formData.get('image') as File;
    const validatedFields = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFields.image);

    await db.campaign.update({
      where: {
        id: campaignId,
        profileId: user.id,
      },
      data: {
        image: fullPath,
      },
    });
    revalidatePath(`/campaigns/${campaignId}/edit`);
    return { message: 'Campaign Image Updated Successful' };
  } catch (error) {
    return renderError(error);
  }
};

export const getPayments = async () => {
  const user = await getAuthUser();

  const payments = await db.donation.findMany({
    where: {
      paymentStatus: true,
      campaign: {
        profileId: user.id,
      },
    },

    orderBy: {
      createdAt: 'desc',
    },

    include: {
      campaign: {
        select: {
          id: true,
          name: true,
          price: true,
          country: true,
        },
      },
    },
  });
  return payments;
};

const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect('/');
  return user;
};

export const getStats = async () => {
  await getAdminUser();

  const usersCount = await db.profile.count();
  const campaignsCount = await db.campaign.count();
  const donationsCount = await db.donation.count({
    where:{
      paymentStatus: true,
    }
  });

  return {
    usersCount,
    campaignsCount,
    donationsCount,
  };
};

export const fetchChartsData = async () => {
  await getAdminUser();
  const date = new Date();
  date.setMonth(date.getMonth() - 6);
  const sixMonthsAgo = date;

  const donations = await db.donation.findMany({
    where: {
      createdAt: {
        gte: sixMonthsAgo,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
  let donationsPerMonth = donations.reduce((total, current) => {
    const date = formatDate(current.createdAt, true);

    const existingEntry = total.find((entry) => entry.date === date);
    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      total.push({ date, count: 1 });
    }
    return total;
  }, [] as Array<{ date: string; count: number }>);
  return donationsPerMonth;
};

export const getPaymentStats = async () => {
  const user = await getAuthUser();
  const campaigns = await db.campaign.count({
    where: {
      profileId: user.id,
    },
  });

  const totals = await db.donation.aggregate({
    _sum: {
      orderTotal: true,
    },
    where: {
      campaign: {
        profileId: user.id,
      },
    },
  });

  return {
    campaigns,
    amount: totals._sum.orderTotal || 0,
  };
};