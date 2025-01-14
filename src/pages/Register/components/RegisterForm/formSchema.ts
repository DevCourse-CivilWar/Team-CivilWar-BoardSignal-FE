import { yupResolver } from '@hookform/resolvers/yup';
import { array, boolean, mixed, object, string } from 'yup';

import {
  MAX_LENGTH_ERROR_MESSAGE,
  MIN_LENGTH_ERROR_MESSAGE,
  REQUIRED_ERROR_MESSAGE,
  TRIM_ERROR_MESSAGE,
} from '@/constants/messages/error';

export const registerSchema = object({
  profileImageUrl: mixed<File>().required(),
  birth: string().required(REQUIRED_ERROR_MESSAGE),
  gender: string().required(REQUIRED_ERROR_MESSAGE),
  nickname: string()
    .required(REQUIRED_ERROR_MESSAGE)
    .trim()
    .min(2, `${TRIM_ERROR_MESSAGE} 2${MIN_LENGTH_ERROR_MESSAGE}`)
    .max(10, `10${MAX_LENGTH_ERROR_MESSAGE}`),
  station: string().defined(),
  categories: array(string().defined()).required(),
  isAgreeTerms: boolean().oneOf([true]).defined(),
  isAgreeMarketing: boolean().defined(),
});

export const registerDefaultValue = {
  profileImageUrl: new File([], ''),
  birth: '',
  gender: '',
  nickname: '',
  station: '',
  categories: [],
  isAgreeTerms: false,
  isAgreeMarketing: false,
};

export const registerFormOptions = {
  mode: 'all',
  defaultValues: registerDefaultValue,
  resolver: yupResolver(registerSchema),
} as const;
