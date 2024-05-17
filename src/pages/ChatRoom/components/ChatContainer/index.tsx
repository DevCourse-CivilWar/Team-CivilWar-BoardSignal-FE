import { Fragment } from 'react';

import { ChatMessage } from '@/apis/chatRoomMessages';
import ReverseInfiniteScrollAutoFetch from '@/components/ReverseInfiniteScrollAutoFetch';
import { EMPTY_CHAT_ROOM_MESSAGE } from '@/constants/messages/emptyScreens';
import useGetLoggedInUserId from '@/hooks/useGetLoggedInUserId';
import { isDifferentDay } from '@/utils/time';

import ChatAlert from './ChatAlert';
import ChatBubble, { ChatDate } from './ChatBubble';

interface ChatContainerProps {
  messages: ChatMessage[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

const ChatContainer = ({
  messages,
  hasNextPage,
  fetchNextPage,
}: ChatContainerProps) => {
  const currentUserId = useGetLoggedInUserId();

  if (messages.length === 0) {
    return (
      <div className='flex grow items-center justify-center text-gray-accent3'>
        {EMPTY_CHAT_ROOM_MESSAGE}
      </div>
    );
  }

  return (
    <ReverseInfiniteScrollAutoFetch
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      className='flex grow flex-col-reverse overflow-y-auto overflow-x-hidden p-4'
      fetchedData={messages}
    >
      {messages.map((message, index) => {
        const { userId, type, createdAt } = message;

        if (type !== 'CHAT') {
          return (
            <Fragment key={createdAt}>
              {index === messages.length - 1 ? (
                <div>
                  <ChatDate date={createdAt} />
                  <ChatAlert message={message} />
                </div>
              ) : (
                <ChatAlert message={message} />
              )}
            </Fragment>
          );
        }

        if (index === messages.length - 1) {
          return (
            <div key={createdAt}>
              <ChatDate date={createdAt} />
              <ChatBubble
                currentUserId={currentUserId}
                isFirstMessage
                message={message}
              />
            </div>
          );
        }

        return (
          <div key={createdAt}>
            {isDifferentDay(createdAt, messages[index + 1].createdAt) ? (
              <div>
                <ChatDate date={createdAt} />
                <ChatBubble
                  currentUserId={currentUserId}
                  message={message}
                  isFirstMessage
                />
              </div>
            ) : (
              <ChatBubble
                currentUserId={currentUserId}
                message={message}
                isFirstMessage={
                  messages[index + 1].type !== 'CHAT' ||
                  messages[index + 1].userId !== userId
                }
              />
            )}
          </div>
        );
      })}
    </ReverseInfiniteScrollAutoFetch>
  );
};

export default ChatContainer;
