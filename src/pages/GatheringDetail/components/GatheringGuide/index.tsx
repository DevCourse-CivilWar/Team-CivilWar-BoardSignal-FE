import { format, parseISO } from 'date-fns';

import Icon from '@/components/Icon';
import { IconName } from '@/components/Icon/type';

interface GatheringGuide {
  time: string;
  startTime: string | null;
  subwayStation: string;
  place: string | null;
  minParticipants: number;
  maxParticipants: number;
  categories: string[];
  allowedGender: string;
  minAge: number;
  maxAge: number;
}

interface GatheringGuideProps {
  gatheringGuide: GatheringGuide;
}

interface GuideItemProps {
  iconId: IconName;
  label: string;
  content: string;
}

const GuideItem = ({ iconId, label, content }: GuideItemProps) => (
  <div className='flex gap-2'>
    <div className='flex w-fit items-center gap-1'>
      <Icon id={iconId} size={12}></Icon>
      <span className='w-20 text-[10px] font-bold'>{label}</span>
    </div>
    <span className='text-xs'>{content}</span>
  </div>
);

const convertTimeFormat = (time: string) => {
  const date = parseISO(time);

  const formattedDate = format(date, 'yyyy년MM월dd일 a hh:mm');

  return formattedDate;
};

const GatheringGuide = ({ gatheringGuide }: GatheringGuideProps) => {
  const {
    time,
    startTime,
    subwayStation,
    place,
    minParticipants,
    maxParticipants,
    categories,
    allowedGender,
    maxAge,
    minAge,
  } = gatheringGuide;

  const ageGroup =
    minAge === maxAge ? `${minAge}세` : `${minAge} ~ ${maxAge}세`;

  const participantsGroup =
    minParticipants === maxParticipants
      ? `${minParticipants}명`
      : `${minParticipants} ~ ${maxParticipants}명`;

  const gatheringPlace = place ? `${place} (${subwayStation})` : subwayStation;

  return (
    <div className='flex w-full flex-col gap-2 rounded-lg bg-gray-accent7 p-4'>
      <span className='font-bold'>모임 조건 안내</span>
      <GuideItem
        iconId='time-fill'
        label='시간대'
        content={startTime ? convertTimeFormat(startTime) : time}
      />
      <GuideItem iconId='map-pin-fill' label='장소' content={gatheringPlace} />
      <GuideItem iconId='team-fill' label='인원' content={participantsGroup} />
      <GuideItem iconId='user-fill' label='나이대' content={ageGroup} />
      <GuideItem
        iconId='gamepad-fill'
        label='게임 카테고리'
        content={categories.join(' · ')}
      />
      <GuideItem iconId='men-fill' label='성별' content={allowedGender} />
    </div>
  );
};

export default GatheringGuide;
