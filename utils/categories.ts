import { IconType } from 'react-icons';
import { FaEnvira, FaDonate } from "react-icons/fa";
import {
    MdMedicalServices,
    MdOutlinePets, 
    MdVolunteerActivism, 
    MdFamilyRestroom, 
    MdEmojiEvents, 
    MdOutlineEvent, 
    MdOutlineSportsSoccer,
    MdSchool,
    MdBusiness,
} from "react-icons/md";
import { PiAirplaneTakeoffBold } from "react-icons/pi";
import { SiCrowdsource } from "react-icons/si";


type Category = {
  label: CategoryLabel;
  icon: IconType;
};

export type CategoryLabel =
  | 'medical'
  | 'animal'
  | 'family'
  | 'environment'
  | 'volunteer'
  | 'competition'
  | 'event'
  | 'sport'
  | 'education'
  | 'business'
  | 'travel'
  | 'nonprofit'
  | 'community';

export const categories: Category[] = [
  {
    label: 'medical',
    icon: MdMedicalServices,
  },
  {
    label: 'animal',
    icon: MdOutlinePets,
  },
  {
    label: 'family',
    icon: MdFamilyRestroom,
  },
  {
    label: 'environment',
    icon: FaEnvira,
  },
  {
    label: 'volunteer',
    icon: MdVolunteerActivism,
  },
  {
    label: 'competition',
    icon: MdEmojiEvents,
  },
  {
    label: 'event',
    icon: MdOutlineEvent,
  },
  {
    label: 'sport',
    icon: MdOutlineSportsSoccer,
  },

  {
    label: 'education',
    icon: MdSchool,
  },
  {
    label: 'business',
    icon: MdBusiness,
  },
  {
    label: 'travel',
    icon: PiAirplaneTakeoffBold,
  },
  {
    label: 'nonprofit',
    icon: FaDonate,
  },
  {
    label: 'community',
    icon: SiCrowdsource,
  },
];