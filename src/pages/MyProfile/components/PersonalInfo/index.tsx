import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';
import Icon from '@/components/Icon';

interface PersonalInfo {
  nickname: string;
  signal: number;
  gender: string;
  ageGroup: string;
  profileImageUrl: string;
}

interface PersonalInfoProps {
  personalInfo: PersonalInfo;
}

const PersonalInfo = ({ personalInfo }: PersonalInfoProps) => {
  const navigate = useNavigate();
  const { nickname, signal, gender, ageGroup, profileImageUrl } = personalInfo;
  const userProfileImageUrl =
    profileImageUrl || 'https://picsum.photos/200/200';

  return (
    <div className='flex flex-col items-center gap-2 border-b border-gray-accent7 py-4'>
      <img
        src={userProfileImageUrl}
        alt='아바타 이미지'
        className='h-[150px] w-[150px] rounded-full object-cover'
      />
      <div className='flex flex-col items-center gap-1'>
        <span className='text-lg font-bold text-gray-accent1'>{nickname}</span>
        <span className='text-sm text-gray-accent2'>{`${ageGroup} ${gender}`}</span>
        <Button
          className='flex h-fit cursor-pointer gap-1'
          onClick={() => navigate('end-game')}
        >
          <Icon id='dice-line' className='text-indigo-500' />
          <span className='text-sm font-bold text-indigo-500'>Signal</span>
          <span className='cursor-default text-sm font-bold text-gray-accent1'>
            {signal}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfo;