import { type Decorator } from '@storybook/react';

import { LAYOUT_ROOT_ID } from '@/components/layout';

export const CommonPageLayoutDecorator: Decorator = Story => (
  <div id={LAYOUT_ROOT_ID} className='h-[844px] w-full shrink-0 shadow-xl'>
    <Story />
  </div>
);
