import Icon from '@/components/Icon';

interface ReviewProps {
  reviews: ReviewContentProps[];
}

interface ReviewContentProps {
  count: number;
  title: string;
}

const MannerReview = ({ reviews }: ReviewProps) => {
  return (
    <div className='flex flex-col'>
      <span className='py-2 font-bold'>매너 리뷰</span>
      <div className='flex flex-col gap-2 px-1'>
        {reviews.map(({ count, title }) => (
          <ReviewContent count={count} title={title} key={title} />
        ))}
      </div>
    </div>
  );
};

const ReviewContent = ({ count, title }: ReviewContentProps) => {
  return (
    <div className='flex'>
      <div className='flex w-[60px] items-center gap-2'>
        <Icon id='group-line' />
        <span className='text-gray-accent1'>{count}</span>
      </div>
      <div className='rounded-tl-0 flex items-center rounded-bl-lg rounded-br-lg rounded-tr-lg bg-gray-accent7 p-2'>
        <span className='text-gray-accent1'>{title}</span>
      </div>
    </div>
  );
};

export default MannerReview;
