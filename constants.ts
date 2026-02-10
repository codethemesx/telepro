
import { PlanType } from './types';

export const PLANS = {
  [PlanType.FREE]: {
    name: 'Gratuito',
    price: 0,
    slots: 3,
    groups: 5,
    interval: 15, // minutes
    buttonsPerAd: 1,
    forcedButton: true
  },
  [PlanType.BASIC]: {
    name: 'Iniciante',
    price: 24.90,
    slots: 6, // 3 free + 3 extra
    groups: 15,
    interval: 6,
    buttonsPerAd: 2,
    forcedButton: false
  },
  [PlanType.PRO]: {
    name: 'Profissional',
    price: 43.90,
    slots: 8, // 3 free + 5 extra
    groups: 20,
    interval: 3,
    buttonsPerAd: 3,
    forcedButton: false
  },
  [PlanType.ELITE]: {
    name: 'Elite',
    price: 56.90,
    slots: 13, // 3 free + 10 extra
    groups: 25,
    interval: 3,
    buttonsPerAd: 5,
    fixedAd: true,
    forcedButton: false
  }
};

export const MASK_DOMAIN = "https://ads.telepro.com/go/";
